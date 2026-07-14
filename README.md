# afa-mcp

MCP-Server für das AGHIST-Suchportal des **Archivs für Agrargeschichte (AfA)** (Archives d'histoire rurale AHR /
Archives of Rural History ARH) in Bern (CH).

AGHIST ist das Suchportal zur Agrar-, Ernährungs- und Umweltgeschichte und ermöglicht einen Zugriff auf die online-Ressourcen (Filme, Fotos und schriftliche Quellen sowie Verzeichnungsdaten, wissenschaftliche Texte, Video Essays, etc.), die vom AfA und seinen Partnerinstitutionen im In- und Ausland öffentlich zugänglich gemacht werden.

Der AGHIST MCP-Server stellt Volltext-Suche und Hierarchie-Recherche über das
Model Context Protocol (Streamable HTTP) bereit, sodass MCP-fähige Clients wie
Claude, ChatGPT, Cursor oder Perplexity direkt in den AfA-Beständen suchen können.

Live-Endpunkt: <https://mcp.histoirerurale.ch/mcp>

## Werkzeuge

Aktuelle Trefferzahlen pro Sammlung liefert das Tool `list_hierarchy` — sie sind bewusst nicht statisch in dieser Doku hinterlegt.

### `search` — generische Volltext-Suche

Durchsucht alle AfA-Bestände (Personen, Institutionen, Betriebe, Foto-/Film-Bestände, Archive, digitale Editionen, Publikationen, Medienberichte). Optional auf beliebige Hierarchie-IDs einschränkbar.

| Parameter | Typ | Default | Beschreibung |
|---|---|---|---|
| `query` | str | `*` | Lucene-Query-String. Phrasen mit `"..."`, `AND`/`OR`/`NOT`, Wildcards `*` und `?`. Default-Operator: AND. |
| `language` | `de`\|`fr`\|`it`\|`en` | — | Bevorzugte Sprache für Titel/Highlight (kein Filter, fällt zurück). |
| `sort` | `relevance`\|`date`\|`id` | `relevance` | Sortierung. |
| `size` | int (1–100) | 20 | Treffer pro Seite. |
| `search_after` | list | — | Cursor aus `next_cursor` der vorigen Antwort. |
| `hierarchy` | list[str] | — | Hierarchie-IDs zur Einschränkung (OR verknüpft). Aus `list_hierarchy`. |
| `include_aggregations` | bool | false | Hierarchie-Aggregation mitliefern. |

### `search_entities` — Personen / Institutionen / Betriebe

| Parameter | Typ | Default | Beschreibung |
|---|---|---|---|
| `query` | str | `*` | Lucene-Query-String. |
| `entity_type` | `person`\|`institution`\|`farm`\|`any` | `any` | Typ-Filter. `company` bleibt als Deprecated-Alias für `farm` erhalten. |
| `language` | `de`\|`fr`\|`it`\|`en` | — | Bevorzugte Sprache. |
| `sort` | `relevance`\|`date`\|`id` | `relevance` | Sortierung. |
| `size` | int (1–100) | 20 | Treffer pro Seite. |
| `search_after` | list | — | Paginierungs-Cursor. |

### `search_audiovisual` — Foto- und Film-Bestände

| Parameter | Typ | Default | Beschreibung |
|---|---|---|---|
| `query` | str | `*` | Lucene-Query-String. |
| `media_type` | `photos`\|`films` | — | `photos` = nur Fotos, `films` = nur Filme, sonst beides. |
| `language` | `de`\|`fr`\|`it`\|`en` | — | Bevorzugte Sprache. |
| `sort` | `relevance`\|`date`\|`id` | `relevance` | Sortierung. |
| `size` | int (1–100) | 20 | Treffer pro Seite. |
| `search_after` | list | — | Paginierungs-Cursor. |

### `search_edition_hofstetter` · `search_edition_gillabert_randin` · `search_edition_bobbett`

Volltext-Suche jeweils in einer der drei digitalen Editionen (Mina Hofstetter, Augusta Gillabert-Randin, Elizabeth Bobbett).

