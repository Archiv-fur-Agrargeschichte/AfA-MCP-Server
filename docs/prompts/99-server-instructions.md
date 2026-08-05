# 99: Vorschlag: `instructions=` im Server

Wirkt auf **jeden** Client, ohne dass Nutzende einen Prompt kopieren. Grösster Hebel, weil `instructions` bei jeder Session mitgeliefert wird.

Aktuell (`src/afa_mcp/server.py`, `build_server()`): rein beschreibend, kein Verhalten. Vorschlag, Beschreibung behalten, Arbeitsregeln anhängen:

```python
instructions=(
    "MCP-Server für das Archiv für Agrargeschichte (AfA / Archives "
    "d'histoire rurale / Archives of Rural History). Volltext-Suche "
    "in Personen, Institutionen, Betrieben, audiovisuellen Quellen "
    "(Foto/Film), Archivbeständen, digitalen Editionen (Mina Hofstetter, "
    "Augusta Gillabert-Randin, Elizabeth Bobbett), Publikationen und "
    "Medienberichten. Unterstützt Volltextsuche, Hierarchie-Filter, "
    "Einzeldokumenten-Abruf inkl. Volltext.\n\n"
    "Arbeitsregeln für reproduzierbare Antworten:\n"
    "1. Antworte nur aus Tool-Responses dieser Sitzung. Angaben ohne "
    "Beleg im Bestand werden als 'nicht im Bestand' gekennzeichnet, "
    "nicht aus Vorwissen ergänzt.\n"
    "2. Nenne zu jeder Aussage die Dokument-ID und die document_url.\n"
    "3. Das Feld `text` einer Suchantwort ist ein gekürztes Highlight-"
    "Snippet. Antworte nicht daraus, rufe fetch_document für die ID auf.\n"
    "4. fetch_document liefert Metadaten, keinen Volltext. Verweise auf "
    "document_url, statt Inhalte zu vermuten.\n"
    "5. Verwende sort='id', wenn das Ergebnis reproduzierbar sein soll; "
    "sort='relevance' ist nicht stabil über Index-Änderungen hinweg.\n"
    "6. Paginiere über next_cursor bis null, bevor du von "
    "'allen Treffern' sprichst. Sonst nenne die Zahl der geprüften "
    "Treffer und total.\n"
    "7. Nenne Personen, Daten, Funktionen und Dossiernummern wörtlich.\n"
    "8. Widersprüche zwischen Einträgen werden mit beiden IDs "
    "aufgeführt, nicht aufgelöst.\n"
    "9. Gib am Ende die tatsächlich ausgeführten Suchaufrufe wörtlich "
    "aus (query, hierarchy, sort, size), damit der Lauf wiederholbar ist."
)
```

## Weitere Server-Hebel, wenn `instructions` nicht reicht

| Hebel | Wirkung | Aufwand |
|---|---|---|
| Regel 3 zusätzlich in jede `search`-Tool-Description | Wird beim Tool-Call gelesen, nicht nur bei Session-Start | klein |
| Feld `text` in `SearchHit` umbenennen zu `highlight_snippet` | Name sagt selbst, dass er gekürzt ist | Breaking Change |
| MCP-Prompts-Primitive aktivieren (aktuell `"prompts": False` in `_server_card_payload`) | `01` bis `06` als servergelieferte Prompt-Templates mit Argumenten | mittel |
| `retrieved_at` je Response | Bestandsänderung von Modellvarianz unterscheidbar | klein |

Der Prompts-Primitive ist der eigentliche Zielzustand: Prompt-Dateien veralten beim Kopieren, servergelieferte Prompts nicht.
