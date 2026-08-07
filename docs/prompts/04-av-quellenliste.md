# 04: AV-Quellenliste für Publikation

**Wann:** Foto- und Filmquellen zu einem Thema, Ergebnis soll zitier- und bestellfähig sein (UC-2).

Problem laut UC-2: Die Verschlagwortung folgt archivarischer Logik. Ein Modell probiert freie Varianten, und probiert bei jedem Lauf andere. Lösung: Query-Erweiterung an die Verschlagwortung binden und protokollieren.

---

**Thema:** {THEMA}
**Zeitraum:** {VON} bis {BIS} oder `alle`

## Ablauf

1. `list_hierarchy` mit `query="{THEMA}"`. Notiere die Counts für Foto- und Filmbestand. Sind beide 0, brich ab und melde `keine AV-Quellen zum Thema`.
2. **Runde 1 (Basis):** `search_audiovisual` mit `query="{THEMA}"`, `sort="id"`, `size=100`, Pagination bis Ende.
3. **Verschlagwortungs-Ernte:** Sammle aus den `meta`-Feldern aller Treffer von Runde 1 alle Schlagworte. Liste sie vollständig mit Häufigkeit auf.
4. **Runde 2 (kontrolliert erweitert):** Führe je Schlagwort, das in Runde 1 mindestens zweimal vorkommt, genau eine weitere Suche aus, `query` = das Schlagwort wörtlich. Keine selbst erfundenen Synonyme. Die Zwei-Vorkommen-Schwelle ist die Regel, nicht dein Urteil.
5. IDs beider Runden vereinigen, deduplizieren, nach `id` sortieren.
6. `fetch_document` für jede ID.

## Ausgabeformat

### Schlagwort-Ernte
| schlagwort | häufigkeit in runde 1 | in runde 2 gesucht (ja/nein) | zusätzliche treffer |
|---|---|---|---|

### Quellenliste
| id | title | typ (foto/film) | jahr | dauer | auftraggeber | dossiernummer | document_url |
|---|---|---|---|---|---|---|---|

Sortiert nach `id`. Fehlende Felder: `nicht im Bestand`. Jahr und Dauer wörtlich aus dem Eintrag, nicht gerechnet und nicht gerundet.

### Rechte
Keine Aussage zu Nutzungsrechten. Steht nichts im Eintrag, schreibe: `Rechte nicht im Datensatz, beim AfA klären.`

### Lauf-Manifest
Alle ausgeführten Queries wörtlich, in Ausführungsreihenfolge, mit `total` je Query.