| Parameter | Typ | Default | Beschreibung |
|---|---|---|---|
| `query` | str | `*` | Lucene-Query-String. |
| `language` | `de`\|`fr`\|`it`\|`en` | — | Bevorzugte Sprache. |
| `sort` | `relevance`\|`date`\|`id` | `relevance` | Sortierung. |
| `size` | int (1–100) | 20 | Treffer pro Seite. |
| `search_after` | list | — | Paginierungs-Cursor. |

### `fetch_document` — Einzelnes Dokument inkl. Volltext

| Parameter | Typ | Default | Beschreibung |
|---|---|---|---|
| `id` | str | erforderlich | Dokument-ID, z.B. `AfA_Personen_001_DB9920` oder `AfA_Edition_003_BobbettE_1933_01`. |
| `language` | `de`\|`fr`\|`it`\|`en` | — | Bevorzugte Sprache. |

### `list_hierarchy` — Hierarchie-Buckets mit Trefferzahlen

| Parameter | Typ | Default | Beschreibung |
|---|---|---|---|
| `query` | str | `*` | Optionale Volltext-Anfrage. |
| `size` | int (1–10000) | 200 | Maximale Anzahl Hierarchie-Einträge. |
| `language` | `de`\|`fr`\|`it`\|`en` | — | Label-Sprache. |

### `server_info` — Versions- und Endpunkt-Information

Keine Parameter. Liefert Server-Name, Version, ES-Upstream-URL, verfügbare Sprachen, Sortier-Optionen und die Konstanten für alle Hierarchie-IDs.

## Lokal entwickeln

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"

# Streamable HTTP — Default auf 127.0.0.1:8766/mcp
python -m afa_mcp

# Stdio (für lokale CLI-Clients)
python -m afa_mcp --transport stdio

# Tests
pytest -q

# Live-Smoke-Test
python scripts/smoke_test.py
```

## Konfiguration (Env-Vars)

Siehe `.env.example`. Die wichtigsten:

| Variable | Default | Bedeutung |
|---|---|---|
| `AFA_ES_URL` | `https://agrargeschichte.pansoft.de:9210/*/_search` | Elasticsearch-Endpoint |
| `PUBLIC_BASE_URL` | `https://mcp.histoirerurale.ch` | Basis-URL für Discovery |
| `MCP_STATELESS_HTTP` | `true` | Keine Server-seitige Session-Pflicht |
| `MCP_JSON_RESPONSE` | `true` | Akzeptiert Clients mit nur `application/json` |
| `MCP_DNS_REBINDING_PROTECTION` | `true` | Host/Origin-Filter |
| `CORS_ALLOW_ORIGINS` | `*` | Browser-Origin-Liste |
| `AFA_ACCESS_LOG` | `true` | JSON-RPC Access-Log (Methoden-/Tool-Statistik) aktiv |
| `AFA_ACCESS_LOG_ARGS_MAX` | `200` | Max. Zeichen pro `args`-Repr in der Logzeile |
| `AFA_ACCESS_LOG_FILE` | *(stdout)* | Optionaler Pfad für eine dedizierte Logdatei |

### Access-Log-Format

Jede MCP-Methode erzeugt eine Zeile im Logger `afa_mcp.access`:

```
2026-06-10 14:30:01,234 INFO afa_mcp.access — method=tools/call tool=search id=42 status=200 size=8543 ms=145 client=160.79.106.37 args={"query":"Bäuerin Emmental","size":3}
```

Auswertung typisch via `awk` / `grep`, etwa:

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

- Systemnutzer `afa` + `/opt/afa-mcp`-Verzeichnis
- Python-venv mit den Abhängigkeiten
- systemd-Unit `afa-mcp.service` (gehärtet, Stateless-HTTP)
- nginx-vHost mit OAuth-/MCP-/Agent-Discovery, Pfad-Redirects, llms.txt

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

