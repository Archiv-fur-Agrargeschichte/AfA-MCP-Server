"""FastMCP-Server für das Archiv für Agrargeschichte (AfA).

Tools (alle über `streamable-http` erreichbar):

  * search                           — Volltextsuche (mit optionalem Hierarchie-Filter)
  * search_entities                  — Personen / Institutionen / Betriebe (farm)
  * search_audiovisual               — Foto-/Film-Sammlungen
  * search_edition_hofstetter        — Edition Mina Hofstetter
  * search_edition_gillabert_randin  — Edition Augusta Gillabert-Randin
  * search_edition_bobbett           — Edition Elizabeth Bobbett
  * fetch_document                   — Metadaten eines einzelnen Dokuments
  * list_hierarchy                   — Hierarchie-Buckets mit Trefferzahlen
  * server_info                      — Endpunkt- und Versionsinfo

Aufruf:

    python -m afa_mcp                    # Streamable HTTP auf 127.0.0.1:8766/mcp
    python -m afa_mcp --transport stdio  # für lokale CLI-Clients
"""

from __future__ import annotations

import logging
import os
from contextlib import asynccontextmanager
from typing import Annotated, Any, AsyncIterator, List, Literal, Optional
from urllib.parse import urlparse

from mcp.server.fastmcp import Context, FastMCP
from mcp.server.transport_security import TransportSecuritySettings
from pydantic import Field
from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Mount, Route

from . import __version__, hierarchy as H
from .access_log import wrap_if_enabled
from .statistik import statistik_endpoint
from .models import (
    HierarchyResponse,
    Language,
    SearchHit,
    SearchParams,
    SearchResponse,
    SortOrder,
)
from .search import AfaClient

logger = logging.getLogger(__name__)


DEFAULT_ES_URL = "https://agrargeschichte.pansoft.de:9210/*/_search"
DEFAULT_PUBLIC_BASE_URL = "https://mcp.histoirerurale.ch"


def _env(name: str, default: str) -> str:
    val = os.environ.get(name)
    return val if val else default


def _env_bool(name: str, default: bool) -> bool:
    val = os.environ.get(name)
    if val is None:
        return default
    return val.strip().lower() not in {"0", "false", "no", "off"}


@asynccontextmanager
async def _lifespan(app: FastMCP) -> AsyncIterator[dict[str, Any]]:
    es_url = _env("AFA_ES_URL", DEFAULT_ES_URL)
    timeout = float(_env("HTTP_TIMEOUT", "30"))
    verify_ssl = _env_bool("AFA_VERIFY_SSL", True)
    client = AfaClient(es_url=es_url, timeout=timeout, verify_ssl=verify_ssl)
    logger.info("afa-mcp %s — ES=%s", __version__, es_url)
    try:
        yield {"client": client}
    finally:
        await client.aclose()


def _public_base_url() -> str:
    return _env("PUBLIC_BASE_URL", DEFAULT_PUBLIC_BASE_URL).rstrip("/")


def _split_csv_env(name: str) -> List[str]:
    raw = os.environ.get(name, "")
    return [item.strip() for item in raw.split(",") if item.strip()]


def _allowed_hosts() -> List[str]:
    hosts: List[str] = ["127.0.0.1", "localhost"]
    base_host = urlparse(_public_base_url()).hostname
    if base_host and base_host not in hosts:
        hosts.append(base_host)
    for extra in _split_csv_env("MCP_ALLOWED_HOSTS"):
        if extra not in hosts:
            hosts.append(extra)
    return hosts


def _allowed_origins() -> List[str]:
    origins: List[str] = []
    base_url = _public_base_url()
    if base_url:
        origins.append(base_url)
    for extra in _split_csv_env("MCP_ALLOWED_ORIGINS"):
        if extra not in origins:
            origins.append(extra)
    return origins


def _transport_security() -> TransportSecuritySettings:
    enabled = _env_bool("MCP_DNS_REBINDING_PROTECTION", True)
    return TransportSecuritySettings(
        enable_dns_rebinding_protection=enabled,
        allowed_hosts=_allowed_hosts(),
        allowed_origins=_allowed_origins(),
    )


# ---------------------------------------------------------------------------
# Server-Card und Probe-Antworten (analog entscheidsuche-mcp)
# ---------------------------------------------------------------------------


