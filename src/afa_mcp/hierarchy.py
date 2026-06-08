"""Hierarchie-IDs des AfA-Index.

Diese Konstanten bilden die im Frontend (recherche.histoirerurale.ch) sicht-
baren Sammlungen 1:1 auf die `hierarchy`-Werte im Elasticsearch-Index ab.
Sie werden von den spezialisierten Such-Tools verwendet, damit Aufrufer
nicht die internen IDs kennen müssen.
"""

from __future__ import annotations

# Root
ROOT = "AfA"

# Sammlungen (Top-Level Buckets unter AfA)
PERSONS = "AfA_Personen"
ORGANIZATIONS = "AfA_Organisationen"
COMPANIES = "AfA_Betriebe"
ARCHIVES = "AfA_Archiv"
AUDIOVISUAL = "AfA_FotoFilm"
EDITIONS = "AfA_Edition"
PUBLICATIONS = "AfA_Publikationen"
MEDIA_REPORTS = "AfA_Berichte"
OTHER_SOURCES = "AfA_Weitere"

# Editions-Untersammlungen
EDITION_HOFSTETTER = "AfA_Edition_001"
EDITION_GILLABERT_RANDIN = "AfA_Edition_002"
EDITION_BOBBETT = "AfA_Edition_003"

# Foto/Film-Untersammlungen (mehrere Foto-/Filmbestände)
AUDIOVISUAL_PHOTOS = "AfA_FotoFilm_001"
AUDIOVISUAL_FILMS = "AfA_FotoFilm_002"

# Gruppen für die Entity-Suche.
ENTITY_HIERARCHIES = {
    "person": [PERSONS],
    "institution": [ORGANIZATIONS],
    "company": [COMPANIES],
    "any": [PERSONS, ORGANIZATIONS, COMPANIES],
}

# Menschenlesbare Bezeichnungen für die Hierarchie-IDs.
LABELS: dict[str, dict[str, str]] = {
    ROOT: {"de": "Archiv für Agrargeschichte", "fr": "Archives d'histoire rurale",
           "it": "Archivio di storia rurale", "en": "Archives of Rural History"},
    PERSONS: {"de": "Personen", "fr": "Personnes", "it": "Persone", "en": "Persons"},
    ORGANIZATIONS: {"de": "Institutionen", "fr": "Institutions",
                    "it": "Istituzioni", "en": "Institutions"},
    COMPANIES: {"de": "Betriebe", "fr": "Exploitations", "it": "Aziende", "en": "Farms"},
    ARCHIVES: {"de": "Archivbestände", "fr": "Fonds d'archives",
               "it": "Fondi d'archivio", "en": "Archive holdings"},
    AUDIOVISUAL: {"de": "Audio-/visuelle Quellen", "fr": "Sources audiovisuelles",
                  "it": "Fonti audiovisive", "en": "Audiovisual sources"},
    EDITIONS: {"de": "Digitale Editionen", "fr": "Éditions numériques",
               "it": "Edizioni digitali", "en": "Digital editions"},
    EDITION_HOFSTETTER: {"de": "Edition Mina Hofstetter", "fr": "Édition Mina Hofstetter",
                        "it": "Edizione Mina Hofstetter", "en": "Mina Hofstetter Edition"},
    EDITION_GILLABERT_RANDIN: {"de": "Edition Augusta Gillabert-Randin",
                               "fr": "Édition Augusta Gillabert-Randin",
                               "it": "Edizione Augusta Gillabert-Randin",
                               "en": "Augusta Gillabert-Randin Edition"},
    EDITION_BOBBETT: {"de": "Edition Elizabeth Bobbett",
                      "fr": "Édition Elizabeth Bobbett",
                      "it": "Edizione Elizabeth Bobbett",
                      "en": "Elizabeth Bobbett Edition"},
    PUBLICATIONS: {"de": "Publikationen", "fr": "Publications",
                   "it": "Pubblicazioni", "en": "Publications"},
    MEDIA_REPORTS: {"de": "Medienberichte", "fr": "Articles de presse",
                    "it": "Articoli di stampa", "en": "Media reports"},
    OTHER_SOURCES: {"de": "Weitere Quellen", "fr": "Autres sources",
                    "it": "Altre fonti", "en": "Other sources"},
    AUDIOVISUAL_PHOTOS: {"de": "Fotos", "fr": "Photographies",
                         "it": "Fotografie", "en": "Photographs"},
    AUDIOVISUAL_FILMS: {"de": "Filme", "fr": "Films", "it": "Film", "en": "Films"},
}


def label(hierarchy_id: str, lang: str = "de") -> str:
    """Liefert das menschenlesbare Label, fällt auf die ID zurück, wenn unbekannt."""
    entry = LABELS.get(hierarchy_id)
    if not entry:
        return hierarchy_id
    return entry.get(lang) or entry.get("de") or hierarchy_id
