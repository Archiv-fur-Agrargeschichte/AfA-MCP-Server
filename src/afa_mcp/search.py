"""Elasticsearch-Client für den AfA-Index.

Adaptiert vom `entscheidsuche-mcp`-Client. Die wichtigsten Unterschiede:

* Mehrsprachige Felder mit Englisch als zusätzlicher Sprache.
* Kein `canton`/`court` — Provenienz wird über `hierarchy` ausgedrückt.
* Sortier-Felder: `_score`, `date`, `id`.
"""

from __future__ import annotations

import logging
from typing import Any, Dict, List, Optional, Tuple

import httpx

from . import hierarchy as H
from .models import (
    AggregationBucket,
    HierarchyEntry,
    HierarchyResponse,
    Language,
    SearchHit,
    SearchParams,
    SearchResponse,
    SortOrder,
)

logger = logging.getLogger(__name__)


# Felder, in denen die Volltext-Suche stattfindet (mit Boost-Faktoren).
QUERY_FIELDS = [
    "title.*^5",
    "abstract.*^3",
    "meta.*^10",
    "attachment.content",
    "reference^3",
]

# Sprach-Reihenfolge für Fallback. AfA-Standard: Deutsch zuerst, dann FR/IT, EN als Letztes.
_LANG_FALLBACK_ORDER: Tuple[str, ...] = ("de", "fr", "it", "en")


def _build_filters(params: SearchParams) -> List[dict]:
    clauses: List[dict] = []
    if params.hierarchy:
        clauses.append({"terms": {"hierarchy": params.hierarchy}})
    return clauses


def _highlight_fields(language: Optional[Language]) -> Dict[str, Any]:
    if language is None:
        return {
            "title.*": {"number_of_fragments": 0},
            "abstract.*": {"number_of_fragments": 0},
            "attachment.content": {},
        }
    return {
        f"title.{language.value}": {"number_of_fragments": 0},
        f"abstract.{language.value}": {"number_of_fragments": 0},
        "attachment.content": {},
    }


def _build_query(params: SearchParams) -> dict:
    sort_field = {
        SortOrder.relevance: "_score",
        SortOrder.date: "date",
        SortOrder.id: "id",
    }[params.sort]

    body: Dict[str, Any] = {
        "size": params.size,
        "_source": {"excludes": ["attachment.content"]},
        "track_total_hits": True,
        "query": {
            "bool": {
                "must": {
                    "query_string": {
                        "query": params.query or "*",
                        "default_operator": "AND",
                        "type": "cross_fields",
                        "fields": QUERY_FIELDS,
                    }
                }
            }
        },
        # Tie-Breaker für stabile Paginierung: id absteigend.
        "sort": [{sort_field: "desc"}, {"id": "desc"}],
        "highlight": {"fields": _highlight_fields(params.language)},
    }

    filters = _build_filters(params)
    if filters:
        body["query"]["bool"]["filter"] = filters

    if params.search_after is not None:
        body["search_after"] = params.search_after

    if params.include_aggregations and params.search_after is None:
        body["aggs"] = {
            "hierarchy": {"terms": {"size": 200, "field": "hierarchy"}}
        }

    return body


def _format_iso_date(raw: Any) -> Optional[str]:
    if not isinstance(raw, str) or len(raw) < 10:
        return None
    # Strikt YYYY-MM-DD erlauben.
    head = raw[:10]
    if head[4] != "-" or head[7] != "-":
        return None
    return head


def _join_highlight(parts: Optional[List[str]]) -> str:
    if not parts:
        return ""
    return " ".join(parts)


def _localized_value(field: Any, lang: Optional[Language]) -> str:
    """Holt den Wert eines lokalisierten Felds (dict) mit Sprach-Fallback.

    Robust gegen unerwartete Typen: wenn `field` selbst schon ein String
    ist (kein lokalisiertes Sub-Feld), wird er direkt zurückgegeben.
    """
    if not field:
        return ""
    if isinstance(field, str):
        return field
    if not isinstance(field, dict):
        return ""
    if lang is not None:
        val = field.get(lang.value)
        if val:
            return val
    for code in _LANG_FALLBACK_ORDER:
        val = field.get(code)
        if val:
            return val
    return ""


def _localized_highlight(
    highlight: dict, prefix: str, lang: Optional[Language]
) -> str:
    if lang is not None:
        key = f"{prefix}.{lang.value}"
        if highlight.get(key):
            return _join_highlight(highlight[key])
    for code in _LANG_FALLBACK_ORDER:
        key = f"{prefix}.{code}"
        if highlight.get(key):
            return _join_highlight(highlight[key])
    return ""


def _collection_label(hierarchy_path: List[str], lang: Optional[Language]) -> str:
    """Liefert ein menschenlesbares Label der Top-Level-Sammlung des Treffers."""
    lang_code = lang.value if lang else "de"
    for h in hierarchy_path:
        if h == H.ROOT:
            continue
        # Erste Hierarchie-Stufe nach Root: die Sammlung.
        if h in H.LABELS and "_" in h and h.count("_") == 1:
            return H.label(h, lang_code)
    # Fallback: zweite Stufe oder Root-Label.
    for h in hierarchy_path:
        if h in H.LABELS:
            return H.label(h, lang_code)
    return ""