def _server_card_payload() -> dict[str, Any]:
    base_url = _public_base_url()
    mcp_url = f"{base_url}/mcp"
    return {
        "name": "afa",
        "title": "afa-mcp",
        "description": (
            "MCP server for the Archives of Rural History (Archiv für "
            "Agrargeschichte / Archives d'histoire rurale): persons, institutions, "
            "audiovisual sources, archive holdings, digital editions and publications."
        ),
        "version": __version__,
        "beta": True,
        "website_url": "https://histoirerurale.ch",
        "documentation_url": base_url,
        "transports": {
            "streamable_http": {
                "url": mcp_url,
                "stateless": _env_bool("MCP_STATELESS_HTTP", True),
            }
        },
        "capabilities": {"tools": True, "resources": True, "prompts": False},
        "tools": [
            {"name": "search", "title": "Search AfA",
             "description": "Full-text search across the Archives of Rural History."},
            {"name": "search_entities", "title": "Search entities",
             "description": "Search persons, institutions or farms."},
            {"name": "search_audiovisual", "title": "Search audiovisual sources",
             "description": "Search photographs and films."},
            {"name": "search_edition_hofstetter", "title": "Edition Mina Hofstetter",
             "description": "Search the Mina Hofstetter digital edition."},
            {"name": "search_edition_gillabert_randin", "title": "Edition Augusta Gillabert-Randin",
             "description": "Search the Augusta Gillabert-Randin digital edition."},
            {"name": "search_edition_bobbett", "title": "Edition Elizabeth Bobbett",
             "description": "Search the Elizabeth Bobbett digital edition."},
            {"name": "fetch_document", "title": "Fetch document",
             "description": "Retrieve the metadata of a single document by ID."},
            {"name": "list_hierarchy", "title": "List hierarchy",
             "description": "List hierarchy buckets with document counts."},
            {"name": "server_info", "title": "Server information",
             "description": "Version and endpoint information."},
        ],
        "resources": [
            {
                "uri": "mcp://server-card.json",
                "name": "server-card",
                "description": "Structured metadata for this MCP server.",
                "mimeType": "application/json",
            }
        ],
    }


def _normalise_mcp_path(path: str) -> str:
    path = (path or "/mcp").strip()
    if not path.startswith("/"):
        path = "/" + path
    return path.rstrip("/") or "/mcp"


def _mcp_probe_payload(path: str) -> dict[str, Any]:
    base_url = _public_base_url()
    return {
        "name": "afa",
        "title": "afa-mcp",
        "status": "ok",
        "transport": "streamable-http",
        "endpoint": f"{base_url}{path}",
        "message": (
            "Use POST for MCP JSON-RPC requests. Machine-readable metadata is "
            "available under /.well-known/mcp and /.well-known/mcp/server-card.json."
        ),
    }


def _is_probe_request(scope: dict[str, Any], json_response_mode: bool = False) -> bool:
    if scope.get("method") == "HEAD":
        return True
    if scope.get("method") != "GET":
        return False
    headers = {
        key.decode("latin1").lower(): value.decode("latin1").lower()
        for key, value in scope.get("headers", [])
    }
    accept = headers.get("accept", "")
    if "text/event-stream" in accept:
        return False
    if json_response_mode:
        return True
    if "application/json" in accept:
        return False
    return accept in {"", "*/*"} or "text/html" in accept


def _compat_streamable_http_app(mcp_app, mcp_path: str, json_response_mode: bool = False):
    async def app(scope, receive, send):
        if (
            scope.get("type") == "http"
            and scope.get("path") == mcp_path
            and _is_probe_request(scope, json_response_mode=json_response_mode)
        ):
            response = JSONResponse(_mcp_probe_payload(mcp_path))
            await response(scope, receive, send)
            return
        await mcp_app(scope, receive, send)

    return app


# ---------------------------------------------------------------------------
# Parameter-Annotations (auf Modul-Ebene, damit FastMCP die Type-Hints zur
# Laufzeit auflösen kann — innerhalb von `build_server()` definierte Aliasse
# sind im Globals/Locals-Lookup von `typing.get_type_hints` nicht sichtbar).
# ---------------------------------------------------------------------------

