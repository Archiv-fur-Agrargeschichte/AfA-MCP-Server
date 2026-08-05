# 00: Reproduzierbarkeit über verschiedene Chats

Leitdokument. Alle anderen Dateien in diesem Ordner sind Ausführungen davon.

## Der Unterschied

**Innerhalb eines Chats** reproduzierbar heisst: der Assistent bleibt sich in dieser Sitzung treu.
Wertlos, sobald die Sitzung endet, und wissenschaftlich uninteressant, weil niemand den Chatverlauf
einer anderen Person nachvollziehen kann.

**Über Chats hinweg** reproduzierbar heisst: eine andere Person, an einem anderen Tag, mit einem
anderen Client und einem anderen Modell führt dieselbe Recherche aus und bekommt denselben
Datensatz. Nur das ist zitierfähig.

Konsequenz: **Der Chatverlauf darf keine Information tragen, die für die Wiederholung nötig ist.**
Alles Nötige steht in einer Datei, die man weitergibt. Der Chat ist Ausführungsumgebung, nicht Träger.

## Was zwischen zwei Chats verschieden ist

| Unterschied | Wirkung | Gegenmittel |
|---|---|---|
| Anderer Client (Claude, ChatGPT, Cursor, Perplexity) | Andere System-Prompts, anderes Tool-Calling-Verhalten | Rezept enthält alle Regeln explizit; keine Regel dem Client überlassen |
| Anderes Modell / andere Modellversion | Andere Auswahl, andere Formulierung | Auswahl aus dem Modell herausnehmen (Enumeration, feste Felder, Skripte) |
| Anderer Tag | Bestand hat sich geändert | Abrufdatum und Trefferzahlen im Rezept festhalten; Abweichung als Bestandsänderung ausweisen, nicht glätten |
| Andere Server-Version | Defaults können sich ändern | Jeden Parameter explizit setzen, nie auf Default verlassen. `server_info.version` mitprotokollieren |
| Andere Sprache in der Bedienung | `language` beeinflusst Titel und Snippet | `language` immer explizit angeben |
| Prompt beim Kopieren verändert | Anderer Lauf unter gleichem Namen | Rezept versionieren und hashen |

## Die Einheit: das Recherche-Rezept

Eine Datei, selbsttragend, versioniert, weitergebbar. Ohne Bezug auf «wie besprochen» oder «wie oben».

```yaml
rezept_id: nidwaldner-landraete
rezept_version: 3
erstellt: 2026-07-30
frage: >
  Alle im AfA-Portal Personen und Institutionen aufgeführten
  Nidwaldner Landräte mit Lebensdaten und Amtsjahren.

server:
  endpunkt: https://mcp.histoirerurale.ch/mcp
  version_beim_erstellen: 0.4.1        # abweichende Version => Warnung im Report

# Vollständig, wörtlich, in dieser Reihenfolge. Keine Ergänzung, keine Umformulierung,
# keine Synonyme. Wer eine bessere Query kennt, erhöht rezept_version.
aufrufe:
  - tool: search_entities
    query: "Landrat AND Nidwalden"
    entity_type: person
    language: de
    sort: id
    size: 100
    paginieren_bis_ende: true
  - tool: search_entities
    query: "Landratspräsident AND Nidwalden"
    entity_type: person
    language: de
    sort: id
    size: 100
    paginieren_bis_ende: true

detailabruf:
  tool: fetch_document
  fuer: alle_treffer_ids          # nicht: die relevanten
  language: de

ausgabe:
  format: tabelle
  sortierung: [nachname, vorname, afa_nummer]
  spalten: [nachname, vorname, geburtsdatum, sterbedatum, afa_nummer, amtsjahre]
  leerwert: ""                    # nie schätzen, nie "unbekannt" erfinden

regeln:
  - Nur Angaben aus Tool-Responses dieses Laufs.
  - Nicht aus dem Highlight-Snippet antworten, nur aus fetch_document.
  - Widersprüche mit beiden IDs aufführen, nicht auflösen.
  - Fehlende Angabe = Leerwert, nicht Vorwissen.

# Beim ersten vollständigen Lauf eingetragen. Danach das Vergleichsobjekt.
fingerprint:
  abrufdatum: 2026-07-30
  total_je_aufruf: [46, 12]
  ids_anzahl: 46
  ids_sha256: 9f1c…                 # sha256 der sortierten, newline-getrennten ID-Liste
  zeilen: 46
```

