"""Tests für search.py — Query-Builder und Antwort-Parsing.

Diese Tests verwenden keine echte ES-Verbindung. Stattdessen werden
typische ES-Antworten als Fixtures durchgereicht und der Parser sowie
die internen Helfer gegen die Erwartungen aus dem AfA-Schema geprüft.
"""

from __future__ import annotations

import pytest

from afa_mcp import hierarchy as H
from afa_mcp.models import EntityType, Language, SearchParams, SortOrder
from afa_mcp.search import (
    _build_filters,
    _build_query,
    _collection_label,
    _format_iso_date,
    _join_highlight,
    _localized_highlight,
    _localized_value,
    _next_cursor,
    _parse_aggregations,
    _parse_hits,
)


# ---------------------------------------------------------------------------
# Query-Builder
# ---------------------------------------------------------------------------


class TestBuildQuery:
    def test_default_query_uses_star(self):
        body = _build_query(SearchParams())
        assert body["query"]["bool"]["must"]["query_string"]["query"] == "*"
        assert body["query"]["bool"]["must"]["query_string"]["default_operator"] == "AND"

    def test_sort_relevance_uses_score(self):
        body = _build_query(SearchParams(sort=SortOrder.relevance))
        assert body["sort"][0] == {"_score": "desc"}

    def test_sort_date(self):
        body = _build_query(SearchParams(sort=SortOrder.date))
        assert body["sort"][0] == {"date": "desc"}

    def test_sort_id(self):
        body = _build_query(SearchParams(sort=SortOrder.id))
        assert body["sort"][0] == {"id": "desc"}

    def test_tie_breaker_is_id(self):
        body = _build_query(SearchParams())
        assert body["sort"][-1] == {"id": "desc"}

    def test_excludes_attachment_content(self):
        body = _build_query(SearchParams())
        assert body["_source"] == {"excludes": ["attachment.content"]}

    def test_hierarchy_filter_added(self):
        body = _build_query(SearchParams(hierarchy=[H.PERSONS, H.ORGANIZATIONS]))
        assert {"terms": {"hierarchy": [H.PERSONS, H.ORGANIZATIONS]}} in \
            body["query"]["bool"]["filter"]

    def test_search_after_appended(self):
        cursor = [123, "AfA_X"]
        body = _build_query(SearchParams(search_after=cursor))
        assert body["search_after"] == cursor

    def test_aggregations_only_when_no_cursor(self):
        body = _build_query(SearchParams(include_aggregations=True, search_after=[1]))
        assert "aggs" not in body
        body2 = _build_query(SearchParams(include_aggregations=True))
        assert "aggs" in body2 and "hierarchy" in body2["aggs"]


class TestFilters:
    def test_no_filter_clauses_by_default(self):
        assert _build_filters(SearchParams()) == []

    def test_hierarchy_filter(self):
        params = SearchParams(hierarchy=[H.EDITION_HOFSTETTER])
        assert _build_filters(params) == [
            {"terms": {"hierarchy": [H.EDITION_HOFSTETTER]}}
        ]


# ---------------------------------------------------------------------------
# Lokalisierte Felder
# ---------------------------------------------------------------------------


class TestLocalizedValue:
    def test_pick_requested_language(self):
        field = {"de": "Hallo", "fr": "Bonjour", "it": "Ciao", "en": "Hello"}
        assert _localized_value(field, Language.fr) == "Bonjour"

    def test_fallback_chain(self):
        field = {"en": "Hello"}
        assert _localized_value(field, Language.fr) == "Hello"

    def test_string_field_returned_directly(self):
        assert _localized_value("Plain", Language.de) == "Plain"

    def test_empty_dict(self):
        assert _localized_value({}, Language.de) == ""

    def test_none(self):
        assert _localized_value(None, Language.de) == ""

    def test_no_language_uses_fallback(self):
        field = {"fr": "Bonjour"}
        assert _localized_value(field, None) == "Bonjour"