_QueryArg = Annotated[
    str,
    Field(description=(
        "Volltext-Anfrage. \"...\" für Phrasen, AND/OR/NOT für Boolesche "
        "Verknüpfungen, * und ? für Wildcards. \"*\" matcht alles."
    )),
]
_LangArg = Annotated[
    Optional[Language],
    Field(description=(
        "Bevorzugte Sprache für Titel/Highlight (de, fr, it, en). Ohne "
        "Angabe wird das erste vorhandene Sprachfeld zurückgegeben."
    )),
]
_SortArg = Annotated[
    Literal["relevance", "date", "id"],
    Field(description="Sortierung: 'relevance' | 'date' | 'id'. Default 'relevance'."),
]
_SizeArg = Annotated[int, Field(ge=1, le=100, description="Treffer pro Seite (1–100).")]
_CursorArg = Annotated[
    Optional[List[Any]],
    Field(description="Cursor aus `next_cursor` der vorigen Antwort."),
]
_HierarchyArg = Annotated[
    Optional[List[str]],
    Field(description=(
        "Optionale Hierarchie-IDs zur Eingrenzung — z.B. "
        "['AfA_Personen', 'AfA_FotoFilm']. Mehrere IDs werden mit OR verknüpft."
    )),
]
_IncludeAggsArg = Annotated[
    bool, Field(description="Hierarchie-Aggregation mitliefern."),
]
_EntityTypeArg = Annotated[
    # ``company`` bleibt akzeptiert als Alias fuer ``farm`` (siehe
    # EntityType._missing_), taucht aber nicht mehr in der Description auf.
    Literal["person", "institution", "farm", "any", "company"],
    Field(description="Typ: 'person' | 'institution' | 'farm' | 'any'."),
]
_MediaTypeArg = Annotated[
    Optional[str],
    Field(description=(
        "Optional: 'photos' = nur Foto-Bestand (AfA_FotoFilm_001), "
        "'films' = nur Film-Bestand (AfA_FotoFilm_002). Ohne Angabe "
        "werden beide durchsucht."
    )),
]
_DocIdArg = Annotated[
    str,
    Field(description="Dokument-ID, z.B. 'AfA_Edition_003_BobbettE_1933_01' "
                      "oder 'AfA_Personen_001_DB9920'."),
]
_HierarchyQueryArg = Annotated[
    str, Field(description="Optionale Volltext-Anfrage."),
]
_HierarchySizeArg = Annotated[
    int, Field(ge=1, le=10000, description="Maximale Anzahl Einträge."),
]


# ---------------------------------------------------------------------------
# Systemprompt (MCP-Feld `instructions`)
#
# Wird bei jeder Verbindung an den Client geliefert und dort dem Sprachmodell
# vorangestellt. Er wirkt damit in jedem Client, ohne dass Nutzende etwas
# einrichten. Die Arbeitsregeln verringern die beiden dokumentierten
# Schwachstellen der Recherche per Sprachmodell: Auslassungen (das Modell
# waehlt aus, was es nennt) und nicht wiederholbare Laeufe (das Modell waehlt
# Suchbegriffe, Sortierung und Abbruchpunkt selbst).
#
# Herleitung und Begruendung der einzelnen Regeln: docs/prompts/
# ---------------------------------------------------------------------------

