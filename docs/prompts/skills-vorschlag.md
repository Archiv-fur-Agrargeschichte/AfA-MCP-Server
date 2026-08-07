# Skills für reproduzierbare AfA-Use-Cases

Prompts allein reichen nicht. Ein Prompt ist eine Bitte, ein Skill-Skript ist eine Garantie.
Die Belege dafür stehen in den Use Cases selbst:

- **4.1 GEDCOM:** Modell schrieb ungültiges Line-Wrapping, merkte es, schrieb neu. Zweimal Glück ist keine Methode. Ein Writer-Skript kann das gar nicht falsch machen.
- **4.2 Landräte:** Lauf brach am Tool-Limit ab, 43 von 46 erfasst, Fortsetzung nur per Rückfrage. Ohne Checkpoint-Datei ist der Neustart ein neuer Lauf mit neuem Ergebnis.
- **4.3 Lückenanalyse:** Der Text sagt es selbst: «Ein Assistent würde die Aufrufe leicht variieren und das Ergebnis wäre nicht vergleichbar.» Also gehört die Schleife ins Skript.
- **4.7 Netzwerk:** «Im Wiederholungstest nannte nur eine von drei Antworten die nationale Verbandspräsidentschaft, obwohl sie im Eintrag steht.»

Leitsatz: **Alles, was deterministisch sein kann, wird Code. Das Modell darf suchen, lesen und entscheiden, was gesucht wird, aber nicht zählen, formatieren, paginieren oder auswählen.**

Zweiter Leitsatz, aus `00-reproduzierbarkeit-ueber-chats.md`: **Das Ziel ist Gleichheit über Chats,
Clients und Tage hinweg, nicht innerhalb einer Sitzung.** Deshalb liefert jeder Skill nicht nur eine
Anleitung, sondern versionierte Rezepte in `rezepte/*.yaml` plus ein Skript, das den Fingerprint
berechnet und vergleicht. Ein Manifest dokumentiert einen Lauf; ein Fingerprint vergleicht zwei,
und zwar über Sitzungsgrenzen hinweg.

---

## S0: `afa-core` (Basis, von allen anderen genutzt)

Kein eigener Use Case, sondern die gemeinsame Schicht. Ohne sie sind alle anderen Skills wieder modellabhängig.

**`scripts/afa_call.py`**: einziger Zugang zum Server. Das Modell ruft nie direkt ein MCP-Tool auf.

- `search_all(query, hierarchy, ...)`: paginiert intern bis `next_cursor=null`, erzwingt `sort=id`, `size=100`. Pagination kann so nicht vergessen werden.
- Jeder Aufruf wird nach `run/manifest.jsonl` geschrieben: Zeitstempel, Tool, Argumente wörtlich, `total`, Seitenzahl, Ergebnis-IDs, Hash der Antwort.
- `--replay run/manifest.jsonl` führt einen alten Lauf identisch erneut aus und diffed. Reproduzierbarkeit wird damit messbar statt behauptet.
- Response-Cache je `id`, damit `fetch_document` nicht doppelt läuft und Tool-Budget spart (siehe 4.2).

**`scripts/fetch_ids.py`**: nimmt eine ID-Liste, ruft `fetch_document` für **jede** ab, schreibt `run/docs.jsonl`, überspringt bereits Vorhandene. Idempotent, damit ein Abbruch am Tool-Limit folgenlos bleibt.

**`scripts/rezept.py`**: der Cross-Chat-Kern.

- `rezept.py run <rezept.yaml>`: führt die Aufrufe **aus der Datei** aus, nicht aus dem Gespräch.
  Damit hängt das Ergebnis nicht daran, wie gut das Modell in dieser Sitzung zugehört hat.
- `rezept.py fingerprint <rezept.yaml>`: berechnet `ids_sha256`, Zeilenzahl, Totals, Abrufdatum.
- `rezept.py verify <rezept.yaml>`: vergleicht mit dem gespeicherten Fingerprint und setzt den
  Status (`reproduziert` | `bestand_geaendert` | `server_geaendert` | `abweichung_unerklaert`).
  Exit-Code ≠ 0 nur beim letzten Fall.
- `rezept.py lint <rezept.yaml>`: schlägt Alarm bei fehlenden explizit gesetzten Parametern
  (`sort`, `size`, `language`). Ein Rezept, das auf Server-Defaults baut, ist über Versionen
  hinweg nicht reproduzierbar.

**In `SKILL.md`:** Belegpflicht, `nicht im Bestand` statt Vorwissen, Snippet ≠ Volltext, Widersprüche
nicht auflösen. Entspricht `01-deterministische-recherche.md`. Dazu: Ergebnisse, die jemand
wiederverwenden soll, werden als Rezept abgelegt, nicht als Chatantwort.

---

## S1: `afa-gedcom` (UC 4.1)

