"""Recherche-Vorlagen, die der Server als MCP-Prompts ausliefert.

Warum im Server und nicht als Datei: Eine Vorlage, die jemand aus einer
Dokumentation kopiert, veraltet in dem Moment, in dem wir sie ändern, und
niemand merkt es. Ueber das Prompts-Primitive holt der Client sie bei jeder
Sitzung frisch, und alle Clients sehen denselben Wortlaut.

Abgrenzung zum Systemprompt (`SERVER_INSTRUCTIONS` in `server.py`):

  * Der Systemprompt gilt immer, ungefragt, für jede Anfrage. Er trägt nur
    Regeln, die in jeder Recherche gelten.
  * Diese Vorlagen wählt eine Person bewusst aus, wenn sie eine bestimmte
    Sorte Recherche macht. Sie sind länger, strenger und teils unbequem
    (vollständige Aufzählung statt Zusammenfassung), deshalb gehören sie
    nicht in den Systemprompt.

Herleitung und Langfassungen: `docs/prompts/`.

Jede Vorlage existiert auf Deutsch und Englisch. MCP kennt keine
Sprachverhandlung für Prompts, deshalb ist die Sprache ein Argument.
"""

from __future__ import annotations

from typing import Callable, List, Literal, Optional

PromptLanguage = Literal["de", "en"]

_DEFAULT_LANG: PromptLanguage = "de"


def _lang(value: Optional[str]) -> PromptLanguage:
    return "en" if (value or _DEFAULT_LANG).strip().lower().startswith("en") else "de"


def _opt(value: Optional[str], fallback: str) -> str:
    text = (value or "").strip()
    return text if text else fallback


# ---------------------------------------------------------------------------
# 01 Belegte Recherche
# ---------------------------------------------------------------------------

_RECHERCHE_DE = """Beantworte die folgende Frage ausschliesslich mit den Werkzeugen dieses \
Servers. Halte dich an das Protokoll, auch wenn ein Schritt überflüssig wirkt.

FRAGE: {frage}

Ablauf:
1. `list_hierarchy` mit dem Kern der Frage als `query`. Notiere jeden Bestand mit `count > 0`.
2. Für jeden dieser Bestände eine Suche mit `hierarchy=[<id>]`, `sort="id"`, `size=100`,
   und blättere über `next_cursor` bis `null`. Kein Bestand wird übersprungen, auch nicht
   bei niedriger Trefferzahl.
3. Für jede ID, die in der Antwort vorkommt, `fetch_document` aufrufen. Antworte nie aus dem
   `text`-Feld einer Suchantwort, das ist ein gekürztes Highlight-Snippet.

Regeln:
- Nur Angaben aus Tool-Antworten dieser Sitzung. Was nicht im Bestand steht, heisst
  "nicht im Bestand" und wird nicht aus Vorwissen ergänzt.
- Namen, Daten, Funktionen und Dossiernummern wörtlich übernehmen.
- Widersprüche zwischen Einträgen mit beiden IDs nennen, nicht auflösen.
- Reihenfolge der Ausgabe aufsteigend nach `id`, nicht nach Wichtigkeit.

Ausgabe:
- Antwort in höchstens fünf Sätzen, jeder Satz endet mit der ID seiner Quelle.
- Tabelle: id, title, collection, date, belegte Angabe, document_url.
- Abschnitt "nicht belegbar" mit den Teilfragen ohne Treffer.
- Lauf-Protokoll: jeder ausgeführte Aufruf wörtlich (Werkzeug, query, hierarchy, sort, size,
  Seitenzahl, total) sowie die Zahl der geprüften IDs. Ohne dieses Protokoll ist der Lauf
  nicht wiederholbar."""

