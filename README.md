# afa-mcp

MCP-Server für das AGHIST-Suchportal des **Archivs für Agrargeschichte (AfA)** (Archives d'histoire rurale AHR /
Archives of Rural History ARH) in Bern (CH).

Der Server stellt Volltext-Suche und Hierarchie-Recherche über das Model Context
Protocol (Streamable HTTP) bereit, sodass MCP-fähige Clients wie Claude, ChatGPT,
Cursor oder Perplexity direkt in den AfA-Beständen suchen können.

Live-Endpunkt: <https://mcp.histoirerurale.ch/mcp>

## Wo steht was

Die Nutzerdokumentation steht auf der Website des Servers und wird aus
`deploy/index.html` und `deploy/assets/js/i18n.js` in vier Sprachen ausgeliefert.
Sie wird hier nicht wiederholt.

| Thema | Ort |
|---|---|
| Welche Bestände durchsuchbar sind, Beispielrecherchen | <https://mcp.histoirerurale.ch/> |
| Server in Claude, ChatGPT, Cursor, Perplexity, VS Code, Claude Code oder einem eigenen SDK-Client einrichten | <https://mcp.histoirerurale.ch/#clients> |
| Werkzeuge, alle Parameter, Rückgabefelder | <https://mcp.histoirerurale.ch/#werkzeuge> |
| Nutzungstipps, Reproduzierbarkeit, Direktzugriff per `curl`, Discovery-Endpunkte | <https://mcp.histoirerurale.ch/#tipps> und <https://mcp.histoirerurale.ch/#technik> |

Dieses README deckt ab, was dort nicht steht:

1. [Prompts für strenge, wiederholbare Recherchen](#prompts-für-strenge-wiederholbare-recherchen)
2. [Konfiguration: das Verhalten über Einstellungen steuern](#konfiguration-das-verhalten-über-einstellungen-steuern)
3. [Lokal entwickeln](#lokal-entwickeln)
4. [Produktion](#produktion-debian)
5. [Architektur](#architektur)

## Prompts für strenge, wiederholbare Recherchen

Die Werkzeuge sind die eine Hälfte, die Frage im Chat die andere: sie entscheidet,
wie das Modell die Werkzeuge benutzt. Die Website erklärt das Vorgehen für den
Alltag. Hier geht es um den Fall, in dem ein Ergebnis belegt und wiederholbar sein
muss, also um Prompts, die das Vorgehen vorschreiben statt nur ein Ergebnis zu
bestellen.

Das häufigste Problem ist dabei nicht, dass ein Modell etwas erfindet. Es ist
**Auslassung**: dieselbe Frage, zweimal gestellt, liefert zwei Antworten, beide
korrekt, aber jede lässt etwas anderes weg.

### Sechs Sätze, die fast immer helfen

| Satz im Prompt | Was er verhindert |
|---|---|
| «Beginne mit `list_hierarchy`, damit klar ist, welche Bestände etwas enthalten.» | Das Modell sucht nur dort, wo es zufällig zuerst hinschaut. |
| «Setze `sort="id"` und `size=100`.» | `relevance` ist nicht stabil: ändert sich der Index, ändert sich die Reihenfolge. |
| «Blättere über `next_cursor`, bis er `null` ist.» | Eine Antwort aus der ersten Seite statt aus allen Treffern. |
| «Rufe für jede ID, die in der Antwort vorkommt, `fetch_document` auf.» | Zitate aus dem Feld `text`, das nur ein gekürztes Highlight ist. |
| «Belege jede Aussage mit `id` und `document_url`. Was nicht im Bestand steht, heisst "nicht im Bestand".» | Ergänzungen aus dem Vorwissen des Modells. |
| «Gib am Ende alle ausgeführten Aufrufe wörtlich aus.» | Ein Ergebnis, das niemand nachvollziehen kann. |

### Ausgabeform vorgeben

Freie Prosa lädt zum Auswählen ein, eine Tabelle mit Pflichtspalten nicht. Wer
schreibt «Tabelle mit den Spalten id, title, collection, date, document_url», sieht
eine leere Zelle sofort. Ein weggelassener Satz dagegen fällt niemandem auf.
Dasselbe gilt für Dossiers: ein festes Formular, in dem jedes Feld entweder gefüllt
oder als «nicht im Bestand» markiert wird, ist zuverlässiger als die Bitte um eine
Zusammenfassung.

### Vorlagen zum Kopieren

**Belegte Antwort auf eine Frage**

```text
Beantworte die Frage ausschliesslich mit den Werkzeugen des AfA-Servers.

FRAGE: <deine Frage>

Vorgehen:
1. list_hierarchy mit dem Kern der Frage, notiere jeden Bestand mit count > 0.
2. Für jeden dieser Bestände suchen mit hierarchy=[<id>], sort="id", size=100,
   und über next_cursor blättern, bis er null ist.
3. fetch_document für jede ID, die in deiner Antwort vorkommt.

Regeln: nur Angaben aus Tool-Antworten dieser Sitzung, Namen und Daten wörtlich,
Widersprüche mit beiden IDs nennen und nicht auflösen.

Ausgabe: Antwort in höchstens fünf Sätzen, jeder Satz endet mit der ID seiner
Quelle. Dazu eine Tabelle (id, title, collection, date, document_url) und ein
Protokoll aller ausgeführten Aufrufe.
```

**Vollständige Trefferliste**

```text
Erstelle eine vollständige Trefferliste, ohne zu interpretieren oder zu kürzen.

SUCHBEGRIFF (wörtlich so verwenden): <Anfrage>
BESTAENDE: <Hierarchie-IDs oder "alle">

sort="id", size=100, blättern bis next_cursor null ist. Jeder Treffer kommt in die
Tabelle, auch offensichtlich unpassende, mit Vermerk in der Spalte Hinweis. Die
Zeilenzahl muss zu total aus der ersten Antwort passen; weicht sie ab, schreibe die
Abweichung hin. Bessere Anfragen nennst du am Ende unter "Vorschläge", führst sie
aber nicht aus.
```

**Dossier zu einer Person, Institution oder einem Betrieb**

```text
Erstelle ein Dossier nach festem Schema zu: <Name> (Typ: person|institution|farm)

1. search_entities mit dem Namen, sort="id", size=100, bis zum Ende blättern.
2. Mehrere plausible Treffer: alle Kandidaten mit id und title auflisten und
   nachfragen, welcher gemeint ist. Nicht selbst entscheiden.
3. fetch_document für die gewählte ID und für jede verknüpfte ID.

Formular, jede Zeile ausgeben, auch leere: id, title, collection, Lebensdaten,
Orte, Ausbildung, Tätigkeit, Funktionen und Ämter (ALLE, je eine pro Zeile,
wörtlich), Verwandtschaft, verknüpfte Betriebe, Publikationen, audiovisuelle
Quellen, Dossiernummern, document_url, nicht belegte Felder.
```

**Ein fremdes Ergebnis nachprüfen**

```text
Führe die folgenden Aufrufe wörtlich identisch erneut aus (query, hierarchy, sort,
size unverändert), baue deine eigene Ergebnisliste und vergleiche sie erst danach
mit dem fremden Ergebnis.

PROTOKOLL DES VORLAUFS:
<Aufrufe einfügen>

Ausgabe: IDs nur im Vorlauf, IDs nur im neuen Lauf, IDs in beiden, abweichende
Felder, Abweichungen bei total. Bewertung mit genau einem Status: reproduziert,
Bestand geändert, Aufrufe abweichend, Auswahl des Modells abweichend.
```

### Was ein Prompt nicht leisten kann

Ein Prompt ist eine Bitte, kein Vertrag. Zählen, formatieren, blättern und
auswählen macht ein Skript zuverlässiger als jede Formulierung. Sobald ein
Ergebnis wiederholt exakt gleich herauskommen muss, gehört die Schleife in Code,
der die Werkzeuge direkt aufruft; das Modell entscheidet dann nur noch, wonach
gesucht wird.

## Konfiguration: das Verhalten über Einstellungen steuern

Der Server wird ausschliesslich über Umgebungsvariablen gesteuert, es gibt keine
Konfigurationsdatei mit eigener Syntax. `.env.example` enthält alle Variablen mit
Kommentar; im Betrieb werden sie in `start.sh` (Plesk) oder in der systemd-Unit
gesetzt. Nach jeder Änderung muss der Server neu gestartet werden, sonst passiert
nichts.

### Womit der Server spricht

| Variable | Default | Was sie bewirkt |
|---|---|---|
| `AFA_ES_URL` | `https://agrargeschichte.pansoft.de:9210/*/_search` | Elasticsearch-Endpoint, also die Datenquelle. Auf einen Test-Index zeigen lassen, um ohne Produktivdaten zu arbeiten. |
| `HTTP_TIMEOUT` | `30` | Sekunden, die eine Elasticsearch-Anfrage dauern darf. Höher setzen, wenn grosse Seiten (`size=100`) in Timeouts laufen. |
| `AFA_VERIFY_SSL` | `true` | TLS-Prüfung des Upstreams. Nur für einen Testserver mit selbstsigniertem Zertifikat auf `false`. |

### Wo und wie der Server erreichbar ist

| Variable | Default | Was sie bewirkt |
|---|---|---|
| `MCP_TRANSPORT` | `streamable-http` | `streamable-http` für den Netzbetrieb, `stdio` für lokale CLI-Clients. |
| `HOST` | `127.0.0.1` | Interface. Bei vorgelagertem nginx oder Apache auf `127.0.0.1` lassen, sonst ist der Server am Proxy vorbei erreichbar. |
| `PORT` | `8766` | Port. Ändern, wenn er belegt ist; dann auch die Proxy-Regel anpassen. |
| `MCP_PATH` | `/mcp` | Pfad-Präfix der MCP-Endpunkte. Ändern heisst: alle Clients müssen ihre URL anpassen. |
| `PUBLIC_BASE_URL` | `https://mcp.histoirerurale.ch` | Basis-URL, die in Server Card und `.well-known`-Antworten steht, und Grundlage der erlaubten Hosts. Bei eigener Domain zwingend anpassen. |

### Sicherheit und Browser-Zugriff

| Variable | Default | Was sie bewirkt |
|---|---|---|
| `MCP_STATELESS_HTTP` | `true` | Ohne serverseitige Session. Nötig, damit mehrere Prozesse oder ein Neustart laufende Clients nicht abhängen. |
| `MCP_JSON_RESPONSE` | `true` | Antwortet auch Clients, die nur `application/json` akzeptieren, statt Server-Sent-Events zu verlangen. Auf `false` nur, wenn alle Clients SSE können. |
| `MCP_DNS_REBINDING_PROTECTION` | `true` | Prüft `Host` und `Origin` der Anfragen. Anlassen. Wird der Server unter einem weiteren Namen erreicht, gehört dieser in `MCP_ALLOWED_HOSTS`, statt den Schutz abzuschalten. |
| `MCP_ALLOWED_HOSTS` | leer | Zusätzliche erlaubte Hostnamen, kommagetrennt. `127.0.0.1`, `localhost` und der Host aus `PUBLIC_BASE_URL` sind immer erlaubt. |
| `MCP_ALLOWED_ORIGINS` | leer | Zusätzliche erlaubte Origins, kommagetrennt. |
| `CORS_ALLOW_ORIGINS` | `*` | Welche Websites den Server aus dem Browser aufrufen dürfen. Für einen öffentlichen Dienst ist `*` richtig, für einen internen eine konkrete Liste. |

### Protokoll und Statistik

| Variable | Default | Was sie bewirkt |
|---|---|---|
| `LOG_LEVEL` | `INFO` | `DEBUG` zeigt jede Elasticsearch-Anfrage, nützlich zur Fehlersuche, laut im Betrieb. |
| `AFA_ACCESS_LOG` | `true` | Schaltet die Middleware ein, die jeden Aufruf einzeln protokolliert. Ohne sie bleibt die Statistikseite leer. |
| `AFA_ACCESS_LOG_ARGS_MAX` | `200` | Wie viele Zeichen der Aufrufargumente ins Log gelangen. **`0` heisst: keine Suchanfragen im Log.** Das ist der Schalter für den Datenschutz. |
| `AFA_ACCESS_LOG_FILE` | leer, also stdout | Eigene Logdatei. Ohne Angabe landet alles im Prozess-Log (bei Plesk im nohup-Logfile). |
| `AFA_STATS_CACHE` | `~/afa-mcp/stats-cache.json` | Pfad des JSON-Caches für die Vortage der Statistikseite. |
| `AFA_STATS_USER` | leer | Benutzername für Basic Auth auf `/statistik`. |
| `AFA_STATS_PASS` | leer | Passwort dazu. **Sind `AFA_STATS_USER` und `AFA_STATS_PASS` nicht beide gesetzt, ist `/statistik` ohne Anmeldung offen.** |

### Typische Aufgaben und die passende Einstellung

| Aufgabe | Einstellung |
|---|---|
| Keine Suchanfragen der Nutzenden speichern | `AFA_ACCESS_LOG_ARGS_MAX=0` (oder `AFA_ACCESS_LOG=false`, dann fällt auch die Statistik weg) |
| Statistikseite schützen | `AFA_STATS_USER` und `AFA_STATS_PASS` beide setzen |
| Gegen einen Test-Index arbeiten | `AFA_ES_URL` umbiegen, bei selbstsigniertem Zertifikat zusätzlich `AFA_VERIFY_SSL=false` |
| Fehler suchen | `LOG_LEVEL=DEBUG`, danach wieder auf `INFO` |
| Eigene Domain betreiben | `PUBLIC_BASE_URL` setzen, Zusatznamen in `MCP_ALLOWED_HOSTS` |
| Server lokal in einem CLI-Client nutzen | `python -m afa_mcp --transport stdio`, keine weiteren Variablen nötig |
| Timeouts bei grossen Seiten | `HTTP_TIMEOUT` erhöhen oder im Prompt `size` senken |

## Lokal entwickeln

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"

# Streamable HTTP, Default auf 127.0.0.1:8766/mcp
python -m afa_mcp

# Stdio (für lokale CLI-Clients)
python -m afa_mcp --transport stdio

# Tests
pytest -q

# Live-Smoke-Test
python scripts/smoke_test.py
```

### Access-Log-Format

Jede MCP-Methode erzeugt eine Zeile im Logger `afa_mcp.access`:

```
2026-06-10 14:30:01,234 INFO afa_mcp.access — method=tools/call tool=search id=42 status=200 size=8543 ms=145 client=160.79.106.37 args={"query":"Bäuerin Emmental","size":3}
```

Auswertung typisch via `awk` und `grep`, etwa:

```bash
# Top-10 Tools nach Häufigkeit
grep 'afa_mcp.access' ~/afa-mcp/server.log \
  | grep -oE 'tool=[a-z_]+' | sort | uniq -c | sort -rn | head

# Latenz-Quantile pro Tool
grep 'method=tools/call' ~/afa-mcp/server.log \
  | awk -F'tool=' '{print $2}' | awk '{print $1, $NF}' \
  | sort | awk '{a[$1]++; s[$1]+=$2} END {for (t in a) printf "%-30s n=%4d avg=%dms\n", t, a[t], s[t]/a[t]}'
```

## Produktion (Debian)

```bash
sudo bash deploy/install.sh
sudo certbot --nginx -d mcp.histoirerurale.ch
sudo install -m 644 /opt/afa-mcp/deploy/nginx.conf \
    /etc/nginx/sites-available/mcp.histoirerurale.ch
sudo nginx -t && sudo systemctl reload nginx
```

Das Skript installiert:

- Systemnutzer `afa` und `/opt/afa-mcp`-Verzeichnis
- Python-venv mit den Abhängigkeiten
- systemd-Unit `afa-mcp.service` (gehärtet, Stateless-HTTP)
- nginx-vHost mit OAuth-, MCP- und Agent-Discovery, Pfad-Redirects, llms.txt

### Deploy-Skript für Updates

```bash
sudo tee /usr/local/sbin/deploy-afa-mcp > /dev/null <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
sudo -u afa git -C /opt/afa-mcp pull --ff-only
install -m 644 /opt/afa-mcp/deploy/nginx.conf \
    /etc/nginx/sites-available/mcp.histoirerurale.ch
nginx -t && systemctl reload nginx
systemctl restart afa-mcp
systemctl status --no-pager afa-mcp | head -5
EOF
sudo chmod +x /usr/local/sbin/deploy-afa-mcp
```

Aufruf: `sudo deploy-afa-mcp`.

## Produktion (Plesk, ohne root)

Falls, wie bei der aktuellen Installation auf `mcp.histoirerurale.ch`,
kein root und kein systemd zur Verfügung steht, läuft der Server im
Userspace, gestartet von einer Plesk Scheduled Task (Cron, jede Minute):

```bash
# einmalig:
mkdir -p ~/afa-mcp && cd ~/afa-mcp
git clone https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server.git .
virtualenv .venv
.venv/bin/pip install -e .
install -m 755 deploy/plesk/start.sh ~/afa-mcp/start.sh
```

Plesk, Domain, Scheduled Tasks, neuer Task `~/afa-mcp/start.sh`,
jede Minute. Skript-Verhalten:

- Existiert ein laufender PID, endet das Skript ohne Wirkung.
- Sonst: Umgebungsvariablen setzen, `python -m afa_mcp` im venv via `nohup` starten,
  PID in `~/afa-mcp/afa-mcp.pid` ablegen.

Apache mod_proxy davorhängen via `mcp.histoirerurale.ch/httpdocs/.htaccess`
(siehe Apache-Doku des Repos), Plesk liefert TLS und das vHost-Routing.

Updates: `git -C ~/afa-mcp pull --ff-only`, anschliessend einmal die alte
Instanz killen, der Cron startet die neue beim nächsten Tick.

### Statistik-Seite (`/statistik`, Live-Generierung)

Der MCP-Server liefert unter `/statistik` selbst eine Nutzungsstatistik aus,
**live bei jedem Aufruf** generiert. Vortage werden in einem JSON-Cache
(`~/afa-mcp/stats-cache.json`) fixiert, damit nur der aktuelle Tag aus dem
Log neu aggregiert werden muss. Kein Cron-Job notwendig.

Basic Auth über Umgebungsvariablen (in `start.sh`):

```bash
export AFA_STATS_USER=admin
export AFA_STATS_PASS=DEIN_PASSWORT
```

Sind beide leer, ist `/statistik` ungeschützt zugänglich (Dev-Modus).

Apache-Setup: `mcp.histoirerurale.ch/httpdocs/.htaccess` braucht eine
mod_proxy-Regel für `/statistik` (Vorlage in
`deploy/plesk/mcp-htaccess.example`):

```apache
RewriteRule ^statistik$       http://127.0.0.1:8766/statistik       [P,L]
RewriteRule ^statistik/(.*)$  http://127.0.0.1:8766/statistik/$1    [P,L]
```

Der Authorization-Header wird per mod_proxy unverändert durchgereicht, die
Auth-Prüfung passiert im Python-Server (`hmac.compare_digest` gegen die
Umgebungsvariablen). Die Seite zeigt:

* heute, Tool-Aufrufe und Sessions (live aus dem Log)
* letzte 7 Tage und gesamt (Vortage aus Cache)
* Tagesübersicht mit Stunden-Sparkline pro Tag
* Top-Tools, KI-Clients (aus `clientInfo.name`)
* 24-Stunden-Aktivitätsgrafik
* Methoden-Verteilung (technischer Overhead)

Inhalte sind reine Aggregate. Solange `AFA_ACCESS_LOG_ARGS_MAX=0` gesetzt
ist, gelangen keine Nutzer-Suchanfragen ins Log oder die Statistik.

Fallback und Offline-Rendering: `deploy/plesk/statistik/generate_stats.py`
schreibt dieselbe Seite einmalig als statische Datei, nützlich zum
Initialisieren älterer Caches oder für Tests ohne laufenden Server.

## Architektur

`src/afa_mcp/search.py` enthält den Elasticsearch-Client und Pydantic-basiertes
Antwort-Parsing. `src/afa_mcp/server.py` definiert die FastMCP-Tools, die
spezialisierten Such-Wrapper (Editionen, Entitäten, Audio-Visuell) und die
ASGI-App mit OAuth- und Discovery-Routen. `src/afa_mcp/hierarchy.py` zentralisiert
die Hierarchie-IDs, damit Tool-Code und Tests nicht mit Magic-Strings arbeiten
müssen.

### Landing-Page (`deploy/`)

Statische Seite unter <https://mcp.histoirerurale.ch>, ohne Build-Schritt. Sie
trägt die gesamte Nutzerdokumentation, deshalb gehören inhaltliche Änderungen an
Beständen, Werkzeug-Parametern oder Anleitungen nach `i18n.js` und nicht in dieses
README:

```
deploy/index.html              nur Markup
deploy/assets/css/style.css    Design-System der Hauptseite histoirerurale.ch/afa
deploy/assets/js/i18n.js       alle Texte in de, fr, it, en
deploy/assets/js/app.js        Sprachwahl und Textersetzung
deploy/assets/img/logo-afa.png Logo der Hauptseite
deploy/assets/fonts/           Merriweather (Überschriften)
```

Farben, Schriften und Komponenten übernehmen das Joomla-Template der Hauptseite
(Cassiopeia plus `user.css`): Rot `#a00000`, Hover `#870000`, Fliesstext
Helvetica Neue 15px, Überschriften Merriweather in Rot, Container 1170px.

nginx liefert `/assets/` direkt aus (Location in `deploy/nginx.conf` und
`deploy/nginx-http.conf`), unter Plesk liegen die Dateien in `httpdocs` und
werden ohne Zusatzregel ausgeliefert.

Die Discovery-Endpunkte (`/.well-known/mcp.json`, `/.well-known/agent-card.json`,
`/.well-known/oauth-protected-resource`, `/llms.txt`) sind auf der Website
dokumentiert; ihre Inhalte stammen aus `src/afa_mcp/server.py` und `deploy/`.

## Quellen

- Website: <https://histoirerurale.ch>
- Recherche-Frontend: <https://www.recherche2.histoirerurale.ch>
- Schwesterprojekt: <https://github.com/entscheidsuche/entscheidsuche-mcp>

## Lizenz

MIT