SERVER_INSTRUCTIONS = (
    "MCP-Server für das Archiv für Agrargeschichte (AfA / Archives "
    "d'histoire rurale / Archives of Rural History). Volltext-Suche "
    "in Personen, Institutionen, Betrieben, audiovisuellen Quellen "
    "(Foto/Film), Archivbeständen, digitalen Editionen (Mina Hofstetter, "
    "Augusta Gillabert-Randin, Elizabeth Bobbett), Publikationen und "
    "Medienberichten. Unterstützt Volltextsuche, Hierarchie-Filter und "
    "den Abruf einzelner Dokumente.\n\n"
    "Arbeitsregeln:\n"
    "1. Antworte nur aus Tool-Responses dieser Sitzung. Angaben ohne Beleg "
    "im Bestand kennzeichnest du als 'nicht im Bestand', statt sie aus "
    "Vorwissen zu ergänzen.\n"
    "2. Nenne zu jeder Aussage die Dokument-ID und die document_url.\n"
    "3. Das Feld `text` einer Suchantwort ist ein gekürztes Highlight-"
    "Snippet. Antworte nicht daraus, sondern rufe fetch_document für die "
    "ID auf.\n"
    "4. fetch_document liefert Metadaten, keinen Volltext. Der Inhalt liegt "
    "hinter document_url; verweise darauf, statt ihn zu vermuten.\n"
    "5. Verwende sort='id', wenn das Ergebnis wiederholbar sein soll. "
    "sort='relevance' ist über Index-Änderungen hinweg nicht stabil.\n"
    "6. Paginiere über next_cursor bis null, bevor du von 'allen Treffern' "
    "sprichst. Andernfalls nenne die Zahl der geprüften Treffer und total.\n"
    "7. Gib Namen, Daten, Funktionen und Dossiernummern wörtlich wieder.\n"
    "8. Nennt eine Frage mehrere Funktionen, Ämter oder Verknüpfungen einer "
    "Person, dann führe alle auf, die im Eintrag stehen, ohne Auswahl nach "
    "Wichtigkeit.\n"
    "9. Widersprüche zwischen Einträgen führst du mit beiden IDs auf, statt "
    "sie aufzulösen.\n"
    "10. Gib am Ende die tatsächlich ausgeführten Suchaufrufe wörtlich aus "
    "(query, hierarchy, sort, size), damit der Lauf wiederholbar ist."
)


# ---------------------------------------------------------------------------
# Tools
# ---------------------------------------------------------------------------