_RECHERCHE_EN = """Answer the following question using only the tools of this server. Follow the \
protocol even where a step looks redundant.

QUESTION: {frage}

Procedure:
1. Call `list_hierarchy` with the core of the question as `query`. Note every collection with
   `count > 0`.
2. For each of those collections run a search with `hierarchy=[<id>]`, `sort="id"`, `size=100`,
   and page through `next_cursor` until it is `null`. Skip no collection, not even one with few
   hits.
3. Call `fetch_document` for every ID that appears in your answer. Never answer from the `text`
   field of a search response, it is a shortened highlight snippet.

Rules:
- Only information from tool responses in this session. Anything not in the holdings is
  "not in the holdings" and is never filled in from prior knowledge.
- Quote names, dates, offices and dossier numbers verbatim.
- Report contradictions between records with both IDs, do not resolve them.
- Order the output ascending by `id`, not by importance.

Output:
- Answer in at most five sentences, each ending with the ID of its source.
- Table: id, title, collection, date, the fact it supports, document_url.
- A section "unsupported" listing the sub-questions without hits.
- A run log: every executed call verbatim (tool, query, hierarchy, sort, size, number of pages,
  total) plus the number of IDs checked. Without that log the run cannot be repeated."""


def recherche_belegt(frage: str, language: Optional[str] = None) -> str:
    """Belegte Recherche mit Lauf-Protokoll."""
    template = _RECHERCHE_DE if _lang(language) == "de" else _RECHERCHE_EN
    return template.format(frage=frage.strip())


# ---------------------------------------------------------------------------
# 02 Vollständige Trefferliste
# ---------------------------------------------------------------------------

_LISTE_DE = """Erstelle eine vollständige Trefferliste. Du interpretierst nicht, fasst nicht \
zusammen und priorisierst nicht.

SUCHBEGRIFF (wörtlich so verwenden): {query}
BESTAENDE: {hierarchy}

Regeln:
- Verwende die Anfrage genau so. Keine Synonyme, keine Umformulierung, keine Korrektur der
  Schreibweise. Fällt dir eine bessere Anfrage auf, nenne sie am Ende unter "Vorschläge",
  führe sie aber nicht aus.
- `sort="id"`, `size=100`, blättere über `next_cursor` bis `null`.
- Jeder Treffer kommt in die Tabelle. Keine Auswahl, keine Kürzung, kein "und weitere". Auch
  offensichtlich unpassende Treffer werden aufgeführt, mit Vermerk in der Spalte Hinweis.
- `total` aus der ersten Antwort muss mit der Zeilenzahl übereinstimmen. Stimmt es nicht,
  schreibe die Abweichung hin, statt sie zu glätten.
- Keine Aussage über einen Treffer, die nicht wörtlich in `title`, `abstract` oder `meta` steht.

Ausgabe:
- Kopf: query, hierarchy, total laut Server, Zeilen in der Tabelle, Abweichung, Seiten abgerufen.
- Tabelle: id, title, collection, date, Hinweis. Aufsteigend nach `id`.
- Abschnitt "Vorschläge" mit nicht ausgeführten Anfragen."""

_LISTE_EN = """Produce a complete list of hits. Do not interpret, do not summarise, do not \
prioritise.

QUERY (use exactly as given): {query}
COLLECTIONS: {hierarchy}

Rules:
- Use the query exactly as given. No synonyms, no rephrasing, no spelling corrections. If you
  see a better query, name it at the end under "suggestions" but do not run it.
- `sort="id"`, `size=100`, page through `next_cursor` until it is `null`.
- Every hit goes into the table. No selection, no truncation, no "and more". Even clearly
  irrelevant hits are listed, flagged in the note column.
- The `total` from the first response must match the number of rows. If it does not, state the
  discrepancy instead of smoothing it over.
- No claim about a hit that is not verbatim in `title`, `abstract` or `meta`.

Output:
- Header: query, hierarchy, total per server, rows in table, discrepancy, pages fetched.
- Table: id, title, collection, date, note. Ascending by `id`.
- A "suggestions" section with queries you did not run."""


