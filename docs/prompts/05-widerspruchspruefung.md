# 05: Widerspruchsprüfung

**Wann:** Ein Sachverhalt kommt in mehreren Einträgen vor. UC-1 nennt den Fall: Verkauf des Miteigentumsanteils am Sentenhof: Personeneintrag 1856, Betriebsbeschreibung 1866.

Prinzip: Ein Modell vergleicht Einträge nicht von sich aus und wählt bei jedem Lauf eine andere Variante. Deshalb: nicht auflösen lassen, sondern gegenüberstellen.

---

**Sachverhalt:** {SACHVERHALT}
**Einträge:** {ID_A}, {ID_B}, … (mindestens zwei; oder `ermitteln`: dann Schritt 0)

## Ablauf

0. Nur bei `ermitteln`: `search` mit `query="{SACHVERHALT}"`, `sort="id"`, `size=100`, Pagination bis Ende. Alle Treffer sind Prüfkandidaten.
1. Für jede ID `fetch_document`.
2. Extrahiere je Eintrag jede Angabe zum Sachverhalt **wörtlich**, mit Feldnamen.
3. Stelle gegenüber.

## Ausgabeformat

### Gegenüberstellung
| angabe | quelle A (id) | quelle B (id) | status |
|---|---|---|---|

`status` ∈ `übereinstimmend` | `widersprüchlich` | `nur in A` | `nur in B`.

### Wörtliche Belege
Je Zeile mit Status `widersprüchlich`: beide Textstellen wörtlich, mit `id` und Feldname.

## Regeln

1. Löse Widersprüche **nicht** auf. Priorisiere keine Quelle. Formuliere keine wahrscheinlichere Variante. Die Auflösung ist Sache der Nutzerin.
2. Kein Ausgleich über Weltwissen („1856 ist plausibler, weil…"). Verboten.
3. Auch triviale Abweichungen aufführen: Schreibweisen, Datumsformate, Ortsnamen.
4. Ist alles übereinstimmend, sage das explizit: `keine Widersprüche in den geprüften Feldern`, und nenne, welche Felder geprüft wurden. Ohne diese Liste ist die Aussage wertlos.
5. Lauf-Manifest anhängen.
