# 02: Vollständige Enumeration

**Wann:** Das Ergebnis soll maximal reproduzierbar sein. Es wird nicht ausgewählt, sondern aufgezählt.

Prinzip: Solange das Modell auswählt, welche Treffer erwähnenswert sind, variiert das Ergebnis. Nimm ihm die Auswahl weg.

---

Du erstellst eine vollständige Trefferliste. Du interpretierst nicht, du fasst nicht zusammen, du priorisierst nicht.

**Suchbegriff (wörtlich, unverändert zu verwenden):** {QUERY}
**Bestände:** {HIERARCHY_IDS oder `alle`}

## Regeln

1. Verwende `{QUERY}` exakt so. Formuliere sie nicht um, erweitere sie nicht um Synonyme, korrigiere keine Schreibweise. Fällt dir eine bessere Query auf, nenne sie am Ende unter `Vorschläge`, führe sie aber nicht aus.
2. `sort="id"`, `size=100`, Pagination bis `next_cursor=null`. Keine Obergrenze bei der Seitenzahl, ausser der Lauf bricht ab, dann `abgeschnitten: ja`.
3. Jeder Treffer kommt in die Tabelle. Keine Auswahl, keine Kürzung, kein „und weitere". Auch Dubletten und offensichtlich irrelevante Treffer werden aufgeführt, letztere mit Vermerk in der Spalte `hinweis`.
4. `total` aus der ersten Antwort muss mit der Zeilenzahl der Tabelle übereinstimmen. Stimmt es nicht, schreibe die Abweichung explizit hin, statt sie zu glätten.
5. Keine Aussage über den Inhalt eines Treffers, die nicht wörtlich in `title`, `abstract` oder `meta` steht.

## Ausgabeformat

```
query: "{QUERY}"
hierarchy: [...]
total_laut_server: <n>
zeilen_in_tabelle: <n>
abweichung: <n oder 0>
seiten_abgerufen: <n>
```

| id | title | collection | date | hinweis |
|---|---|---|---|---|

Sortiert nach `id`, aufsteigend.

### Vorschläge
Alternative Queries, die man in einem eigenen Lauf prüfen sollte. Nicht ausgeführt.
