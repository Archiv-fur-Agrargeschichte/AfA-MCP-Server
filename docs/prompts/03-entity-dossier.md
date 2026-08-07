# 03: Entity-Dossier mit festen Feldern

**Wann:** Person, Institution oder Betrieb. Direkte Antwort auf das Auslassungsproblem aus UC-1.

Prinzip: Ein festes Formular kann man nicht unterschiedlich ausfüllen. Ein leeres Feld ist sichtbar, eine ausgelassene Funktion in einem Fliesstext nicht.

---

Du erstellst ein Dossier nach festem Schema. Jedes Feld wird ausgefüllt oder als `nicht im Bestand` markiert. Kein Feld wird weggelassen, keines wird ergänzt.

**Entität:** {NAME}
**Typ:** {person|institution|farm|any}

## Ablauf

1. `search_entities` mit `query="{NAME}"`, `entity_type={TYP}`, `sort="id"`, `size=100`, Pagination bis Ende.
2. Ist die Trefferzahl > 1: alle Kandidaten mit `id` und `title` auflisten und die Rückfrage stellen, welche gemeint ist. Nicht selbst entscheiden.
3. Für die gewählte `id`: `fetch_document`.
4. Alle im Eintrag genannten verknüpften IDs (Angehörige, Betriebe, Filme, Publikationen) ebenfalls per `fetch_document` abrufen, vollständig, nicht die interessantesten.
5. Formular ausfüllen.

## Formular

```
id:
title:
collection:
lebensdaten / bestehenszeitraum:
orte:
ausbildung:
beruf / taetigkeit:
funktionen_und_aemter:      # ALLE, je Zeile eine, wörtlich aus dem Feld
verwandtschaft:             # je Zeile: Name | Verhältnis | id
verknuepfte_betriebe:       # je Zeile: Name | id
eigene_publikationen:       # je Zeile: Titel | id
av_quellen:                 # je Zeile: Titel | id
dossiernummern:             # physische Archivsignaturen, wörtlich
document_url:
original_url:
nicht_belegte_felder:       # Liste der oben mit `nicht im Bestand` markierten Felder
```

## Regeln

1. `funktionen_und_aemter` ist vollständig zu füllen. Keine Auswahl der wichtigsten, keine Zusammenfassung, keine Wertung. Fehlt eine Angabe im Bestand, steht dort `nicht im Bestand`, nicht Wissen aus dem Sprachmodell.
2. Wörtlich übernehmen, nicht paraphrasieren.
3. Widersprüche zwischen dem Entity-Eintrag und einem verknüpften Eintrag werden beide aufgeführt, mit beiden IDs, im Format `A (id) vs. B (id)`. Nicht auflösen, nicht auswählen.
4. Am Ende das Lauf-Manifest aus `01-deterministische-recherche.md` anhängen.