## Wie ein anderer Chat das reproduziert

1. Rezept-Datei in den neuen Chat geben. Nichts sonst. Keine Vorgeschichte, keine Nacharbeit.
2. Assistent führt `aufrufe` **wörtlich** aus, dann `detailabruf` für alle IDs.
3. Assistent baut die Ausgabe nach `ausgabe`.
4. Assistent vergleicht mit `fingerprint` und gibt einen Attestierungsblock aus:

```
rezept: nidwaldner-landraete v3
server_version: 0.4.1  (=erwartet)
abrufdatum: 2026-08-14
ids_sha256: 9f1c…      (=erwartet)
zeilen: 46             (=erwartet)
status: reproduziert
```

Bei Abweichung ist der Status verpflichtend einer von:

| Status | Bedeutung | Massnahme |
|---|---|---|
| `reproduziert` | ID-Hash und Zeilenzahl identisch | keine |
| `bestand_geaendert` | `total` serverseitig anders | Neuen Fingerprint mit Datum ergänzen, alten behalten |
| `server_geaendert` | `server_info.version` abweichend | Defaults prüfen, Rezept ggf. anpassen |
| `abweichung_unerklaert` | gleiche Aufrufe, andere IDs oder Zeilen | Rezept ist mangelhaft: `rezept_version` erhöhen und Regel verschärfen |

`abweichung_unerklaert` ist der einzige Fall, der eine Rezeptänderung verlangt. Die anderen sind
dokumentierte Weltveränderung, kein Fehler.

## Zwei Ausgaben, klar getrennt

| Teil | reproduzierbar | zitierfähig |
|---|---|---|
| Datensatz (Tabelle, GEDCOM, Matrix, ID-Liste) + Fingerprint | ja | ja |
| Interpretation, Prosa, Einordnung des Modells | nein | nein |

Das gehört ausdrücklich in jedes Rezept-Ergebnis. Wird die Prosa mitzitiert, ist das Ergebnis nicht
mehr reproduzierbar, egal wie streng der Rest war.

## Warum das Rezept in eine Datei muss und nicht in den Prompt

Ein Prompt im Chat existiert einmal. Eine Rezept-Datei hat eine Version, einen Hash, einen Ort und
eine Geschichte. Man kann sie neben die Publikation legen. Genau das ist der Anspruch aus 4.4:
zitierfähig ist das Bündel, nicht der Chatverlauf, und ein Bündel ohne Datei ist keins.

## Drei Verteilwege, aufsteigend nach Reichweite

1. **Rezept-Datei weitergeben.** Funktioniert in jedem Client, sofort, ohne Infrastruktur. Risiko:
   wird beim Kopieren verändert, deshalb `rezept_version` und Hash.
2. **Rezepte im Repo, Skill lädt sie.** `~/.claude/skills/afa-*/rezepte/*.yaml`. Ein Ort, echte
   Versionsgeschichte, Skripte können den Fingerprint selbst berechnen. Nur für Clients mit
   Skill-Unterstützung.
3. **Server liefert die Rezepte.** MCP-Prompts-Primitive, heute `"prompts": False` in
   `_server_card_payload`. Jeder MCP-Client bekommt denselben Text, ohne dass jemand etwas kopiert.
   Stärkster Hebel für Reproduzierbarkeit über Chats, und über Clients. Kein Skriptzugriff,
   also Kombination mit Weg 2.

## Was das für die Skills heisst

Siehe `skills-vorschlag.md`. Die Rollenverteilung ändert sich mit diesem Blick:

- Skripte erzeugen und prüfen **Fingerprints**: nicht bloss Lauf-Manifeste. Ein Manifest
  dokumentiert einen Lauf, ein Fingerprint vergleicht zwei.
- `afa-repro-test` läuft nicht n-mal im selben Chat, sondern gegen ein Rezept: n frische Sitzungen,
  Vergleich gegen den gespeicherten Fingerprint. Innerhalb einer Sitzung mehrmals zu fragen misst
  nur die Trägheit des Kontextfensters.
- Jeder Use-Case-Skill bringt seine Rezepte mit, nicht bloss eine Anleitung.