class TestLocalizedHighlight:
    def test_returns_requested_language(self):
        highlight = {"title.de": ["<em>Bauernhof</em>"], "title.en": ["<em>Farm</em>"]}
        assert _localized_highlight(highlight, "title", Language.de) == \
            "<em>Bauernhof</em>"

    def test_falls_back(self):
        highlight = {"title.fr": ["<em>Ferme</em>"]}
        assert _localized_highlight(highlight, "title", Language.de) == \
            "<em>Ferme</em>"

    def test_empty_when_missing(self):
        assert _localized_highlight({}, "title", Language.de) == ""


def test_join_highlight():
    assert _join_highlight(["a", "b"]) == "a b"
    assert _join_highlight([]) == ""
    assert _join_highlight(None) == ""


# ---------------------------------------------------------------------------
# Antwort-Parsing
# ---------------------------------------------------------------------------


def _es_response_sample():
    return {
        "hits": {
            "total": {"value": 2},
            "hits": [
                {
                    "_id": "AfA_Personen_001_12345",
                    "_source": {
                        "title": {"de": "Müller, Hans", "fr": "Müller, Hans"},
                        "abstract": {"de": "Bauer in Bern."},
                        "hierarchy": ["AfA", "AfA_Personen", "AfA_Personen_001"],
                        "date": "1923-04-12",
                    },
                    "highlight": {"title.de": ["<em>Müller</em>, Hans"]},
                    "sort": [12.3, "AfA_Personen_001_12345"],
                },
                {
                    "_id": "AfA_Edition_001_brief_1938_01",
                    "_source": {
                        "title": {"de": "1938 Brief an Elin Wägner"},
                        "hierarchy": ["AfA", "AfA_Edition", "AfA_Edition_001"],
                        "attachment": {
                            "content_type": "application/pdf",
                            "content_url": "https://example.org/x.pdf",
                            "content": "Lieber Elin Wägner, ...",
                        },
                    },
                    "highlight": {
                        "attachment.content": ["Lieber <em>Elin</em> Wägner"]
                    },
                    "sort": [8.1, "AfA_Edition_001_brief_1938_01"],
                },
            ],
        },
        "aggregations": {
            "hierarchy": {
                "buckets": [
                    {"key": "AfA_Personen", "doc_count": 15824},
                    {"key": "AfA_Edition_001", "doc_count": 67},
                ]
            }
        },
    }


class TestParseHits:
    def test_total_and_count(self):
        hits, total = _parse_hits(_es_response_sample(), Language.de)
        assert total == 2
        assert len(hits) == 2

    def test_localized_title_with_highlight(self):
        hits, _ = _parse_hits(_es_response_sample(), Language.de)
        assert hits[0].title == "<em>Müller</em>, Hans"

    def test_hierarchy_path_preserved(self):
        hits, _ = _parse_hits(_es_response_sample(), Language.de)
        assert hits[0].hierarchy == ["AfA", "AfA_Personen", "AfA_Personen_001"]

    def test_collection_label_derived(self):
        hits, _ = _parse_hits(_es_response_sample(), Language.de)
        assert hits[0].collection == "Personen"
        assert hits[1].collection == "Digitale Editionen"

    def test_is_pdf_and_urls(self):
        hits, _ = _parse_hits(_es_response_sample(), Language.de)
        assert hits[1].is_pdf is True
        assert hits[1].document_url == "https://example.org/x.pdf"

    def test_attachment_highlight_into_text(self):
        hits, _ = _parse_hits(_es_response_sample(), Language.de)
        assert hits[1].text == "Lieber <em>Elin</em> Wägner"

    def test_iso_date(self):
        hits, _ = _parse_hits(_es_response_sample(), Language.de)
        assert hits[0].date == "1923-04-12"

    def test_include_content_overrides_text(self):
        hits, _ = _parse_hits(_es_response_sample(), Language.de, include_content=True)
        # 2. Treffer hat attachment.content
        assert hits[1].text.startswith("Lieber Elin Wägner")

    def test_total_as_int_legacy(self):
        # Manche ES-Versionen liefern `total` direkt als int (legacy).
        raw = {"hits": {"total": 5, "hits": []}}
        hits, total = _parse_hits(raw, None)
        assert total == 5
        assert hits == []


