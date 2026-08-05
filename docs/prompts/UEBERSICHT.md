# Übersicht: was hängt wie zusammen

Vier Ebenen. Wer sie verwechselt, baut Regeln an die falsche Stelle.

```
Ebene 1   99-server-instructions   gilt immer, jeder Client, ohne Zutun
Ebene 2   00-rezept-format         Träger: was zwischen Chats weitergegeben wird
Ebene 3   01 bis 06                was im Chat getan wird
Ebene 4   skills-vorschlag         was nicht das Modell tun soll, sondern Code
```

## Ebene 1: der einzige echte Systemprompt

**`99-server-instructions.md`**
Steckt in `src/afa_mcp/server.py` und wird bei jeder Session an jeden Client geliefert. Trägt nur
Regeln, die immer gelten: Belegpflicht, Snippet ist nicht Volltext, `sort=id`, paginieren,
Widersprüche nicht auflösen. Niemand muss etwas kopieren, deshalb der stärkste Hebel für
Reproduzierbarkeit über Chats hinweg. Enthält bewusst keine fallspezifische Logik.

## Ebene 2: das Format, nicht der Prompt

**`00-reproduzierbarkeit-ueber-chats.md`**
Kein Prompt, sondern das Datenformat. Definiert die Datei, die weitergegeben wird: Aufrufe wörtlich,
Ausgabeschema, Fingerprint (`ids_sha256`), vier Statuswerte. Beantwortet die Frage, woran man
erkennt, dass zwei verschiedene Chats dasselbe geliefert haben. Alle anderen Prompts erzeugen oder
konsumieren so eine Datei.

## Ebene 3: die Arbeitsprompts

| Datei | Was sie tut | Verhältnis zu den anderen |
|---|---|---|
| `01-deterministische-recherche.md` | Standardfall: Frage rein, belegte Antwort plus Lauf-Manifest raus | Basis, 02 bis 05 erben ihre Regeln |
| `02-vollstaendige-enumeration.md` | 01 ohne Auswahl: alle Treffer, `total` gegen Zeilenzahl | wenn Vollständigkeit vor Lesbarkeit geht |
| `03-entity-dossier.md` | 01 mit festem Formular für Person, Institution, Betrieb | leeres Feld ist sichtbar, weggelassener Satz nicht |
| `04-av-quellenliste.md` | 01 plus Regel für Query-Erweiterung, Schlagwortschwelle 2 | ersetzt das Varianten-Probieren |
| `05-widerspruchspruefung.md` | Vergleichsprompt: stellt gegenüber, löst nicht auf | läuft nach 01 oder 03 |
| `06-selbstpruefung-diff.md` | Messprompt: frische Sitzung, fremdes Rezept, blind ausführen, diffen | liefert den Status aus 00 |

Ohne 06 ist "reproduzierbar" eine unbelegte Behauptung.

## Ebene 4: der Ausstieg aus dem Prompting

**`skills-vorschlag.md`**
Alles, was ein Prompt nur erbitten kann (paginieren, zählen, GEDCOM formatieren, Checkpoints
halten), wird Skript. `rezept.py run/verify/lint` ist die Brücke zwischen Ebene 2 und Ebene 4: es
führt die Rezepte aus, statt sie dem Modell vorzulesen.

## Ablauf im Normalfall

1. **99** setzt den Rahmen, ohne dass jemand etwas tun muss.
2. **01 bis 05** erzeugen ein Ergebnis.
3. Ergebnis wird als **00**-Rezept mit Fingerprint abgelegt.
4. **06** prüft es in einer fremden Sitzung nach.
5. Was dabei wiederholt wackelt, wandert nach **skills-vorschlag** in Code.