def build_server() -> FastMCP:
    mcp = FastMCP(
        name="afa",
        instructions=SERVER_INSTRUCTIONS,
        lifespan=_lifespan,
        transport_security=_transport_security(),
    )

    def _client(ctx: Context) -> AfaClient:
        return ctx.request_context.lifespan_context["client"]

    @mcp.resource(
        "mcp://server-card.json",
        name="server-card",
        title="MCP Server Card",
        description="Structured metadata for the AfA MCP server.",
        mime_type="application/json",
    )
    def server_card_resource() -> dict[str, Any]:
        return _server_card_payload()

    # ------------------------------------------------------------------
    # search — generische Volltextsuche
    # ------------------------------------------------------------------
    @mcp.tool(
        title="AfA durchsuchen",
        description=(
            "Volltext-Suche im Archiv für Agrargeschichte (AfA). Durchsucht "
            "Personen, Institutionen, Betriebe, Foto-/Film-Bestände, Archive, "
            "digitale Editionen, Publikationen und Medienberichte. "
            "\n\nParameter:\n"
            "• `query` (str, Default `*`) — Lucene-Query-String. Phrasen mit "
            "\"...\", Boolesche Operatoren AND/OR/NOT, Wildcards `*` und `?`. "
            "Default-Operator: AND.\n"
            "• `language` (`de`|`fr`|`it`|`en`, optional) — bevorzugte Sprache "
            "für Titel/Highlight. Kein Filter — fällt auf andere Sprachen "
            "zurück, wenn nicht vorhanden.\n"
            "• `sort` (`relevance`|`date`|`id`, Default `relevance`).\n"
            "• `size` (int 1–100, Default 20) — Treffer pro Seite.\n"
            "• `search_after` (list, optional) — Cursor aus `next_cursor` der "
            "vorigen Antwort für Paginierung.\n"
            "• `hierarchy` (list[str], optional) — Hierarchie-IDs zur "
            "Eingrenzung (aus `list_hierarchy`); mehrere per OR verknüpft.\n"
            "• `include_aggregations` (bool, Default false) — "
            "Hierarchie-Aggregation mitliefern.\n\n"
            "Rückgabe (SearchResponse):\n"
            "• `total` (int) — Gesamtzahl der Treffer (auch über `size` hinaus).\n"
            "• `hits` (list[SearchHit]) — Trefferliste (max. `size` Einträge). "
            "Felder pro Hit: `id`, `title`, `abstract`, `text` (Highlight-"
            "Snippet), `meta`, `hierarchy` (Pfad), `collection` (Label), "
            "`date` (ISO, optional), `is_pdf`, `document_url` (Suchportal-"
            "Deep-Link), `original_url` (Quell-URL), `sort` (interner Cursor).\n"
            "• `next_cursor` (list, optional) — an `search_after` des "
            "nächsten Requests weitergeben; null = keine weiteren Treffer.\n"
            "• `aggregations` (dict, optional) — Hierarchie-Buckets nur "
            "wenn `include_aggregations=true`."
        ),
    )
    async def search(
        ctx: Context,
        query: _QueryArg = "*",
        language: _LangArg = None,
        sort: _SortArg = SortOrder.relevance,
        size: _SizeArg = 20,
        search_after: _CursorArg = None,
        hierarchy: _HierarchyArg = None,
        include_aggregations: _IncludeAggsArg = False,
    ) -> SearchResponse:
        params = SearchParams(
            query=query, language=language, sort=sort, size=size,
            search_after=search_after, hierarchy=hierarchy,
            include_aggregations=include_aggregations,
        )
        return await _client(ctx).search(params)

    # ------------------------------------------------------------------
    # search_entities — Personen / Institutionen / Betriebe
    # ------------------------------------------------------------------
    @mcp.tool(
        title="Entitäten suchen (Personen, Institutionen, Betriebe)",
        description=(
            "Sucht in den AfA-Entitäten — Personen, Institutionen und Betriebe. "
            "Intern werden die Hierarchie-IDs `AfA_Personen`, "
            "`AfA_Organisationen`, `AfA_Betriebe` eingeschränkt.\n\n"
            "Parameter:\n"
            "• `query` (str, Default `*`) — Lucene-Query-String.\n"
            "• `entity_type` (`person`|`institution`|`farm`|`any`, Default "
            "`any`) — Typ-Filter. `company` bleibt als Deprecated-Alias für "
            "`farm` erhalten.\n"
            "• `language` (`de`|`fr`|`it`|`en`, optional) — bevorzugte Sprache "
            "für Titel/Highlight.\n"
            "• `sort` (`relevance`|`date`|`id`, Default `relevance`).\n"
            "• `size` (int 1–100, Default 20).\n"
            "• `search_after` (list, optional) — Paginierungs-Cursor.\n\n"
            "Rückgabe: `SearchResponse` (siehe `search`) mit `hits` als "
            "list[SearchHit]."
        ),
    )
    async def search_entities(
        ctx: Context,
        query: _QueryArg = "*",
        entity_type: _EntityTypeArg = "any",
        language: _LangArg = None,
        sort: _SortArg = SortOrder.relevance,
        size: _SizeArg = 20,
        search_after: _CursorArg = None,
    ) -> SearchResponse:
        # Alt-Alias "company" transparent auf "farm" mappen.
        key = "farm" if entity_type == "company" else entity_type
        params = SearchParams(
            query=query, language=language, sort=sort, size=size,
            search_after=search_after,
            hierarchy=H.ENTITY_HIERARCHIES[key],
        )
        return await _client(ctx).search(params)

    # ------------------------------------------------------------------
    # search_audiovisual — Foto/Film
    # ------------------------------------------------------------------
    @mcp.tool(
        title="Audio-visuelle Quellen durchsuchen",
        description=(
            "Sucht in den audio-visuellen Beständen des AfA (Fotos und Filme). "
            "Optional auf Foto- oder Film-Bestand einschränkbar.\n\n"
            "Parameter:\n"
            "• `query` (str, Default `*`) — Lucene-Query-String.\n"
            "• `media_type` (`photos`|`films`, optional) — `photos` = nur "
            "`AfA_FotoFilm_001`, `films` = nur `AfA_FotoFilm_002`; ohne "
            "Angabe werden beide durchsucht.\n"
            "• `language` (`de`|`fr`|`it`|`en`, optional).\n"
            "• `sort` (`relevance`|`date`|`id`, Default `relevance`).\n"
            "• `size` (int 1–100, Default 20).\n"
            "• `search_after` (list, optional) — Paginierungs-Cursor.\n\n"
            "Rückgabe: `SearchResponse` (siehe `search`) mit `hits` als "
            "list[SearchHit]. Bei Foto-/Filmtreffern enthält `is_pdf` "
            "typischerweise false und `document_url` verweist auf die "
            "HTML-Katalog-Seite im Suchportal."
        ),
    )
    async def search_audiovisual(
        ctx: Context,
        query: _QueryArg = "*",
        media_type: _MediaTypeArg = None,
        language: _LangArg = None,
        sort: _SortArg = SortOrder.relevance,
        size: _SizeArg = 20,
        search_after: _CursorArg = None,
    ) -> SearchResponse:
        if media_type == "photos":
            hierarchy_ids = [H.AUDIOVISUAL_PHOTOS]
        elif media_type == "films":
            hierarchy_ids = [H.AUDIOVISUAL_FILMS]
        else:
            hierarchy_ids = [H.AUDIOVISUAL]
        params = SearchParams(
            query=query, language=language, sort=sort, size=size,
            search_after=search_after, hierarchy=hierarchy_ids,
        )
        return await _client(ctx).search(params)

    # ------------------------------------------------------------------
    # search_edition_* — drei digitale Editionen
    # ------------------------------------------------------------------
    @mcp.tool(
        title="Edition Mina Hofstetter",
        description=(
            "Volltext-Suche in der digitalen Edition Mina Hofstetter — "
            "Briefe, Aufsätze und Schriften der Pionierin des biologisch-"
            "dynamischen Landbaus in der Schweiz.\n\n"
            "Parameter:\n"
            "• `query` (str, Default `*`) — Lucene-Query-String.\n"
            "• `language` (`de`|`fr`|`it`|`en`, optional).\n"
            "• `sort` (`relevance`|`date`|`id`, Default `relevance`).\n"
            "• `size` (int 1–100, Default 20).\n"
            "• `search_after` (list, optional) — Paginierungs-Cursor.\n\n"
            "Rückgabe: `SearchResponse` (siehe `search`) — Hits sind auf "
            "die Edition eingeschränkt."
        ),
    )
    async def search_edition_hofstetter(
        ctx: Context,
        query: _QueryArg = "*",
        language: _LangArg = None,
        sort: _SortArg = SortOrder.relevance,
        size: _SizeArg = 20,
        search_after: _CursorArg = None,
    ) -> SearchResponse:
        params = SearchParams(
            query=query, language=language, sort=sort, size=size,
            search_after=search_after, hierarchy=[H.EDITION_HOFSTETTER],
        )
        return await _client(ctx).search(params)

    @mcp.tool(
        title="Edition Augusta Gillabert-Randin",
        description=(
            "Volltext-Suche in der digitalen Edition Augusta Gillabert-Randin — "
            "Schriften und Korrespondenz der Schweizer Landfrauen-Aktivistin "
            "(1869–1940).\n\n"
            "Parameter:\n"
            "• `query` (str, Default `*`) — Lucene-Query-String.\n"
            "• `language` (`de`|`fr`|`it`|`en`, optional).\n"
            "• `sort` (`relevance`|`date`|`id`, Default `relevance`).\n"
            "• `size` (int 1–100, Default 20).\n"
            "• `search_after` (list, optional) — Paginierungs-Cursor.\n\n"
            "Rückgabe: `SearchResponse` (siehe `search`) — Hits sind auf "
            "die Edition eingeschränkt."
        ),
    )
    async def search_edition_gillabert_randin(
        ctx: Context,
        query: _QueryArg = "*",
        language: _LangArg = None,
        sort: _SortArg = SortOrder.relevance,
        size: _SizeArg = 20,
        search_after: _CursorArg = None,
    ) -> SearchResponse:
        params = SearchParams(
            query=query, language=language, sort=sort, size=size,
            search_after=search_after, hierarchy=[H.EDITION_GILLABERT_RANDIN],
        )
        return await _client(ctx).search(params)

    @mcp.tool(
        title="Edition Elizabeth Bobbett",
        description=(
            "Volltext-Suche in der digitalen Edition Elizabeth Bobbett — "
            "Korrespondenz und Schriften der irischen Frauenrechtlerin und "
            "Landfrau.\n\n"
            "Parameter:\n"
            "• `query` (str, Default `*`) — Lucene-Query-String.\n"
            "• `language` (`de`|`fr`|`it`|`en`, optional).\n"
            "• `sort` (`relevance`|`date`|`id`, Default `relevance`).\n"
            "• `size` (int 1–100, Default 20).\n"
            "• `search_after` (list, optional) — Paginierungs-Cursor.\n\n"
            "Rückgabe: `SearchResponse` (siehe `search`) — Hits sind auf "
            "die Edition eingeschränkt."
        ),
    )
    async def search_edition_bobbett(
        ctx: Context,
        query: _QueryArg = "*",
        language: _LangArg = None,
        sort: _SortArg = SortOrder.relevance,
        size: _SizeArg = 20,
        search_after: _CursorArg = None,
    ) -> SearchResponse:
        params = SearchParams(
            query=query, language=language, sort=sort, size=size,
            search_after=search_after, hierarchy=[H.EDITION_BOBBETT],
        )
        return await _client(ctx).search(params)

    # ------------------------------------------------------------------
    # fetch_document
    # ------------------------------------------------------------------
    @mcp.tool(
        title="Dokument abrufen",
        description=(
            "Holt die Metadaten eines einzelnen AfA-Dokuments anhand seiner "
            "ID. Der Volltext wird **nicht** mitgeliefert — er ist über die "
            "beiden Links im Response abrufbar (HTML- oder PDF-Datei).\n\n"
            "Parameter:\n"
            "• `id` (str, erforderlich) — Dokument-ID, z.B. "
            "`AfA_Personen_001_DB9920` oder `AfA_Edition_003_BobbettE_1933_01`. "
            "IDs stammen aus dem `id`-Feld einer `search`-Antwort.\n"
            "• `language` (`de`|`fr`|`it`|`en`, optional) — bevorzugte Sprache "
            "für Titel/Abstract/Meta.\n\n"
            "Rückgabe: einzelner `SearchHit`. Zurückgegeben werden:\n"
            "• Metadaten: `id`, `title`, `abstract`, `meta`, `hierarchy` "
            "(Sammlungs-Pfad), `collection` (Label), `date` (ISO, optional), "
            "`is_pdf`.\n"
            "• `document_url` — Link zur PDF- bzw. HTML-Datei im "
            "**Suchportal** (`recherche2.histoirerurale.ch`).\n"
            "• `original_url` — **Deep-Link ins Quellportal** (die Website, "
            "von der der Scraper das Dokument geholt hat; z.B. "
            "`histoirerurale.ch`, kann je nach Bestand variieren).\n\n"
            "Null, wenn die ID nicht gefunden wird."
        ),
    )
    async def fetch_document(
        ctx: Context,
        id: _DocIdArg,
        language: _LangArg = None,
    ) -> Optional[SearchHit]:
        return await _client(ctx).get_document(id, language)

    # ------------------------------------------------------------------
    # list_hierarchy
    # ------------------------------------------------------------------
    @mcp.tool(
        title="Hierarchie-Buckets",
        description=(
            "Liefert die verfügbaren Hierarchie-IDs mit Trefferzahlen, "
            "optional eingegrenzt durch eine Volltext-Anfrage. Die "
            "zurückgegebenen `id`-Werte können im `hierarchy`-Parameter "
            "der Such-Tools verwendet werden.\n\n"
            "Parameter:\n"
            "• `query` (str, Default `*`) — optionale Volltext-Anfrage; ohne "
            "Angabe alle Hierarchie-Buckets des Gesamtbestands.\n"
            "• `size` (int 1–10000, Default 200) — maximale Anzahl "
            "Hierarchie-Einträge.\n"
            "• `language` (`de`|`fr`|`it`|`en`, optional) — Label-Sprache.\n\n"
            "Rückgabe (HierarchyResponse):\n"
            "• `entries` (list[HierarchyEntry]) — pro Eintrag: `id` "
            "(Hierarchie-ID zur Verwendung im `hierarchy`-Parameter der "
            "Such-Tools), `count` (Trefferanzahl), `label` (menschenlesbare "
            "Bezeichnung in der angefragten Sprache, sofern verfügbar)."
        ),
    )
    async def list_hierarchy(
        ctx: Context,
        query: _HierarchyQueryArg = "*",
        size: _HierarchySizeArg = 200,
        language: _LangArg = None,
    ) -> HierarchyResponse:
        return await _client(ctx).list_hierarchy(query, size, language)

    # ------------------------------------------------------------------
    # server_info
    # ------------------------------------------------------------------
    @mcp.tool(
        title="Server-Info",
        description=(
            "Versions- und Endpunkt-Informationen des AfA-MCP-Servers. "
            "Keine Parameter.\n\n"
            "Rückgabe (dict):\n"
            "• `name` (str) — Server-Name (`afa-mcp`).\n"
            "• `version` (str) — Semver.\n"
            "• `elasticsearch_url` (str) — Upstream-URL des ES-Backends.\n"
            "• `languages` (list[str]) — Codes der akzeptierten Sprachen: "
            "`de`, `fr`, `it`, `en`.\n"
            "• `sort_orders` (list[str]) — akzeptierte Werte für `sort`.\n"
            "• `hierarchy_constants` (dict) — sprechende Konstanten (z. B. "
            "`PERSONS`, `EDITION_BOBBETT`) → Hierarchie-ID-Strings; nützlich, "
            "um in Code nicht mit Magic-Strings zu arbeiten."
        ),
    )
    async def server_info(ctx: Context) -> dict[str, Any]:
        return {
            "name": "afa-mcp",
            "version": __version__,
            "elasticsearch_url": _env("AFA_ES_URL", DEFAULT_ES_URL),
            "languages": [l.value for l in Language],
            "sort_orders": [s.value for s in SortOrder],
            "hierarchy_constants": {
                "ROOT": H.ROOT,
                "PERSONS": H.PERSONS,
                "ORGANIZATIONS": H.ORGANIZATIONS,
                "COMPANIES": H.COMPANIES,
                "ARCHIVES": H.ARCHIVES,
                "AUDIOVISUAL": H.AUDIOVISUAL,
                "AUDIOVISUAL_PHOTOS": H.AUDIOVISUAL_PHOTOS,
                "AUDIOVISUAL_FILMS": H.AUDIOVISUAL_FILMS,
                "EDITIONS": H.EDITIONS,
                "EDITION_HOFSTETTER": H.EDITION_HOFSTETTER,
                "EDITION_GILLABERT_RANDIN": H.EDITION_GILLABERT_RANDIN,
                "EDITION_BOBBETT": H.EDITION_BOBBETT,
                "PUBLICATIONS": H.PUBLICATIONS,
                "MEDIA_REPORTS": H.MEDIA_REPORTS,
                "OTHER_SOURCES": H.OTHER_SOURCES,
            },
        }

    return mcp