| Teil | Wer macht es | Warum |
|---|---|---|
| Personensuche, ID bestätigen | Modell | Namensauflösung braucht Urteil |
| Verwandtschafts-Traversierung | Skript | BFS über `verwandtschaft`-IDs, Zyklusschutz, `--max-generations`, Abbruch protokolliert. Modell entscheidet sonst jedes Mal anders, wann es genug ist |
| GEDCOM schreiben | Skript | `CONT`/`CONC`, Datumsformat `DD MMM YYYY`, `REFN` = AfA-Nummer, `NOTE` = `document_url`. Der Fehler aus 4.1 wird unmöglich |
| Validierung | Skript | `--validate` prüft Tag-Grammatik, `TRLR`, Zeilenlänge. Exit-Code ≠ 0 = kein Ergebnis |

Harte Regeln im Skill:
- Personen ohne eigenen Datensatz (Ehefrauen in 4.1) kommen als `INDI` **ohne** `REFN`, mit `NOTE: nur im Eintrag <id> genannt, kein eigener Datensatz`. Nie stillschweigend weglassen, nie mit fremder ID versehen.
- Nicht namentlich erfasste Kinder (4 der 5 in 4.1) erzeugen eine Pflichtzeile im Bericht: `unvollständig: <id> nennt 5 Kinder, 1 im Bestand`. Aus einer Fussnote wird eine Prüfsumme.
- Namensgleichheit ist keine Verwandtschaft (4.7). Traversiert wird nur über explizite Verweise, nie über Namensähnlichkeit.

---

## S2: `afa-tabelle` (UC 4.2)

Der Use Case, der am Tool-Limit zerbrach. Fix ist Buchhaltung, nicht Prompting.

**Zwei Phasen, getrennt:**
1. **Kandidaten sammeln** → `run/candidates.jsonl`, Status je ID: `offen` | `geholt` | `nicht_gefunden`.
2. **Details holen** → `fetch_ids.py`, läuft nur über `offen`. Abbruch jederzeit, Fortsetzung deckungsgleich, weil die Restmenge in der Datei steht und nicht im Chatverlauf.

**`scripts/to_xlsx.py`**: Spaltenschema als Argument, Zeilen sortiert nach Schlüsselspalte, leere Zellen bleiben leer (nie geschätzt), Blatt 2 = Lauf-Manifest. Kein Modell formatiert Tabellen.

**`scripts/coverage.py`**: vergleicht `total` laut Server mit Zeilenzahl und meldet die Differenz als Fehler. In 4.2 wäre «43 statt 46» sofort sichtbar gewesen, statt erst beim Nachzählen.

Zusatz: Suchstrategie für Kriterien wie «Nidwaldner Landräte» wird als Query-Liste in der Skill-Datei festgeschrieben (Amtsbezeichnung, Varianten, Kanton), nicht bei jedem Lauf neu erfunden.

---

## S3: `afa-luecken` (UC 4.3)

Direkt aus dem UC ableitbar, der die Skript-Forderung schon selbst stellt.

- `terms/*.tsv`: versionierte Begriffslisten je Themenfeld, mit Sprachspalte und Typ (Fachbegriff | Alltagswort | Organisation | Politik). Die Liste ist das Instrument; ein Modell, das Begriffe erfindet, misst jedes Mal etwas anderes.
- `scripts/matrix.py`: `list_hierarchy` je Begriff **plus `*` als Nullmessung**, Ausgabe als TSV-Matrix Begriff × Sammlung, dazu `run/matrix-<datum>.tsv`.
- `scripts/flags.py`: regelbasierte Markierung: Sammlungslücke (auch bei `*` fast leer), Sprachlücke (Paar-Abweichung > Faktor 5), Erschliessungslücke (stark in A, null in verwandter B). Regeln in der Skill-Datei, nicht im Modellkopf.
- `scripts/trend.py`: diffed zwei Matrizen verschiedener Daten. Damit wird die Wiederholung in einem halben Jahr zum Feature statt zur Fehlerquelle.

Das Modell kommt erst nach den Flags dazu: Stichproben prüfen, Befund formulieren. Die Zahlen hat es nicht angefasst.

---

## S4: `afa-mehrsprachig` (UC 4.6)

- `pairs/*.tsv`: Begriffstripel de/fr/it, gepflegt, nicht übersetzt-on-the-fly. «tracteur» vs. «Traktor» ist eine Messung, keine Übersetzung.
- `scripts/lang_compare.py`: führt je Tripel dieselbe Suche in drei Sprachen aus und gibt die Verteilung über Sammlungen nebeneinander aus, plus Abweichungsfaktor.
- Skill-Regel, wörtlich aus 4.6: Der `language`-Parameter filtert nicht, er steuert nur die Ausgabesprache. Abdeckung kommt über Begriffe. Genau der Irrtum, den ein Modell ohne diesen Satz zuverlässig macht.
- Pflichtausgabe: die verwendete Begriffsliste. Ohne sie ist der Befund nicht interpretierbar.

---

## S5: `afa-netzwerk` (UC 4.7)

