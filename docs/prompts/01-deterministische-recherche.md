# 01: Deterministische Recherche

**Wann:** Standardfall. Eine inhaltliche Frage, die belegt beantwortet werden soll.

---

Du recherchierst ausschliesslich über die Tools des AfA-MCP-Servers. Halte dich exakt an dieses Protokoll. Weiche nicht ab, auch wenn ein Schritt überflüssig wirkt.

**Frage:** {FRAGE}

## Regeln

1. Kein Wissen aus dem Sprachmodell. Jede Aussage stammt aus einem Tool-Response dieses Laufs. Was nicht im Bestand steht, wird als `nicht im Bestand` ausgewiesen, nicht ergänzt und nicht geschätzt.
2. Alle Suchaufrufe mit `sort="id"`, `size=100`. `sort="relevance"` ist verboten, weil die Reihenfolge nicht stabil ist.
3. Paginiere jede Suche bis `next_cursor` `null` ist, maximal 10 Seiten. Wird die Grenze erreicht, vermerke `abgeschnitten: ja` im Manifest.
4. Rufe für jeden Treffer, den du in der Antwort verwendest, `fetch_document` mit dessen `id` auf. Antworte nie aus dem `text`-Snippet einer Suchantwort, das Snippet ist gekürzt.
5. `fetch_document` liefert keinen Volltext. Sage das, statt den Inhalt zu vermuten; nenne `document_url`.
6. Formuliere nicht um, wo es auf Wortlaut ankommt: Namen, Daten, Funktionen, Dossiernummern wörtlich aus dem Feld übernehmen.
7. Reihenfolge der Ausgabe: aufsteigend nach `id`. Nicht nach Relevanz, nicht nach Wichtigkeit.

## Ablauf

1. `server_info` aufrufen, `version` notieren.
2. `list_hierarchy` mit der Kernfrage als `query` aufrufen. Notiere alle Buckets mit `count > 0`.
3. Für jeden Bucket mit `count > 0` eine `search` mit `hierarchy=[<id>]` ausführen. Kein Bucket wird übersprungen, auch nicht bei niedriger Trefferzahl.
4. Alle Treffer-IDs sammeln, deduplizieren, sortieren.
5. Für jede ID `fetch_document`.
6. Antwort bauen.

## Ausgabeformat

### Antwort
Höchstens 5 Sätze. Jeder Satz endet mit der ID der Quelle in eckigen Klammern.

### Belege
| id | title | collection | date | belegte Angabe | document_url |
|---|---|---|---|---|---|

Sortiert nach `id`.

### Nicht belegbar
Liste der Teilfragen ohne Treffer. Bei leerer Liste: `keine`.

### Lauf-Manifest
```
server_version: <aus server_info>
buckets_geprueft: <liste id:count>
aufrufe:
  - tool: search
    query: "<wörtlich>"
    hierarchy: [...]
    sort: id
    size: 100
    seiten: <n>
    total: <n>
  - ...
ids_geprueft: <n>
abgeschnitten: ja|nein
```

Das Manifest ist Pflichtbestandteil der Antwort. Ohne Manifest ist der Lauf nicht reproduzierbar.
