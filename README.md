# afa-mcp

MCP-Server für das AGHIST-Suchportal des **Archivs für Agrargeschichte (AfA)** (Archives d'histoire rurale AHR /
Archives of Rural History ARH) in Bern (CH).

AGHIST ist das Suchportal zur Agrar-, Ernährungs- und Umweltgeschichte und ermöglicht einen Zugriff auf die online-Ressourcen (Filme, Fotos und schriftliche Quellen sowie Verzeichnungsdaten, wissenschaftliche Texte, Video Essays, etc.), die vom AfA und seinen Partnerinstitutionen im In- und Ausland öffentlich zugänglich gemacht werden.

Der AGHIST MCP-Server stellt Volltext-Suche und Hierarchie-Recherche über das
Model Context Protocol (Streamable HTTP) bereit, sodass MCP-fähige Clients wie
Claude, ChatGPT, Cursor oder Perplexity direkt in den AfA-Beständen suchen können.

Live-Endpunkt: <https://mcp.histoirerurale.ch/mcp>

## Inhalt

1. [In zwei Sätzen: was hier passiert](#in-zwei-sätzen-was-hier-passiert)
2. [Server verbinden](#server-verbinden)
3. [Werkzeuge](#werkzeuge)
4. [Grundbegriffe, die in allen Werkzeugen gleich sind](#grundbegriffe-die-in-allen-werkzeugen-gleich-sind)
5. [Mit guten Prompts mehr aus dem Server holen](#mit-guten-prompts-mehr-aus-dem-server-holen)
6. [Konfiguration: das Verhalten über Einstellungen steuern](#konfiguration-das-verhalten-über-einstellungen-steuern)
7. [Lokal entwickeln](#lokal-entwickeln)
8. [Produktion](#produktion-debian)
9. [Architektur](#architektur)

## In zwei Sätzen: was hier passiert

Ein Sprachmodell (Claude, ChatGPT, Cursor) kann nicht in den AfA-Beständen suchen,
es kennt sie nicht. Dieser Server stellt dem Modell neun Werkzeuge zur Verfügung,
mit denen es selbst suchen, blättern und einzelne Einträge abrufen kann, und gibt
zu jedem Treffer eine ID und einen Link zurück, damit jede Aussage nachprüfbar bleibt.

Wer eine Frage stellt, redet also weiterhin mit dem Modell. Das Modell entscheidet,
welches Werkzeug es aufruft und mit welchen Parametern. Genau deshalb sind die beiden
Kapitel [Prompts](#mit-guten-prompts-mehr-aus-dem-server-holen) und
[Konfiguration](#konfiguration-das-verhalten-über-einstellungen-steuern) so wichtig
wie die Werkzeugliste selbst.

## Server verbinden

Der Server läuft öffentlich, es braucht kein Konto und keinen Schlüssel.

| Client | Vorgehen |
|---|---|
| Claude (Web, Desktop) | Einstellungen, Connectors, eigenen Connector hinzufügen, URL `https://mcp.histoirerurale.ch/mcp` |
| Claude Code | `claude mcp add --transport http afa-recherche https://mcp.histoirerurale.ch/mcp` |
| ChatGPT | Einstellungen, Connectors, MCP-Server hinzufügen, dieselbe URL |
| Cursor, Perplexity, andere | in der jeweiligen MCP-Konfiguration einen Server vom Typ `streamable-http` mit dieser URL eintragen |
| Lokal, ohne Netz | Repository klonen und `python -m afa_mcp --transport stdio` als lokalen Server eintragen |

Ob die Verbindung steht, prüft man am schnellsten mit dem Werkzeug `server_info`:
Frage im Chat einfach «rufe server_info auf». Kommen Name, Version und
Elasticsearch-URL zurück, ist alles bereit.

## Werkzeuge

Neun Werkzeuge, drei Gruppen: suchen, einzelnes Dokument holen, Bestände auflisten.

| Werkzeug | Wofür | Typische Frage |
|---|---|---|
| `search` | Suche über alles, optional auf Bestände eingeschränkt | «Was gibt es zu Milchgenossenschaften im Emmental?» |
| `search_entities` | nur Personen, Institutionen, Betriebe | «Wer war Mina Hofstetter?» |
| `search_audiovisual` | nur Fotos und Filme | «Welche Filme zeigen Kartoffelernte?» |
| `search_edition_hofstetter` | nur die Edition Mina Hofstetter | «Was schreibt Hofstetter über Bodenbearbeitung?» |
| `search_edition_gillabert_randin` | nur die Edition Augusta Gillabert-Randin | «Welche Briefe betreffen den Waadtländer Bäuerinnenverband?» |
| `search_edition_bobbett` | nur die Edition Elizabeth Bobbett | «Was steht in den Tagebüchern von 1933?» |
| `fetch_document` | ein Dokument über seine ID vollständig holen | «Zeig mir den Eintrag `AfA_Personen_001_DB9920`» |
| `list_hierarchy` | welche Bestände es gibt und wie viele Treffer sie liefern | «In welchen Beständen kommt "Alpwirtschaft" vor?» |
| `server_info` | Version, Endpunkt, gültige Parameterwerte | Diagnose |

Aktuelle Trefferzahlen pro Sammlung liefert `list_hierarchy`. Sie stehen bewusst
nicht in dieser Doku, weil sie dort sofort veralten würden.

### `search`: generische Volltext-Suche

Durchsucht alle AfA-Bestände (Personen, Institutionen, Betriebe, Foto- und Film-Bestände, Archive, digitale Editionen, Publikationen, Medienberichte). Optional auf beliebige Hierarchie-IDs einschränkbar.

| Parameter | Typ | Default | Beschreibung |
|---|---|---|---|
| `query` | str | `*` | Lucene-Query-String. Phrasen mit `"..."`, `AND`/`OR`/`NOT`, Wildcards `*` und `?`. Default-Operator: AND. |
| `language` | `de`\|`fr`\|`it`\|`en` | keiner | Bevorzugte Sprache für Titel und Highlight (kein Filter, fällt zurück). |
| `sort` | `relevance`\|`date`\|`id` | `relevance` | Sortierung. |
| `size` | int (1 bis 100) | 20 | Treffer pro Seite. |
| `search_after` | list | keiner | Cursor aus `next_cursor` der vorigen Antwort. |
| `hierarchy` | list[str] | keiner | Hierarchie-IDs zur Einschränkung (mit OR verknüpft). Aus `list_hierarchy`. |
| `include_aggregations` | bool | false | Hierarchie-Aggregation mitliefern. |

**Rückgabe (`SearchResponse`):**

| Feld | Typ | Beschreibung |
|---|---|---|
| `total` | int | Gesamtzahl der Treffer (auch über `size` hinaus). |
| `hits` | list[SearchHit] | Trefferliste (höchstens `size` Einträge). |
| `next_cursor` | list \| null | An `search_after` des nächsten Requests weitergeben; `null` heisst: keine weiteren Treffer. |
| `aggregations` | dict \| null | Hierarchie-Buckets, nur wenn `include_aggregations=true`. |

**`SearchHit`-Felder:** `id`, `title`, `abstract`, `text` (Highlight-Snippet), `meta`, `hierarchy` (Pfad), `collection` (Label), `date` (ISO, optional), `is_pdf`, `document_url` (Suchportal-Deep-Link), `original_url` (Quell-URL), `sort` (interner Cursor).

### `search_entities`: Personen, Institutionen, Betriebe

| Parameter | Typ | Default | Beschreibung |
|---|---|---|---|
| `query` | str | `*` | Lucene-Query-String. |
| `entity_type` | `person`\|`institution`\|`farm`\|`any` | `any` | Typ-Filter. `company` bleibt als veralteter Alias für `farm` erhalten. |
| `language` | `de`\|`fr`\|`it`\|`en` | keiner | Bevorzugte Sprache. |
| `sort` | `relevance`\|`date`\|`id` | `relevance` | Sortierung. |
| `size` | int (1 bis 100) | 20 | Treffer pro Seite. |
| `search_after` | list | keiner | Paginierungs-Cursor. |

**Rückgabe:** `SearchResponse` wie bei `search`, die `hits` sind auf Personen, Institutionen und Betriebe eingeschränkt.

### `search_audiovisual`: Foto- und Film-Bestände

| Parameter | Typ | Default | Beschreibung |
|---|---|---|---|
| `query` | str | `*` | Lucene-Query-String. |
| `media_type` | `photos`\|`films` | keiner | `photos` liefert nur Fotos, `films` nur Filme, ohne Angabe beides. |
| `language` | `de`\|`fr`\|`it`\|`en` | keiner | Bevorzugte Sprache. |
| `sort` | `relevance`\|`date`\|`id` | `relevance` | Sortierung. |
| `size` | int (1 bis 100) | 20 | Treffer pro Seite. |
| `search_after` | list | keiner | Paginierungs-Cursor. |

**Rückgabe:** `SearchResponse` wie bei `search`, die `hits` sind auf Foto- und Filmbestände eingeschränkt.

### `search_edition_hofstetter`, `search_edition_gillabert_randin`, `search_edition_bobbett`

Volltext-Suche jeweils in einer der drei digitalen Editionen (Mina Hofstetter, Augusta Gillabert-Randin, Elizabeth Bobbett).

| Parameter | Typ | Default | Beschreibung |
|---|---|---|---|
| `query` | str | `*` | Lucene-Query-String. |
| `language` | `de`\|`fr`\|`it`\|`en` | keiner | Bevorzugte Sprache. |
| `sort` | `relevance`\|`date`\|`id` | `relevance` | Sortierung. |
| `size` | int (1 bis 100) | 20 | Treffer pro Seite. |
| `search_after` | list | keiner | Paginierungs-Cursor. |

**Rückgabe:** `SearchResponse` wie bei `search`, die `hits` sind auf die jeweilige Edition eingeschränkt.

### `fetch_document`: einzelnes Dokument holen

| Parameter | Typ | Default | Beschreibung |
|---|---|---|---|
| `id` | str | erforderlich | Dokument-ID, zum Beispiel `AfA_Personen_001_DB9920` oder `AfA_Edition_003_BobbettE_1933_01`. |
| `language` | `de`\|`fr`\|`it`\|`en` | keiner | Bevorzugte Sprache. |

**Rückgabe:** einzelner `SearchHit` mit den Metadaten des Dokuments **ohne Volltext**. Wichtige Felder:

- Metadaten: `id`, `title`, `abstract`, `meta`, `hierarchy` (Sammlungs-Pfad), `collection` (Label), `date` (ISO, optional), `is_pdf`.
- `document_url`: Link zur PDF- oder HTML-Datei im **Suchportal** (`recherche2.histoirerurale.ch`).
- `original_url`: **Deep-Link ins Quellportal**, also die Website, von der der Scraper das Dokument geholt hat (zum Beispiel `histoirerurale.ch`, je nach Bestand verschieden).

`null`, wenn die ID nicht gefunden wird.

### `list_hierarchy`: Bestände mit Trefferzahlen

Dieses Werkzeug beantwortet die Frage «wo müsste ich überhaupt suchen». Es ist
der beste erste Aufruf einer Recherche, weil es mit einer einzigen Anfrage zeigt,
welche Bestände zum Thema etwas enthalten.

| Parameter | Typ | Default | Beschreibung |
|---|---|---|---|
| `query` | str | `*` | Optionale Volltext-Anfrage. |
| `size` | int (1 bis 10000) | 200 | Maximale Anzahl Hierarchie-Einträge. |
| `language` | `de`\|`fr`\|`it`\|`en` | keiner | Label-Sprache. |

**Rückgabe (`HierarchyResponse`):**

| Feld | Typ | Beschreibung |
|---|---|---|
| `entries` | list[HierarchyEntry] | Hierarchie-Einträge. |

**`HierarchyEntry`-Felder:** `id` (Hierarchie-ID zur Verwendung im `hierarchy`-Parameter der Such-Werkzeuge), `count` (Trefferanzahl), `label` (menschenlesbare Bezeichnung in der angefragten Sprache, sofern verfügbar).

### `server_info`: Versions- und Endpunkt-Information

Keine Parameter.

**Rückgabe (dict):**

| Feld | Typ | Beschreibung |
|---|---|---|
| `name` | str | Server-Name (`afa-mcp`). |
| `version` | str | Semver. |
| `elasticsearch_url` | str | Upstream-URL des ES-Backends. |
| `languages` | list[str] | `de`, `fr`, `it`, `en`. |
| `sort_orders` | list[str] | Akzeptierte Werte für `sort`. |
| `hierarchy_constants` | dict | Sprechende Konstanten (zum Beispiel `PERSONS`, `EDITION_BOBBETT`) zu Hierarchie-ID-Strings. |

## Grundbegriffe, die in allen Werkzeugen gleich sind

**Anfrage (`query`).** Lucene-Syntax. Mehrere Wörter sind mit UND verknüpft, eine
Phrase steht in Anführungszeichen, `*` und `?` sind Platzhalter. Beispiele:
`Bäuerin AND Emmental`, `"Schweizerischer Bäuerinnenverband"`, `Milchgenossenschaft*`.

**Bestände (`hierarchy`).** Die Sammlungen des AfA sind ein Baum. Jeder Knoten hat
eine ID, die `list_hierarchy` liefert. Wird eine Liste solcher IDs an ein
Such-Werkzeug übergeben, sucht der Server nur dort (die IDs sind mit ODER verknüpft).

**Blättern (`size`, `search_after`, `next_cursor`).** Eine Antwort enthält höchstens
`size` Treffer, aber `total` sagt, wie viele es insgesamt gibt. Ist `next_cursor`
nicht `null`, gibt es weitere Seiten: den Wert unverändert als `search_after` in die
nächste Anfrage geben. Wer nach der ersten Seite aufhört, hat eine zufällige
Teilmenge, keine Trefferliste.

**Snippet ist nicht der Eintrag.** Das Feld `text` einer Suchantwort ist ein
gekürztes Highlight rund um die Fundstelle. Wer daraus zitiert, zitiert Bruchstücke.
Für jede Aussage gehört der Eintrag über `fetch_document` geholt.

**Sortierung (`sort`).** `relevance` ist bequem, aber nicht stabil: ändert sich der
Index, ändert sich die Reihenfolge. `id` ist stabil und damit die Wahl, wenn ein
Ergebnis später noch einmal genau so herauskommen soll.

**Sprache (`language`).** Beeinflusst nur, in welcher Sprache Titel und Labels
bevorzugt zurückkommen. Es ist kein Filter: fehlt eine Übersetzung, kommt eine
andere Sprache zurück.

## Mit guten Prompts mehr aus dem Server holen

Die Werkzeuge sind nur die eine Hälfte. Die andere Hälfte ist die Frage, die im
Chat gestellt wird, denn sie entscheidet, wie das Modell die Werkzeuge benutzt.

Das häufigste Problem ist nicht, dass ein Modell etwas erfindet. Es ist
**Auslassung**: dieselbe Frage, zweimal gestellt, liefert zwei Antworten, beide
korrekt, aber jede lässt etwas anderes weg. Ein Prompt, der das Vorgehen vorgibt
statt nur das Ergebnis zu bestellen, behebt genau das.

### Sechs Sätze, die fast immer helfen

| Satz im Prompt | Was er verhindert |
|---|---|
| «Beginne mit `list_hierarchy`, damit klar ist, welche Bestände etwas enthalten.» | Das Modell sucht nur dort, wo es zufällig zuerst hinschaut. |
| «Setze `sort="id"` und `size=100`.» | Wechselnde Reihenfolge, zu kleine Seiten. |
| «Blättere über `next_cursor`, bis er `null` ist.» | Antwort aus der ersten Seite statt aus allen Treffern. |
| «Rufe für jede ID, die in der Antwort vorkommt, `fetch_document` auf.» | Zitate aus dem gekürzten Snippet. |
| «Belege jede Aussage mit `id` und `document_url`. Was nicht im Bestand steht, heisst "nicht im Bestand".» | Ergänzungen aus dem Vorwissen des Modells. |
| «Gib am Ende alle ausgeführten Aufrufe wörtlich aus.» | Ein Ergebnis, das niemand nachvollziehen kann. |

### Ausgabeform vorgeben

Freie Prosa lädt zum Auswählen ein, eine Tabelle mit Pflichtspalten nicht. Wer
schreibt «Tabelle mit den Spalten id, title, collection, date, document_url», sieht
eine leere Zelle sofort. Ein weggelassener Satz dagegen fällt niemandem auf.

Dasselbe gilt für Dossiers: ein festes Formular, in dem jedes Feld entweder gefüllt
oder als «nicht im Bestand» markiert wird, ist deutlich zuverlässiger als die Bitte
um eine Zusammenfassung.

### Vorlagen zum Kopieren

**Belegte Antwort auf eine Frage**

```text
Beantworte die Frage ausschliesslich mit den Werkzeugen des AfA-Servers.

FRAGE: <deine Frage>

Vorgehen:
1. list_hierarchy mit dem Kern der Frage, notiere jeden Bestand mit count > 0.
2. Für jeden dieser Bestände suchen mit hierarchy=[<id>], sort="id", size=100,
   und über next_cursor blättern, bis er null ist.
3. fetch_document für jede ID, die in deiner Antwort vorkommt.

Regeln: nur Angaben aus Tool-Antworten dieser Sitzung, Namen und Daten wörtlich,
Widersprüche mit beiden IDs nennen und nicht auflösen.

Ausgabe: Antwort in höchstens fünf Sätzen, jeder Satz endet mit der ID seiner
Quelle. Dazu eine Tabelle (id, title, collection, date, document_url) und ein
Protokoll aller ausgeführten Aufrufe.
```

**Vollständige Trefferliste**

```text
Erstelle eine vollständige Trefferliste, ohne zu interpretieren oder zu kürzen.

SUCHBEGRIFF (wörtlich so verwenden): <Anfrage>
BESTAENDE: <Hierarchie-IDs oder "alle">

sort="id", size=100, blättern bis next_cursor null ist. Jeder Treffer kommt in die
Tabelle, auch offensichtlich unpassende, mit Vermerk in der Spalte Hinweis. Die
Zeilenzahl muss zu total aus der ersten Antwort passen; weicht sie ab, schreibe die
Abweichung hin. Bessere Anfragen nennst du am Ende unter "Vorschläge", führst sie
aber nicht aus.
```

**Dossier zu einer Person, Institution oder einem Betrieb**

```text
Erstelle ein Dossier nach festem Schema zu: <Name> (Typ: person|institution|farm)

1. search_entities mit dem Namen, sort="id", size=100, bis zum Ende blättern.
2. Mehrere plausible Treffer: alle Kandidaten mit id und title auflisten und
   nachfragen, welcher gemeint ist. Nicht selbst entscheiden.
3. fetch_document für die gewählte ID und für jede verknüpfte ID.

Formular, jede Zeile ausgeben, auch leere: id, title, collection, Lebensdaten,
Orte, Ausbildung, Tätigkeit, Funktionen und Ämter (ALLE, je eine pro Zeile,
wörtlich), Verwandtschaft, verknüpfte Betriebe, Publikationen, audiovisuelle
Quellen, Dossiernummern, document_url, nicht belegte Felder.
```

**Ein fremdes Ergebnis nachprüfen**

```text
Führe die folgenden Aufrufe wörtlich identisch erneut aus (query, hierarchy, sort,
size unverändert), baue deine eigene Ergebnisliste und vergleiche sie erst danach
mit dem fremden Ergebnis.

PROTOKOLL DES VORLAUFS:
<Aufrufe einfügen>

Ausgabe: IDs nur im Vorlauf, IDs nur im neuen Lauf, IDs in beiden, abweichende
Felder, Abweichungen bei total. Bewertung mit genau einem Status: reproduziert,
Bestand geändert, Aufrufe abweichend, Auswahl des Modells abweichend.
```

### Was ein Prompt nicht leisten kann

Ein Prompt ist eine Bitte, kein Vertrag. Zählen, formatieren, blättern und
auswählen macht ein Skript zuverlässiger als jede Formulierung. Sobald ein
Ergebnis wiederholt exakt gleich herauskommen muss, gehört die Schleife in Code,
der die Werkzeuge aufruft, und das Modell entscheidet nur noch, wonach gesucht wird.

## Konfiguration: das Verhalten über Einstellungen steuern

Der Server wird ausschliesslich über Umgebungsvariablen gesteuert, es gibt keine
Konfigurationsdatei mit eigener Syntax. `.env.example` enthält alle Variablen mit
Kommentar; für den Betrieb werden sie in `start.sh` (Plesk) oder in der
systemd-Unit gesetzt. Nach jeder Änderung muss der Server neu gestartet werden,
sonst passiert nichts.

### Womit der Server spricht

| Variable | Default | Was sie bewirkt |
|---|---|---|
| `AFA_ES_URL` | `https://agrargeschichte.pansoft.de:9210/*/_search` | Elasticsearch-Endpoint, also die Datenquelle. Auf einen Test-Index zeigen lassen, um ohne Produktivdaten zu arbeiten. |
| `HTTP_TIMEOUT` | `30` | Sekunden, die eine Elasticsearch-Anfrage dauern darf. Höher setzen, wenn grosse Seiten (`size=100`) in Timeouts laufen. |
| `AFA_VERIFY_SSL` | `true` | TLS-Prüfung des Upstreams. Nur für einen Testserver mit selbstsigniertem Zertifikat auf `false`. |

### Wo und wie der Server erreichbar ist

| Variable | Default | Was sie bewirkt |
|---|---|---|
| `MCP_TRANSPORT` | `streamable-http` | `streamable-http` für den Netzbetrieb, `stdio` für lokale CLI-Clients. |
| `HOST` | `127.0.0.1` | Interface. Bei vorgelagertem nginx oder Apache auf `127.0.0.1` lassen, sonst ist der Server am Proxy vorbei erreichbar. |
| `PORT` | `8766` | Port. Ändern, wenn er belegt ist; dann auch die Proxy-Regel anpassen. |
| `MCP_PATH` | `/mcp` | Pfad-Präfix der MCP-Endpunkte. Ändern heisst: alle Clients müssen ihre URL anpassen. |
| `PUBLIC_BASE_URL` | `https://mcp.histoirerurale.ch` | Basis-URL, die in Server Card und `.well-known`-Antworten steht, und Grundlage der erlaubten Hosts. Bei eigener Domain zwingend anpassen. |

### Sicherheit und Browser-Zugriff

| Variable | Default | Was sie bewirkt |
|---|---|---|
| `MCP_STATELESS_HTTP` | `true` | Ohne serverseitige Session. Nötig, damit mehrere Prozesse oder ein Neustart laufende Clients nicht abhängen. |
| `MCP_JSON_RESPONSE` | `true` | Antwortet auch Clients, die nur `application/json` akzeptieren, statt Server-Sent-Events zu verlangen. Auf `false` nur, wenn alle Clients SSE können. |
| `MCP_DNS_REBINDING_PROTECTION` | `true` | Prüft `Host` und `Origin` der Anfragen. Anlassen. Wird der Server unter einem weiteren Namen erreicht, gehört dieser in `MCP_ALLOWED_HOSTS`, statt den Schutz abzuschalten. |
| `MCP_ALLOWED_HOSTS` | leer | Zusätzliche erlaubte Hostnamen, kommagetrennt. `127.0.0.1`, `localhost` und der Host aus `PUBLIC_BASE_URL` sind immer erlaubt. |
| `MCP_ALLOWED_ORIGINS` | leer | Zusätzliche erlaubte Origins, kommagetrennt. |
| `CORS_ALLOW_ORIGINS` | `*` | Welche Websites den Server aus dem Browser aufrufen dürfen. Für einen öffentlichen Dienst ist `*` richtig, für einen internen eine konkrete Liste. |

### Protokoll und Statistik

| Variable | Default | Was sie bewirkt |
|---|---|---|
| `LOG_LEVEL` | `INFO` | `DEBUG` zeigt jede Elasticsearch-Anfrage, nützlich zur Fehlersuche, laut im Betrieb. |
| `AFA_ACCESS_LOG` | `true` | Schaltet die Middleware ein, die jeden Aufruf einzeln protokolliert. Ohne sie bleibt die Statistikseite leer. |
| `AFA_ACCESS_LOG_ARGS_MAX` | `200` | Wie viele Zeichen der Aufrufargumente ins Log gelangen. **`0` heisst: keine Suchanfragen im Log.** Das ist der Schalter für den Datenschutz. |
| `AFA_ACCESS_LOG_FILE` | leer, also stdout | Eigene Logdatei. Ohne Angabe landet alles im Prozess-Log (bei Plesk im nohup-Logfile). |
| `AFA_STATS_CACHE` | `~/afa-mcp/stats-cache.json` | Pfad des JSON-Caches für die Vortage der Statistikseite. |
| `AFA_STATS_USER` | leer | Benutzername für Basic Auth auf `/statistik`. |
| `AFA_STATS_PASS` | leer | Passwort dazu. **Sind `AFA_STATS_USER` und `AFA_STATS_PASS` nicht beide gesetzt, ist `/statistik` ohne Anmeldung offen.** |

### Typische Aufgaben und die passende Einstellung

| Aufgabe | Einstellung |
|---|---|
| Keine Suchanfragen der Nutzenden speichern | `AFA_ACCESS_LOG_ARGS_MAX=0` (oder `AFA_ACCESS_LOG=false`, dann fällt auch die Statistik weg) |
| Statistikseite schützen | `AFA_STATS_USER` und `AFA_STATS_PASS` beide setzen |
| Gegen einen Test-Index arbeiten | `AFA_ES_URL` umbiegen, bei selbstsigniertem Zertifikat zusätzlich `AFA_VERIFY_SSL=false` |
| Fehler suchen | `LOG_LEVEL=DEBUG`, danach wieder auf `INFO` |
| Eigene Domain betreiben | `PUBLIC_BASE_URL` setzen, Zusatznamen in `MCP_ALLOWED_HOSTS` |
| Server lokal in einem CLI-Client nutzen | `python -m afa_mcp --transport stdio`, keine weiteren Variablen nötig |
| Timeouts bei grossen Seiten | `HTTP_TIMEOUT` erhöhen oder im Prompt `size` senken |

## Lokal entwickeln

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"

# Streamable HTTP, Default auf 127.0.0.1:8766/mcp
python -m afa_mcp

# Stdio (für lokale CLI-Clients)
python -m afa_mcp --transport stdio

# Tests
pytest -q

# Live-Smoke-Test
python scripts/smoke_test.py
```

### Access-Log-Format

Jede MCP-Methode erzeugt eine Zeile im Logger `afa_mcp.access`:

```
2026-06-10 14:30:01,234 INFO afa_mcp.access — method=tools/call tool=search id=42 status=200 size=8543 ms=145 client=160.79.106.37 args={"query":"Bäuerin Emmental","size":3}
```

Auswertung typisch via `awk` und `grep`, etwa:

```bash
# Top-10 Tools nach Häufigkeit
grep 'afa_mcp.access' ~/afa-mcp/server.log \
  | grep -oE 'tool=[a-z_]+' | sort | uniq -c | sort -rn | head

# Latenz-Quantile pro Tool
grep 'method=tools/call' ~/afa-mcp/server.log \
  | awk -F'tool=' '{print $2}' | awk '{print $1, $NF}' \
  | sort | awk '{a[$1]++; s[$1]+=$2} END {for (t in a) printf "%-30s n=%4d avg=%dms\n", t, a[t], s[t]/a[t]}'
```

## Produktion (Debian)

```bash
sudo bash deploy/install.sh
sudo certbot --nginx -d mcp.histoirerurale.ch
sudo install -m 644 /opt/afa-mcp/deploy/nginx.conf \
    /etc/nginx/sites-available/mcp.histoirerurale.ch
sudo nginx -t && sudo systemctl reload nginx
```

Das Skript installiert:

- Systemnutzer `afa` und `/opt/afa-mcp`-Verzeichnis
- Python-venv mit den Abhängigkeiten
- systemd-Unit `afa-mcp.service` (gehärtet, Stateless-HTTP)
- nginx-vHost mit OAuth-, MCP- und Agent-Discovery, Pfad-Redirects, llms.txt

### Deploy-Skript für Updates

```bash
sudo tee /usr/local/sbin/deploy-afa-mcp > /dev/null <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
sudo -u afa git -C /opt/afa-mcp pull --ff-only
install -m 644 /opt/afa-mcp/deploy/nginx.conf \
    /etc/nginx/sites-available/mcp.histoirerurale.ch
nginx -t && systemctl reload nginx
systemctl restart afa-mcp
systemctl status --no-pager afa-mcp | head -5
EOF
sudo chmod +x /usr/local/sbin/deploy-afa-mcp
```

Aufruf: `sudo deploy-afa-mcp`.

## Produktion (Plesk, ohne root)

Falls, wie bei der aktuellen Installation auf `mcp.histoirerurale.ch`,
kein root und kein systemd zur Verfügung steht, läuft der Server im
Userspace, gestartet von einer Plesk Scheduled Task (Cron, jede Minute):

```bash
# einmalig:
mkdir -p ~/afa-mcp && cd ~/afa-mcp
git clone https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server.git .
virtualenv .venv
.venv/bin/pip install -e .
install -m 755 deploy/plesk/start.sh ~/afa-mcp/start.sh
```

Plesk, Domain, Scheduled Tasks, neuer Task `~/afa-mcp/start.sh`,
jede Minute. Skript-Verhalten:

- Existiert ein laufender PID, endet das Skript ohne Wirkung.
- Sonst: Umgebungsvariablen setzen, `python -m afa_mcp` im venv via `nohup` starten,
  PID in `~/afa-mcp/afa-mcp.pid` ablegen.

Apache mod_proxy davorhängen via `mcp.histoirerurale.ch/httpdocs/.htaccess`
(siehe Apache-Doku des Repos), Plesk liefert TLS und das vHost-Routing.

Updates: `git -C ~/afa-mcp pull --ff-only`, anschliessend einmal die alte
Instanz killen, der Cron startet die neue beim nächsten Tick.

### Statistik-Seite (`/statistik`, Live-Generierung)

Der MCP-Server liefert unter `/statistik` selbst eine Nutzungsstatistik aus,
**live bei jedem Aufruf** generiert. Vortage werden in einem JSON-Cache
(`~/afa-mcp/stats-cache.json`) fixiert, damit nur der aktuelle Tag aus dem
Log neu aggregiert werden muss. Kein Cron-Job notwendig.

Basic Auth über Umgebungsvariablen (in `start.sh`):

```bash
export AFA_STATS_USER=admin
export AFA_STATS_PASS=DEIN_PASSWORT
```

Sind beide leer, ist `/statistik` ungeschützt zugänglich (Dev-Modus).

Apache-Setup: `mcp.histoirerurale.ch/httpdocs/.htaccess` braucht eine
mod_proxy-Regel für `/statistik` (Vorlage in
`deploy/plesk/mcp-htaccess.example`):

```apache
RewriteRule ^statistik$       http://127.0.0.1:8766/statistik       [P,L]
RewriteRule ^statistik/(.*)$  http://127.0.0.1:8766/statistik/$1    [P,L]
```

Der Authorization-Header wird per mod_proxy unverändert durchgereicht, die
Auth-Prüfung passiert im Python-Server (`hmac.compare_digest` gegen die
Umgebungsvariablen). Die Seite zeigt:

* heute, Tool-Aufrufe und Sessions (live aus dem Log)
* letzte 7 Tage und gesamt (Vortage aus Cache)
* Tagesübersicht mit Stunden-Sparkline pro Tag
* Top-Tools, KI-Clients (aus `clientInfo.name`)
* 24-Stunden-Aktivitätsgrafik
* Methoden-Verteilung (technischer Overhead)

Inhalte sind reine Aggregate. Solange `AFA_ACCESS_LOG_ARGS_MAX=0` gesetzt
ist, gelangen keine Nutzer-Suchanfragen ins Log oder die Statistik.

Fallback und Offline-Rendering: `deploy/plesk/statistik/generate_stats.py`
schreibt dieselbe Seite einmalig als statische Datei, nützlich zum
Initialisieren älterer Caches oder für Tests ohne laufenden Server.

## Discovery-Endpunkte (für MCP-Verzeichnisse)

| Pfad | Inhalt |
|---|---|
| `/.well-known/mcp.json` | MCP-Server-Manifest |
| `/.well-known/agent-card.json` | A2A Agent Card |
| `/.well-known/oauth-protected-resource` | RFC 9728 (signalisiert: keine Auth) |
| `/llms.txt` | LLM- und Crawler-freundliche Site-Beschreibung |

## Architektur

`src/afa_mcp/search.py` enthält den Elasticsearch-Client und Pydantic-basiertes
Antwort-Parsing. `src/afa_mcp/server.py` definiert die FastMCP-Tools, die
spezialisierten Such-Wrapper (Editionen, Entitäten, Audio-Visuell) und die
ASGI-App mit OAuth- und Discovery-Routen. `src/afa_mcp/hierarchy.py` zentralisiert
die Hierarchie-IDs, damit Tool-Code und Tests nicht mit Magic-Strings arbeiten
müssen.

### Landing-Page (`deploy/`)

Statische Seite unter <https://mcp.histoirerurale.ch>, ohne Build-Schritt:

```
deploy/index.html              nur Markup
deploy/assets/css/style.css    Design-System der Hauptseite histoirerurale.ch/afa
deploy/assets/js/i18n.js       Übersetzungen (de, fr, it, en)
deploy/assets/js/app.js        Sprachwahl und Textersetzung
deploy/assets/img/logo-afa.png Logo der Hauptseite
deploy/assets/fonts/           Merriweather (Überschriften)
```

Farben, Schriften und Komponenten übernehmen das Joomla-Template der Hauptseite
(Cassiopeia plus `user.css`): Rot `#a00000`, Hover `#870000`, Fliesstext
Helvetica Neue 15px, Überschriften Merriweather in Rot, Container 1170px.

nginx liefert `/assets/` direkt aus (Location in `deploy/nginx.conf` und
`deploy/nginx-http.conf`), unter Plesk liegen die Dateien in `httpdocs` und
werden ohne Zusatzregel ausgeliefert.

## Quellen

- Website: <https://histoirerurale.ch>
- Recherche-Frontend: <https://www.recherche2.histoirerurale.ch>
- Schwesterprojekt: <https://github.com/entscheidsuche/entscheidsuche-mcp>

## Lizenz

MIT