- `scripts/traverse.py`: beidseitige Traversierung Person ↔ Institution über explizite Verweis-IDs, `--depth`, Zyklusschutz, Besuchsprotokoll. Jeder erreichte Knoten wird abgerufen, keiner wegen Unwichtigkeit übersprungen, das ist die 1-von-3-Auslassung an der Wurzel.
- `scripts/aemter.py`: extrahiert Funktionsindizes zu `id | person | institution | amt | von | bis | quelle_id` und gibt eine sortierte Kette aus. Ein Skript lässt keine Verbandspräsidentschaft weg.
- `scripts/overlap.py`: findet zeitlich überlappende Mandate. Genau die Frage, die keine Suchmaske stellt, und die ein Modell im Fliesstext jedes Mal anders beantwortet.
- Harte Regel: Namensgleichheit erzeugt nie eine Kante (79 Ineichen, 4.7). Nur explizite Verweise.

---

## S6: `afa-av-liste` (UC 4.5)

- Vorabprüfung per `list_hierarchy` ist Pflichtschritt im Skript, nicht Ermessen. Bei 0 Foto- und 0 Filmtreffern Abbruch mit Befund: erspart die vergebliche Suche («Milchgenossenschaft»: 40 Personen, 0 AV).
- `scripts/keywords.py`: erntet Schlagworte aus den `meta`-Feldern der ersten Runde und erweitert die Suche **nur** um Schlagworte mit Häufigkeit ≥ 2. Das ersetzt das «Varianten probieren», das jeden Lauf anders ausgehen lässt, durch eine Regel.
- `scripts/to_csv.py`: feste Spalten: id, Typ, Jahr, Dauer, Auftraggeber, Dossiernummer, URL. Rechte nie behaupten.

---

## S7: `afa-repro-test` (Querschnitt)

Der Skill, der die anderen prüft. Ohne ihn ist «reproduzierbar» eine Behauptung.

- `scripts/run_n.py --n 5 --fresh-session`: fünf **getrennte** Sitzungen gegen dasselbe Rezept,
  jede ohne Kenntnis der anderen. Fünfmal im selben Chat zu fragen misst nichts.
- `scripts/cross_client.py`: dasselbe Rezept gegen mehrere Clients bzw. Modelle, Ergebnisse
  nebeneinander. Deckt die Abweichung auf, die Nutzende real erleben: Kollegin nutzt ChatGPT,
  man selbst Claude.
- Regression über die Zeit: `verify` aller Rezepte im Repo, geplant monatlich. Trennt sauber
  «Bestand hat sich geändert» von «unser Rezept ist mangelhaft». Nur Zweites ist ein Bug.
- Ausgabe: **Feldstabilität in Prozent**. Der Befund aus 4.4 («Funktion erschien in einem Drittel der Antworten») wäre damit eine Zahl im Report statt eine Anekdote.
- Trennt die Ursachen: `bestandsaenderung` (Server-`total` verändert) | `modellauswahl` (identische Tool-Antworten, verschiedener Text) | `query-abweichung`. Nur der mittlere Fall verlangt eine Prompt- oder Skript-Änderung.
- Als Regressionstest über alle Skills laufen lassen, wenn `instructions` oder ein Prompt geändert wird.

---

## Reihenfolge

| Rang | Skill | Begründung |
|---|---|---|
| 1 | `afa-core` | Ohne Manifest und Pagination-Wrapper bringt jeder weitere Skill nichts |
| 2 | `afa-tabelle` | Häufigster Fall, und der dokumentierte Abbruch ist real |
| 3 | `afa-luecken` | Höchster Determinismus-Gewinn, Modell fast nicht beteiligt |
| 4 | `afa-repro-test` | Macht ab hier jede Aussage über Reproduzierbarkeit prüfbar |
| 5 | `afa-netzwerk`, `afa-gedcom` | Aufwendiger, aber die Traversierungslogik ist zwischen beiden teilbar |
| 6 | `afa-mehrsprachig`, `afa-av-liste` | Dünne Schicht über `afa-core` |

## Offene Fragen

- Skills als Claude-Code-Skills (lokal, `~/.claude/skills/`) oder als MCP-Prompts-Primitive serverseitig (aktuell `"prompts": False`)? Serverseitig erreicht alle Clients, kann aber keine Skripte ausführen. Wahrscheinlich beides: Prompts vom Server, Skripte lokal.
- Wo leben die Rezepte, damit sie zwischen Personen zirkulieren? Git-Repo beim AfA, oder eine
  Rezept-Sammlung, die der Server selbst als Resource ausliefert? Letzteres wäre der stärkste
  Cross-Chat-Hebel: kein Kopieren, keine Versionsdrift.
- Soll `search`/`search_entities` ein `retrieved_at` und eine Index-Revision zurückgeben? Ohne das
  ist «Bestand geändert» vs. «Lauf abweichend» nur über gespeicherte Totals unterscheidbar.
- Python-Skripte gegen den MCP-Endpunkt oder direkt gegen die HTTP-API? MCP hält Tool-Semantik und Doku identisch, HTTP wäre schneller.
- Wo liegen `run/`-Manifeste: pro Projekt, oder ein gemeinsames Archiv, damit `trend.py` über Monate diffen kann?
- Sollen Begriffslisten (`terms/`, `pairs/`) im AfA-Repo versioniert werden? Sonst ist die Messung nicht zitierfähig.