def trefferliste_vollstaendig(
    query: str, hierarchy: Optional[str] = None, language: Optional[str] = None
) -> str:
    """Alle Treffer einer Anfrage, ohne Auswahl durch das Modell."""
    de = _lang(language) == "de"
    template = _LISTE_DE if de else _LISTE_EN
    fallback = "alle" if de else "all"
    return template.format(query=query.strip(), hierarchy=_opt(hierarchy, fallback))


# ---------------------------------------------------------------------------
# 03 Dossier zu Person, Institution oder Betrieb
# ---------------------------------------------------------------------------

_DOSSIER_DE = """Erstelle ein Dossier nach festem Schema. Jedes Feld wird gefüllt oder als \
"nicht im Bestand" markiert. Kein Feld wird weggelassen, keines erfunden.

ENTITAET: {name}
TYP: {typ}

Ablauf:
1. `search_entities` mit dem Namen, `sort="id"`, `size=100`, blättern bis zum Ende.
2. Mehr als ein plausibler Treffer: alle Kandidaten mit id und title auflisten und fragen,
   welche gemeint ist. Entscheide das nicht selbst.
3. `fetch_document` für die gewählte ID.
4. Alle im Eintrag genannten verknüpften IDs ebenfalls abrufen, vollständig, nicht die
   interessantesten.

Formular (jede Zeile ausgeben, auch leere):
id, title, collection, Lebensdaten oder Bestehenszeitraum, Orte, Ausbildung, Tätigkeit,
Funktionen und Aemter (ALLE, je Zeile eine, wörtlich), Verwandtschaft (Name | Verhältnis | id),
verknüpfte Betriebe, eigene Publikationen, audiovisuelle Quellen, Dossiernummern,
document_url, original_url, nicht belegte Felder.

Regeln:
- Das Feld Funktionen und Aemter ist vollständig zu füllen. Keine Auswahl der wichtigsten,
  keine Zusammenfassung, keine Wertung.
- Wörtlich übernehmen, nicht paraphrasieren.
- Widersprüche zwischen dem Eintrag und einem verknüpften Eintrag beide aufführen, im Format
  A (id) gegen B (id). Nicht auflösen.
- Am Ende das Lauf-Protokoll mit allen ausgeführten Aufrufen."""

_DOSSIER_EN = """Produce a dossier with a fixed schema. Every field is either filled in or \
marked "not in the holdings". No field is omitted, none is invented.

ENTITY: {name}
TYPE: {typ}

Procedure:
1. `search_entities` with the name, `sort="id"`, `size=100`, page to the end.
2. More than one plausible hit: list all candidates with id and title and ask which one is meant.
   Do not decide this yourself.
3. `fetch_document` for the chosen ID.
4. Fetch every linked ID named in the record as well, all of them, not the interesting ones.

Form (print every line, including empty ones):
id, title, collection, life dates or period of existence, places, education, occupation,
offices held (ALL of them, one per line, verbatim), family (name | relation | id), linked farms,
own publications, audiovisual sources, dossier numbers, document_url, original_url,
unsupported fields.

Rules:
- The offices field must be complete. No picking the important ones, no summary, no judgement.
- Quote verbatim, do not paraphrase.
- List contradictions between the record and a linked record as A (id) versus B (id). Do not
  resolve them.
- End with the run log of every executed call."""


def entity_dossier(
    name: str, typ: Optional[str] = None, language: Optional[str] = None
) -> str:
    """Dossier mit festen Feldern, gegen Auslassungen."""
    template = _DOSSIER_DE if _lang(language) == "de" else _DOSSIER_EN
    return template.format(name=name.strip(), typ=_opt(typ, "any"))


# ---------------------------------------------------------------------------
# 04 Foto- und Filmliste
# ---------------------------------------------------------------------------

