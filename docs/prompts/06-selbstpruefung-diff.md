# 06: Fremdprüfung per Diff

**Wann:** In einer **frischen Sitzung**, idealerweise bei einer anderen Person und in einem anderen
Client. Innerhalb derselben Sitzung nachzufragen misst nur die Trägheit des Kontextfensters, nicht
Reproduzierbarkeit.

Voraussetzung: Rezept und Fingerprint aus `00-reproduzierbarkeit-ueber-chats.md` liegen als Datei vor.
Ohne sie ist keine Fremdprüfung möglich, weil die nötige Information im alten Chat steckt.

---

Du prüfst ein fremdes Rechercheergebnis nach. Du kennst dessen Antworttext nicht und darfst ihn
nicht lesen, bevor du deinen eigenen Lauf abgeschlossen hast. Vorgeschichte, Nacharbeit und
Zwischenfragen aus dem Ursprungschat sind für dich nicht verfügbar und werden nicht rekonstruiert:
war etwas davon nötig, ist das Rezept mangelhaft und das ist der Befund.

**Rezept bzw. Lauf-Manifest des Vorlaufs:**
```
{REZEPT_ODER_MANIFEST}
```

## Ablauf

1. Führe jeden im Manifest genannten Tool-Aufruf erneut aus, Query, `hierarchy`, `sort`, `size` wörtlich identisch. Keine Verbesserung, keine Ergänzung.
2. Erstelle deine eigene Ergebnistabelle nach dem Format des Ursprungs-Prompts.
3. **Erst jetzt** die Antwort des Vorlaufs lesen.
4. Diff bilden.

## Ausgabeformat

### Diff
| kategorie | wert |
|---|---|
| ids nur im vorlauf | |
| ids nur im neulauf | |
| ids in beiden | |
| felder mit abweichendem inhalt | |
| total-abweichungen laut server | |

### Bewertung
```
ids_sha256_neu: <hash>
ids_sha256_erwartet: <aus fingerprint>
identisch: ja|nein
status: reproduziert | bestand_geaendert | server_geaendert | abweichung_unerklaert
ursache_der_abweichung: bestandsaenderung | pagination | modellauswahl | query-abweichung |
                        client-verhalten | fehlender-kontext-im-rezept | unklar
```

`fehlender-kontext-im-rezept` ist der wichtigste neue Befund: du hättest etwas gebraucht, das nur im
alten Chat stand. Dann muss das Rezept ergänzt werden, nicht der Lauf wiederholt.

`modellauswahl` heisst: identische Tool-Antworten, unterschiedliche Antworttexte. Das ist der Fall, der den Prompt untauglich macht, dann Prompt verschärfen, nicht Lauf wiederholen.

`bestandsaenderung` heisst: `total` hat sich serverseitig geändert. Kein Prompt-Problem; Abrufdatum dokumentieren.

## Regeln

- Deine Aufgabe ist die Abweichung, nicht die bessere Antwort. Verbessere den Vorlauf nicht.
- Bei fehlendem oder unvollständigem Manifest: abbrechen und das melden. Ohne Manifest ist keine Reproduktion möglich.
