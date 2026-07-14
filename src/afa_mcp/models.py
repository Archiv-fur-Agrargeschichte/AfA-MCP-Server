"""Datenmodelle (Pydantic) für die AfA-MCP-Tools."""

from __future__ import annotations

from enum import Enum
from typing import Any, List, Optional

from pydantic import BaseModel, ConfigDict, Field


# ---------------------------------------------------------------------------
# Eingabe-Modelle
# ---------------------------------------------------------------------------


class Language(str, Enum):
    """Sprachen der AfA-Inhalte (deutsch, französisch, italienisch, englisch)."""

    de = "de"
    fr = "fr"
    it = "it"
    en = "en"


class SortOrder(str, Enum):
    """Sortier-Reihenfolge."""

    relevance = "relevance"
    date = "date"          # nach `date` (ISO-Datum)
    id = "id"              # nach Dokument-ID


class EntityType(str, Enum):
    """Typ einer Entität im AfA.

    Kanonische Werte: ``person``, ``institution``, ``farm``, ``any``.

    Der frühere Wert ``company`` wird transparent auf ``farm`` gemappt
    (siehe ``_missing_``), damit Clients, die den alten Namen kennen,
    weiter funktionieren. Neue Clients sollen ``farm`` verwenden.
    """

    person = "person"
    institution = "institution"
    farm = "farm"
    any = "any"

    @classmethod
    def _missing_(cls, value):
        # Backward-Compat-Alias: "company" -> farm.
        if isinstance(value, str) and value.lower() == "company":
            return cls.farm
        return super()._missing_(value)


class SearchParams(BaseModel):
    """Parameter für das generische `search`-Tool."""

    model_config = ConfigDict(extra="forbid", populate_by_name=True)

    query: str = Field(
        default="*",
        description=(
            "Volltext-Suchanfrage in Lucene-Query-Syntax. Anführungszeichen "
            "für Phrasen, AND/OR/NOT für Boolesche Verknüpfungen, * und ? "
            "für Wildcards. '*' matcht alles."
        ),
    )
    language: Optional[Language] = Field(
        default=None,
        description=(
            "Bevorzugte Sprache für Titel/Highlight (de, fr, it, en). Hat KEINE "
            "Filter-Wirkung — wenn ein Dokument das angefragte Sub-Feld nicht "
            "besetzt, wird auf die anderen Sprachen zurückgefallen."
        ),
    )
    sort: SortOrder = Field(
        default=SortOrder.relevance,
        description="Sortierung: 'relevance' | 'date' | 'id'.",
    )
    size: int = Field(default=20, ge=1, le=100, description="Treffer pro Seite (1–100).")
    search_after: Optional[List[Any]] = Field(
        default=None,
        description="Cursor (`next_cursor` aus der vorigen Antwort) für die nächste Seite.",
    )
    hierarchy: Optional[List[str]] = Field(
        default=None,
        description=(
            "Optionale Liste von Hierarchie-IDs (z.B. ['AfA_Personen', "
            "'AfA_Edition_001']). Wirken als OR untereinander, mit der "
            "Volltext-Suche per AND verknüpft. IDs aus `list_hierarchy` oder "
            "den dort dokumentierten Konstanten übernehmen."
        ),
    )
    include_aggregations: bool = Field(
        default=False,
        description="Hierarchie-Aggregation in die Antwort mitliefern.",
    )


# ---------------------------------------------------------------------------
# Ausgabe-Modelle
# ---------------------------------------------------------------------------


class SearchHit(BaseModel):
    """Ein einzelner Treffer."""

    id: str
    title: str = ""
    abstract: str = ""
    text: str = Field(default="", description="Highlight-Auszug aus dem Volltext.")
    meta: str = ""
    hierarchy: List[str] = Field(default_factory=list, description="Hierarchie-Pfade.")
    collection: str = Field(default="", description="Top-Level-Sammlung (Label).")
    date: Optional[str] = Field(default=None, description="ISO-Datum YYYY-MM-DD, falls vorhanden.")
    is_pdf: bool = False
    document_url: Optional[str] = Field(default=None)
    original_url: Optional[str] = Field(default=None)
    sort: Optional[List[Any]] = Field(default=None)


class AggregationBucket(BaseModel):
    key: Any
    count: int
    label: Optional[str] = None


class SearchResponse(BaseModel):
    total: int
    hits: List[SearchHit]
    next_cursor: Optional[List[Any]] = Field(
        default=None,
        description=(
            "Cursor für die Folgeseite. Im nächsten Request als `search_after` "
            "übergeben. None = keine weiteren Treffer."
        ),
    )
    aggregations: Optional[dict[str, List[AggregationBucket]]] = None


class HierarchyEntry(BaseModel):
    id: str
    count: int
    label: Optional[str] = None


class HierarchyResponse(BaseModel):
    entries: List[HierarchyEntry]