def _parse_hits(
    raw: dict, lang: Optional[Language], include_content: bool = False
) -> Tuple[List[SearchHit], int]:
    hits_node = raw.get("hits", {})
    total_node = hits_node.get("total")
    if isinstance(total_node, dict):
        total = total_node.get("value", 0)
    else:
        total = total_node or 0

    hits: List[SearchHit] = []
    for hit in hits_node.get("hits", []):
        src = hit.get("_source", {}) or {}
        highlight = hit.get("highlight", {}) or {}

        title = _localized_value(src.get("title"), lang)
        abstract = _localized_value(src.get("abstract"), lang)
        meta = _localized_value(src.get("meta"), lang)
        original_url = _localized_value(src.get("url"), lang)

        text = _join_highlight(highlight.get("attachment.content"))
        title_hl = _localized_highlight(highlight, "title", lang)
        if title_hl:
            title = title_hl
        abstract_hl = _localized_highlight(highlight, "abstract", lang)
        if abstract_hl:
            abstract = abstract_hl
        meta_hl = _localized_highlight(highlight, "meta", lang)
        if meta_hl:
            meta = meta_hl

        attachment = src.get("attachment") or {}
        is_pdf = attachment.get("content_type") == "application/pdf"
        document_url = attachment.get("content_url")

        hierarchy_path = src.get("hierarchy") or []
        if not isinstance(hierarchy_path, list):
            hierarchy_path = [hierarchy_path] if hierarchy_path else []

        hit_obj = SearchHit(
            id=hit["_id"],
            title=title,
            abstract=abstract,
            text=text,
            meta=meta,
            hierarchy=hierarchy_path,
            collection=_collection_label(hierarchy_path, lang),
            date=_format_iso_date(src.get("date", "")),
            is_pdf=is_pdf,
            document_url=document_url,
            original_url=original_url or None,
            sort=hit.get("sort"),
        )

        if include_content:
            content = attachment.get("content")
            if content:
                hit_obj.text = content

        hits.append(hit_obj)

    return hits, total


def _parse_aggregations(
    raw: dict, lang: Optional[Language]
) -> Optional[Dict[str, List[AggregationBucket]]]:
    aggs = raw.get("aggregations")
    if not aggs:
        return None
    result: Dict[str, List[AggregationBucket]] = {}
    lang_code = lang.value if lang else "de"
    for name, body in aggs.items():
        if "buckets" in body:
            result[name] = [
                AggregationBucket(
                    key=b.get("key_as_string") or b["key"],
                    count=b["doc_count"],
                    label=H.label(b["key"], lang_code) if isinstance(b["key"], str) else None,
                )
                for b in body["buckets"]
            ]
    return result or None


def _next_cursor(
    hits: List[SearchHit], total: int, params: SearchParams
) -> Optional[List[Any]]:
    if not hits or len(hits) < params.size:
        return None
    if params.search_after is None and total <= params.size:
        return None
    return hits[-1].sort


class AfaClient:
    """Asynchroner HTTP-Client für die AfA-Elasticsearch-API."""

    def __init__(
        self,
        es_url: str,
        timeout: float = 30.0,
        verify_ssl: bool = True,
        client: Optional[httpx.AsyncClient] = None,
    ) -> None:
        self.es_url = es_url
        self._timeout = timeout
        self._client = client or httpx.AsyncClient(timeout=timeout, verify=verify_ssl)
        self._owns_client = client is None

    async def aclose(self) -> None:
        if self._owns_client:
            await self._client.aclose()

    async def __aenter__(self) -> "AfaClient":
        return self

    async def __aexit__(self, *exc: Any) -> None:
        await self.aclose()

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    async def search(self, params: SearchParams) -> SearchResponse:
        body = _build_query(params)
        logger.debug("ES query: %s", body)
        resp = await self._post(body)
        hits, total = _parse_hits(resp, params.language)
        return SearchResponse(
            total=total,
            hits=hits,
            next_cursor=_next_cursor(hits, total, params),
            aggregations=_parse_aggregations(resp, params.language)
            if params.include_aggregations else None,
        )

    async def get_document(
        self, doc_id: str, lang: Optional[Language] = None
    ) -> Optional[SearchHit]:
        # include_content=False: kein Volltext im Response — Konsumenten
        # sollen die HTML- bzw. PDF-Datei via `document_url` (Deep-Link
        # ins Suchportal) oder `original_url` (Live-Website) abrufen.
        body: Dict[str, Any] = {
            "size": 1,
            "query": {"ids": {"values": [doc_id]}},
        }
        resp = await self._post(body)
        hits, _total = _parse_hits(resp, lang, include_content=False)
        return hits[0] if hits else None

    async def list_hierarchy(
        self, query: str = "*", size: int = 200, lang: Optional[Language] = None
    ) -> HierarchyResponse:
        body = {
            "size": 0,
            "query": {
                "bool": {
                    "must": {
                        "query_string": {
                            "query": query or "*",
                            "default_operator": "AND",
                            "type": "cross_fields",
                            "fields": QUERY_FIELDS,
                        }
                    }
                }
            },
            "aggs": {"hierarchy": {"terms": {"size": size, "field": "hierarchy"}}},
        }
        resp = await self._post(body)
        buckets = resp.get("aggregations", {}).get("hierarchy", {}).get("buckets", [])
        lang_code = lang.value if lang else "de"
        return HierarchyResponse(
            entries=[
                HierarchyEntry(
                    id=b["key"],
                    count=b["doc_count"],
                    label=H.label(b["key"], lang_code),
                )
                for b in buckets
            ]
        )

    # ------------------------------------------------------------------

    async def _post(self, body: dict) -> dict:
        resp = await self._client.post(
            self.es_url,
            json=body,
            timeout=self._timeout,
            headers={"Content-Type": "application/json"},
        )
        resp.raise_for_status()
        return resp.json()
