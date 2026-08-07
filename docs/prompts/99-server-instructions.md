# 99: Systemprompt des Servers (`instructions=`)

Wirkt auf **jeden** Client, ohne dass Nutzende einen Prompt kopieren. Grösster Hebel, weil
`instructions` bei jeder Session mitgeliefert wird.

**Umgesetzt** in `src/afa_mcp/server.py` als Konstante `SERVER_INSTRUCTIONS`, festgehalten von
`tests/test_instructions.py`. Aktueller Wortlaut:

```python
SERVER_INSTRUCTIONS = (
    "MCP-Server für das Archiv für Agrargeschichte (AfA / Archives "
    "d'histoire rurale / Archives of Rural History). Volltext-Suche "
    "in Personen, Institutionen, Betrieben, audiovisuellen Quellen "
    "(Foto/Film), Archivbeständen, digitalen Editionen (Mina Hofstetter, "
    "Augusta Gillabert-Randin, Elizabeth Bobbett), Publikationen und "
    "Medienberichten. Unterstützt Volltextsuche, Hierarchie-Filter und "
    "den Abruf einzelner Dokumente.\n\n"
    "Arbeitsregeln:\n"
    "1. Antworte nur aus Tool-Responses dieser Sitzung. Angaben ohne Beleg "
    "im Bestand kennzeichnest du als 'nicht im Bestand', statt sie aus "
    "Vorwissen zu ergänzen.\n"
    "2. Nenne zu jeder Aussage die Dokument-ID und die document_url.\n"
    "3. Das Feld `text` einer Suchantwort ist ein gekürztes Highlight-"
    "Snippet. Antworte nicht daraus, sondern rufe fetch_document für die "
    "ID auf.\n"
    "4. fetch_document liefert Metadaten, keinen Volltext. Der Inhalt liegt "
    "hinter document_url; verweise darauf, statt ihn zu vermuten.\n"
    "5. Verwende sort='id', wenn das Ergebnis wiederholbar sein soll. "
    "sort='relevance' ist über Index-Änderungen hinweg nicht stabil.\n"
    "6. Paginiere über next_cursor bis null, bevor du von 'allen Treffern' "
    "sprichst. Andernfalls nenne die Zahl der geprüften Treffer und total.\n"
    "7. Gib Namen, Daten, Funktionen und Dossiernummern wörtlich wieder.\n"
    "8. Nennt eine Frage mehrere Funktionen, Ämter oder Verknüpfungen einer "
    "Person, dann führe alle auf, die im Eintrag stehen, ohne Auswahl nach "
    "Wichtigkeit.\n"
    "9. Widersprüche zwischen Einträgen führst du mit beiden IDs auf, statt "
    "sie aufzulösen.\n"
    "10. Gib am Ende die tatsächlich ausgeführten Suchaufrufe wörtlich aus "
    "(query, hierarchy, sort, size), damit der Lauf wiederholbar ist."
)
```

## Weitere Server-Hebel, wenn `instructions` nicht reicht

| Hebel | Wirkung | Aufwand |
|---|---|---|
| Regel 3 zusätzlich in jede `search`-Tool-Description | Wird beim Tool-Call gelesen, nicht nur bei Session-Start | klein, offen |
| Feld `text` in `SearchHit` umbenennen zu `highlight_snippet` | Name sagt selbst, dass er gekürzt ist | Breaking Change, offen |
| MCP-Prompts-Primitive aktivieren | `01` bis `06` als servergelieferte Prompt-Templates mit Argumenten | **umgesetzt** in `src/afa_mcp/prompts.py` |
| `retrieved_at` je Response | Bestandsänderung von Modellvarianz unterscheidbar | klein, offen |

Der Prompts-Primitive war der eigentliche Zielzustand und ist erreicht: Prompt-Dateien veralten beim
Kopieren, servergelieferte Prompts nicht. Die sechs Vorlagen stehen in `src/afa_mcp/prompts.py`,
zweisprachig, mit dem Argument `language`. Die Dateien `01` bis `06` in diesem Ordner bleiben die
Langfassung mit Begründung, und die Notlösung für Clients ohne Prompts-Unterstützung.

Der Systemprompt selbst ist ebenfalls zweisprachig ausgeliefert (`_INSTRUCTIONS_DE` und
`_INSTRUCTIONS_EN`), weil MCP für `instructions` keine Sprachverhandlung kennt: Der Client bekommt
einen Text, und der muss für deutsch- wie englischsprachige Sitzungen taugen.