_AV_DE = """Stelle audiovisuelle Quellen zu einem Thema zusammen, mit den Angaben, die für \
Publikation oder Programm nötig sind.

THEMA: {thema}
ZEITRAUM: {zeitraum}

Ablauf:
1. `list_hierarchy` mit dem Thema. Sind Foto- und Filmbestand beide bei null, brich ab und
   melde, dass zum Thema keine audiovisuellen Quellen erschlossen sind.
2. Runde 1: `search_audiovisual` mit dem Thema wörtlich, `sort="id"`, `size=100`, blättern
   bis zum Ende.
3. Ernte die Schlagworte aus den `meta`-Feldern aller Treffer und liste sie mit Häufigkeit auf.
4. Runde 2: führe je Schlagwort, das mindestens zweimal vorkommt, genau eine weitere Suche mit
   diesem Schlagwort wörtlich aus. Keine selbst erfundenen Synonyme. Die Schwelle ist die
   Regel, nicht dein Urteil.
5. IDs beider Runden vereinigen, deduplizieren, nach `id` sortieren, `fetch_document` für jede.

Ausgabe:
- Tabelle der Schlagworte: Schlagwort, Häufigkeit in Runde 1, in Runde 2 gesucht, zusätzliche
  Treffer.
- Quellenliste: id, Typ (Foto oder Film), Jahr, Dauer, Auftraggeber, Dossiernummer,
  document_url. Fehlende Felder als "nicht im Bestand". Jahr und Dauer wörtlich, nicht
  gerechnet und nicht gerundet.
- Zu Nutzungsrechten keine Aussage. Steht nichts im Eintrag, schreibe: Rechte nicht im
  Datensatz, beim AfA klären.
- Lauf-Protokoll mit allen Anfragen wörtlich in Ausführungsreihenfolge."""

_AV_EN = """Compile audiovisual sources on a topic, with the details needed for a publication \
or a screening programme.

TOPIC: {thema}
PERIOD: {zeitraum}

Procedure:
1. `list_hierarchy` with the topic. If both the photo and the film collection are at zero, stop
   and report that no audiovisual sources on the topic are catalogued.
2. Round 1: `search_audiovisual` with the topic verbatim, `sort="id"`, `size=100`, page to the
   end.
3. Harvest the keywords from the `meta` fields of all hits and list them with their frequency.
4. Round 2: for every keyword occurring at least twice, run exactly one further search with that
   keyword verbatim. No self-invented synonyms. The threshold is the rule, not your judgement.
5. Merge the IDs of both rounds, deduplicate, sort by `id`, call `fetch_document` for each.

Output:
- Keyword table: keyword, frequency in round 1, searched in round 2, additional hits.
- Source list: id, type (photo or film), year, duration, commissioning body, dossier number,
  document_url. Missing fields as "not in the holdings". Year and duration verbatim, neither
  computed nor rounded.
- Say nothing about usage rights. If the record is silent, write: rights not in the record,
  clarify with the AfA.
- Run log with every query verbatim in order of execution."""


def av_quellenliste(
    thema: str, zeitraum: Optional[str] = None, language: Optional[str] = None
) -> str:
    """Foto- und Filmliste mit kontrollierter Schlagwort-Erweiterung."""
    de = _lang(language) == "de"
    template = _AV_DE if de else _AV_EN
    return template.format(
        thema=thema.strip(), zeitraum=_opt(zeitraum, "alle" if de else "all")
    )


# ---------------------------------------------------------------------------
# 05 Widerspruchspruefung
# ---------------------------------------------------------------------------

_WIDERSPRUCH_DE = """Stelle Angaben zu einem Sachverhalt aus mehreren Einträgen gegenüber. \
Du löst nicht auf.

SACHVERHALT: {sachverhalt}
EINTRAEGE: {ids}

Ablauf:
1. Sind keine IDs genannt: suche mit dem Sachverhalt, `sort="id"`, `size=100`, blättere bis
   zum Ende. Alle Treffer sind Prüfkandidaten.
2. `fetch_document` für jede ID.
3. Extrahiere je Eintrag jede Angabe zum Sachverhalt wörtlich, mit Feldnamen.

Ausgabe:
- Tabelle: Angabe, Quelle A (id), Quelle B (id), Status. Status ist übereinstimmend,
  widersprüchlich, nur in A oder nur in B.
- Je widersprüchlicher Zeile beide Textstellen wörtlich, mit id und Feldname.

Regeln:
- Löse Widersprüche nicht auf. Priorisiere keine Quelle. Formuliere keine wahrscheinlichere
  Variante. Das ist Sache der Nutzerin.
- Kein Ausgleich über Weltwissen ("1856 ist plausibler, weil...").
- Auch triviale Abweichungen aufführen: Schreibweisen, Datumsformate, Ortsnamen.
- Ist alles übereinstimmend, sage das und nenne, welche Felder geprüft wurden. Ohne diese
  Liste ist die Aussage wertlos."""