class TestParseAggregations:
    def test_buckets_get_labels(self):
        aggs = _parse_aggregations(_es_response_sample(), Language.de)
        assert aggs is not None
        buckets = aggs["hierarchy"]
        labels = {b.key: b.label for b in buckets}
        assert labels["AfA_Personen"] == "Personen"
        assert labels["AfA_Edition_001"] == "Edition Mina Hofstetter"

    def test_none_when_no_aggregations(self):
        assert _parse_aggregations({}, None) is None


# ---------------------------------------------------------------------------
# Hilfsfunktionen
# ---------------------------------------------------------------------------


class TestFormatIsoDate:
    @pytest.mark.parametrize("raw,expected", [
        ("1923-04-12", "1923-04-12"),
        ("1923-04-12T00:00:00Z", "1923-04-12"),
        ("19230412", None),       # falsches Format
        ("", None),
        (None, None),
        (12345, None),
    ])
    def test_iso(self, raw, expected):
        assert _format_iso_date(raw) == expected


class TestCollectionLabel:
    def test_first_level_after_root(self):
        path = ["AfA", "AfA_Personen", "AfA_Personen_001"]
        assert _collection_label(path, Language.en) == "Persons"

    def test_root_only_falls_back_to_root_label(self):
        assert _collection_label(["AfA"], Language.de) == "Archiv für Agrargeschichte"

    def test_unknown_returns_empty(self):
        assert _collection_label(["FooBar"], Language.de) == ""


class TestNextCursor:
    def test_no_cursor_when_fewer_than_size(self):
        params = SearchParams(size=20)
        from afa_mcp.models import SearchHit
        hits = [SearchHit(id="x", sort=[1, "x"])] * 5
        assert _next_cursor(hits, total=5, params=params) is None

    def test_no_cursor_on_first_page_if_exact_total(self):
        params = SearchParams(size=2)
        from afa_mcp.models import SearchHit
        hits = [SearchHit(id="x", sort=[1, "x"]), SearchHit(id="y", sort=[2, "y"])]
        # Exakt size==total → kein Cursor
        assert _next_cursor(hits, total=2, params=params) is None

    def test_cursor_returned_when_more_pages(self):
        params = SearchParams(size=2)
        from afa_mcp.models import SearchHit
        hits = [SearchHit(id="x", sort=[1, "x"]), SearchHit(id="y", sort=[2, "y"])]
        assert _next_cursor(hits, total=10, params=params) == [2, "y"]


# ---------------------------------------------------------------------------
# Entity-Mapping
# ---------------------------------------------------------------------------


class TestEntityHierarchies:
    def test_person(self):
        assert H.ENTITY_HIERARCHIES[EntityType.person.value] == [H.PERSONS]

    def test_institution(self):
        assert H.ENTITY_HIERARCHIES[EntityType.institution.value] == [H.ORGANIZATIONS]

    def test_farm(self):
        # Kanonischer Wert seit v0.2
        assert H.ENTITY_HIERARCHIES[EntityType.farm.value] == [H.COMPANIES]

    def test_company_alias(self):
        # Backward-Compat: "company" wird auf farm gemappt und dieser Alias
        # ist auch als expliziter Key in ENTITY_HIERARCHIES vorhanden.
        assert EntityType("company") is EntityType.farm
        assert H.ENTITY_HIERARCHIES["company"] == [H.COMPANIES]

    def test_any(self):
        any_h = H.ENTITY_HIERARCHIES[EntityType.any.value]
        assert set(any_h) == {H.PERSONS, H.ORGANIZATIONS, H.COMPANIES}


class TestHierarchyLabels:
    def test_known_label(self):
        assert H.label(H.EDITION_HOFSTETTER, "de") == "Edition Mina Hofstetter"
        assert H.label(H.EDITION_HOFSTETTER, "en") == "Mina Hofstetter Edition"

    def test_unknown_falls_back_to_id(self):
        assert H.label("AfA_DoesNotExist", "de") == "AfA_DoesNotExist"

    def test_fallback_language(self):
        # Eine ID, die zwar Labels hat, aber nicht in der gewünschten Sprache.
        # Wir setzen das mit einem realen Eintrag, der alle Sprachen hat —
        # also umgekehrt: unbekannte Sprache fällt auf 'de' zurück.
        assert H.label(H.PERSONS, "ja") == "Personen"
