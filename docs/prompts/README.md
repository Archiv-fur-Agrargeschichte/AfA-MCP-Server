# Reproduzierbarkeits-Prompts für den AfA-MCP-Server

Ziel: **Eine andere Person, an einem anderen Tag, in einem anderen Chat, mit einem anderen Client
bekommt denselben Datensatz.** Nicht: der Assistent bleibt sich in einer Sitzung treu.

Lies zuerst `00-reproduzierbarkeit-ueber-chats.md`. Es definiert die Einheit, die weitergegeben
wird, das versionierte Recherche-Rezept mit Fingerprint. Der Chatverlauf trägt keine Information,
die für die Wiederholung nötig ist.

Das dokumentierte Hauptproblem (siehe `afa-anwendungsfaelle.md`, UC-1) ist nicht Halluzination, sondern
**Varianz durch Auslassung**: in neun Wiederholungen derselben Frage waren alle Angaben
korrekt, aber die wichtigste Funktion einer Person erschien nur in einem Drittel der Antworten.

## Wodurch Varianz entsteht

| Quelle | Wirkung | Gegenmittel im Prompt |
|---|---|---|
| `sort=relevance` | Reihenfolge kann sich mit Index-Änderungen verschieben | `sort=id` erzwingen |
| Abbruch nach Seite 1 | Zufällige Teilmenge des Treffersets | Pagination bis `next_cursor=null` |
| Freie Query-Formulierung des Modells | Andere Query = anderes Ergebnis | Query-Liste vorgeben oder protokollieren |
| Antwort aus dem Highlight-Snippet | Snippet ist gekürzt und variabel | `fetch_document` je Kandidat verpflichtend |
| Freie Prosa-Antwort | Modell wählt jedes Mal andere Fakten aus | Feste Ausgabe-Tabelle mit Pflichtspalten |
| Sprachgedächtnis des Modells | Nicht belegte Angaben | Explizites Verbot + `nicht im Bestand` |
| Anderer Client / anderes Modell | Andere Auswahl, andere Tool-Nutzung | Alle Regeln im Rezept, nichts dem Client überlassen |
| Anderer Tag, geänderter Bestand | Andere Trefferzahl | Fingerprint mit Abrufdatum, Status `bestand_geaendert` |
| Server-Defaults ändern sich | Stille Verhaltensänderung | Jeden Parameter explizit setzen, `server_info.version` prüfen |
| Prompt beim Kopieren verändert | Anderer Lauf unter gleichem Namen | `rezept_version` + Hash |

## Die Prompts

| Datei | Zweck | Reproduzierbarkeit |
|---|---|---|
| `UEBERSICHT.md` | Was hängt wie zusammen: die vier Ebenen in Kurzform | Einstieg |
| `00-reproduzierbarkeit-ueber-chats.md` | Leitdokument: Rezept-Format, Fingerprint, Attestierung | Grundlage aller anderen |
| `01-deterministische-recherche.md` | Standardfall: Frage → belegte Antwort | hoch |
| `02-vollstaendige-enumeration.md` | Alle Treffer eines Bestands, keine Auswahl | maximal |
| `03-entity-dossier.md` | Fixes Personen-/Institutionen-Dossier | maximal |
| `04-av-quellenliste.md` | Foto-/Filmliste für Publikation | hoch |
| `05-widerspruchspruefung.md` | Zwei Einträge zum selben Sachverhalt vergleichen | hoch |
| `06-selbstpruefung-diff.md` | Lauf gegen Vorlauf diffen | Meta-Prompt |
| `99-server-instructions.md` | Wortlaut des Systemprompts im Server, umgesetzt | wirkt auf alle Clients |

Zu jeder Antwort gehört ein **Lauf-Manifest** (siehe `01`), sonst ist die Reproduktion nicht prüfbar.
Zu jedem wiederverwendbaren Ergebnis gehört zusätzlich ein **Rezept mit Fingerprint** (siehe `00`),
sonst ist die Reproduktion nur innerhalb der eigenen Sitzung möglich.