_WIDERSPRUCH_EN = """Set the statements about one matter from several records side by side. Do \
not resolve anything.

MATTER: {sachverhalt}
RECORDS: {ids}

Procedure:
1. If no IDs are given: search for the matter with `sort="id"`, `size=100`, page to the end.
   All hits are candidates.
2. `fetch_document` for every ID.
3. Extract every statement about the matter from each record verbatim, with the field name.

Output:
- Table: statement, source A (id), source B (id), status. Status is matching, contradictory,
  only in A, or only in B.
- For every contradictory row, both passages verbatim, with id and field name.

Rules:
- Do not resolve contradictions. Do not privilege a source. Do not offer a more likely variant.
  That is the user's call.
- No reconciliation from world knowledge ("1856 is more plausible because...").
- List trivial deviations too: spellings, date formats, place names.
- If everything matches, say so and name the fields you checked. Without that list the statement
  is worthless."""


def widerspruchspruefung(
    sachverhalt: str, ids: Optional[str] = None, language: Optional[str] = None
) -> str:
    """Angaben mehrerer Einträge gegenüberstellen, ohne sie aufzulösen."""
    de = _lang(language) == "de"
    template = _WIDERSPRUCH_DE if de else _WIDERSPRUCH_EN
    return template.format(
        sachverhalt=sachverhalt.strip(),
        ids=_opt(ids, "ermitteln" if de else "determine them yourself"),
    )


# ---------------------------------------------------------------------------
# 06 Fremdpruefung eines fremden Ergebnisses
# ---------------------------------------------------------------------------

_FREMDPRUEFUNG_DE = """Prüfe ein fremdes Rechercheergebnis nach. Du kennst dessen Antworttext \
nicht und liest ihn nicht, bevor dein eigener Lauf fertig ist.

REZEPT ODER LAUF-PROTOKOLL DES VORLAUFS:
{rezept}

Ablauf:
1. Führe jeden dort genannten Aufruf erneut aus, wörtlich identisch in query, hierarchy,
   sort und size. Keine Verbesserung, keine Ergänzung.
2. Baue deine eigene Ergebnisliste.
3. Erst jetzt das fremde Ergebnis lesen und diffen.

Ausgabe:
- Diff: IDs nur im Vorlauf, IDs nur im neuen Lauf, IDs in beiden, Felder mit abweichendem
  Inhalt, Abweichungen bei `total`.
- Bewertung mit genau einem Status: reproduziert, Bestand geändert, Aufrufe abweichend,
  Auswahl des Modells abweichend, Kontext fehlte im Rezept.

Regeln:
- Deine Aufgabe ist die Abweichung, nicht die bessere Antwort. Verbessere den Vorlauf nicht.
- Fehlt im Rezept etwas, das du gebraucht hättest, ist genau das der Befund.
- Ist das Rezept unvollständig oder gar nicht vorhanden, brich ab und melde das: ohne Rezept
  ist keine Prüfung möglich."""