Falls — wie bei der aktuellen Installation auf `mcp.histoirerurale.ch` —
kein root und kein systemd zur Verfügung steht, läuft der Server im
Userspace, gestartet von einer Plesk Scheduled Task (Cron, alle Minute):

```bash
# einmalig:
mkdir -p ~/afa-mcp && cd ~/afa-mcp
git clone https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server.git .
virtualenv .venv
.venv/bin/pip install -e .
install -m 755 deploy/plesk/start.sh ~/afa-mcp/start.sh
```

Plesk → Domain → Scheduled Tasks → neuer Task `~/afa-mcp/start.sh`,
jede Minute. Skript-Verhalten:

- Existiert ein laufender PID → exit 0 (No-op).
- Sonst: env setzen, `python -m afa_mcp` im venv via `nohup` starten,
  PID in `~/afa-mcp/afa-mcp.pid` ablegen.

Apache mod_proxy davorhängen via `mcp.histoirerurale.ch/httpdocs/.htaccess`
(siehe Apache-Doku des Repos), Plesk liefert TLS und das vHost-Routing.

Updates: `git -C ~/afa-mcp pull --ff-only`, anschließend einmal die alte
Instanz killen — der Cron startet die neue beim nächsten Tick neu.

### Statistik-Seite (`/statistik`, Live-Generierung)

Der MCP-Server liefert unter `/statistik` selbst eine Nutzungsstatistik aus —
**live bei jedem Aufruf** generiert. Vortage werden in einem JSON-Cache
(`~/afa-mcp/stats-cache.json`) fixiert, damit nur der aktuelle Tag aus dem
Log neu aggregiert werden muss. Kein Cron-Job notwendig.

Basic Auth via Env-Variablen (in `start.sh`):

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

Der Authorization-Header wird per mod_proxy unverändert durchgereicht; die
Auth-Prüfung passiert im Python-Server (`hmac.compare_digest` gegen die
Env-Variablen). Die Seite zeigt:

* heute · Tool-Aufrufe / Sessions (live aus dem Log)
* letzte 7 Tage und gesamt (Vortage aus Cache)
* Tagesübersicht mit Stunden-Sparkline pro Tag
* Top-Tools, KI-Clients (aus `clientInfo.name`)
* 24-Stunden-Aktivitätsgrafik
* Methoden-Verteilung (technischer Overhead)

Inhalte sind reine Aggregate — solange `AFA_ACCESS_LOG_ARGS_MAX=0` gesetzt
ist, gelangen keine Nutzer-Suchanfragen ins Log oder die Statistik.

Fallback / Offline-Rendering: `deploy/plesk/statistik/generate_stats.py`
schreibt dieselbe Seite einmalig als statische Datei — nützlich für ältere
Caches initialisieren oder Tests ohne laufenden Server.

## Discovery-Endpunkte (für MCP-Verzeichnisse)

| Pfad | Inhalt |
|---|---|
| `/.well-known/mcp.json` | MCP-Server-Manifest |
| `/.well-known/agent-card.json` | A2A Agent Card |
| `/.well-known/oauth-protected-resource` | RFC 9728 (signalisiert: keine Auth) |
| `/llms.txt` | LLM-/Crawler-freundliche Site-Beschreibung |

## Architektur

`src/afa_mcp/search.py` enthält den Elasticsearch-Client und Pydantic-basiertes
Antwort-Parsing. `src/afa_mcp/server.py` definiert die FastMCP-Tools, die
spezialisierten Such-Wrapper (Editionen, Entitäten, Audio-Visuell) und die
ASGI-App mit OAuth-/Discovery-Routen. `src/afa_mcp/hierarchy.py` zentralisiert
die Hierarchie-IDs, damit Tool-Code und Tests nicht mit Magic-Strings arbeiten
müssen.

## Quellen

- Website: <https://histoirerurale.ch>
- Recherche-Frontend: <https://www.recherche2.histoirerurale.ch>
- Schwesterprojekt: <https://github.com/entscheidsuche/entscheidsuche-mcp>

## Lizenz

MIT