# ---------------------------------------------------------------------------
# ASGI-App
# ---------------------------------------------------------------------------

_mcp_singleton: Optional[FastMCP] = None


def get_mcp() -> FastMCP:
    global _mcp_singleton
    if _mcp_singleton is None:
        _mcp_singleton = build_server()
    return _mcp_singleton


def create_app(mcp: Optional[FastMCP] = None):
    if mcp is None:
        mcp = get_mcp()
    base_url = _public_base_url()
    mcp_path = _normalise_mcp_path(
        getattr(mcp.settings, "streamable_http_path", None) or "/mcp"
    )

    async def well_known_manifest(_request):
        return JSONResponse(
            {
                "name": "afa",
                "title": "afa-mcp",
                "description": "MCP server for the Archives of Rural History (AfA).",
                "server_card_url": f"{base_url}/.well-known/mcp/server-card.json",
                "transports": {
                    "streamable_http": {"url": f"{base_url}{mcp_path}"},
                },
            }
        )

    async def well_known_server_card(_request):
        return JSONResponse(_server_card_payload())

    inner_app = mcp.streamable_http_app()
    json_response_mode = bool(getattr(mcp.settings, "json_response", False))
    mcp_app = _compat_streamable_http_app(
        inner_app, mcp_path, json_response_mode=json_response_mode
    )
    mcp_app = wrap_if_enabled(mcp_app, mcp_path=mcp_path)

    @asynccontextmanager
    async def lifespan(_app):
        async with inner_app.router.lifespan_context(inner_app):
            yield

    return Starlette(
        routes=[
            Route("/.well-known/mcp", endpoint=well_known_manifest),
            Route("/.well-known/mcp/server-card.json", endpoint=well_known_server_card),
            Route("/statistik", endpoint=statistik_endpoint),
            Route("/statistik/", endpoint=statistik_endpoint),
            Mount("/", app=mcp_app),
        ],
        lifespan=lifespan,
    )


def _build_module_app():
    return create_app()


app = _build_module_app()