_FREMDPRUEFUNG_EN = """Check somebody else's research result. You do not know their answer text \
and you do not read it before your own run is finished.

RECIPE OR RUN LOG OF THE EARLIER RUN:
{rezept}

Procedure:
1. Execute every call named there again, verbatim identical in query, hierarchy, sort and size.
   No improvements, no additions.
2. Build your own result list.
3. Only now read the earlier result and diff it.

Output:
- Diff: IDs only in the earlier run, IDs only in the new run, IDs in both, fields with differing
  content, deviations in `total`.
- Verdict with exactly one status: reproduced, holdings changed, calls differed, model selection
  differed, context was missing from the recipe.

Rules:
- Your job is the deviation, not the better answer. Do not improve the earlier run.
- If the recipe lacks something you would have needed, that is precisely the finding.
- If the recipe is incomplete or absent, stop and report it: without a recipe no check is
  possible."""


def fremdpruefung(rezept: str, language: Optional[str] = None) -> str:
    """Fremdes Ergebnis blind nachrechnen und die Abweichung benennen."""
    template = _FREMDPRUEFUNG_DE if _lang(language) == "de" else _FREMDPRUEFUNG_EN
    return template.format(rezept=rezept.strip())


# ---------------------------------------------------------------------------
# Registrierung
# ---------------------------------------------------------------------------

# Titel und Beschreibung sind zweisprachig, weil der Client sie unverändert
# anzeigt und MCP hier keine Sprachverhandlung kennt.
PROMPT_SPECS: List[tuple[Callable[..., str], str, str, str]] = [
    (
        recherche_belegt,
        "recherche_belegt",
        "Belegte Recherche · Sourced research",
        (
            "Beantwortet eine Frage nur aus dem Bestand, mit Dokument-IDs, Links "
            "und Protokoll der Suchaufrufe. / Answers a question from the holdings "
            "only, with document IDs, links and a log of the search calls. "
            "Argumente: frage, language (de|en)."
        ),
    ),
    (
        trefferliste_vollstaendig,
        "trefferliste_vollstaendig",
        "Vollständige Trefferliste · Complete result list",
        (
            "Zählt alle Treffer einer wörtlich vorgegebenen Anfrage auf, ohne "
            "Auswahl durch das Modell. / Enumerates all hits of a verbatim query, "
            "with no selection by the model. Argumente: query, hierarchy, "
            "language (de|en)."
        ),
    ),
    (
        entity_dossier,
        "entity_dossier",
        "Dossier zu Person, Institution, Betrieb · Entity dossier",
        (
            "Füllt ein festes Formular, damit einzelne Ämter und Verknüpfungen "
            "nicht unter den Tisch fallen. / Fills a fixed form so that individual "
            "offices and links are not dropped. Argumente: name, "
            "typ (person|institution|farm|any), language (de|en)."
        ),
    ),
    (
        av_quellenliste,
        "av_quellenliste",
        "Foto- und Filmliste · Photo and film list",
        (
            "Stellt audiovisuelle Quellen zusammen und erweitert die Suche nur um "
            "Schlagworte aus dem Bestand. / Compiles audiovisual sources and "
            "expands the search only with keywords found in the holdings. "
            "Argumente: thema, zeitraum, language (de|en)."
        ),
    ),
    (
        widerspruchspruefung,
        "widerspruchspruefung",
        "Widerspruchsprüfung · Contradiction check",
        (
            "Stellt Angaben mehrerer Einträge gegenüber und löst sie ausdrücklich "
            "nicht auf. / Sets statements from several records side by side and "
            "deliberately leaves them unresolved. Argumente: sachverhalt, ids, "
            "language (de|en)."
        ),
    ),
    (
        fremdpruefung,
        "fremdpruefung",
        "Fremdprüfung eines Ergebnisses · Third party check",
        (
            "Rechnet ein fremdes Ergebnis blind nach und benennt die Abweichung. / "
            "Redoes somebody else's result blind and names the deviation. "
            "Argumente: rezept, language (de|en)."
        ),
    ),
]


def register_prompts(mcp) -> None:
    """Haengt alle Vorlagen als MCP-Prompts an den Server."""
    for func, name, title, description in PROMPT_SPECS:
        mcp.prompt(name=name, title=title, description=description)(func)
