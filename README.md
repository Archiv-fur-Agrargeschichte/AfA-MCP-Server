# afa-mcp

MCP-Server für das **Archiv für Agrargeschichte** (AfA / Archives d'histoire rurale /
Archives of Rural History). Stellt Volltext-Suche und Hierarchie-Recherche über das
Model Context Protocol (Streamable HTTP) bereit, sodass MCP-fähige Clients wie
Claude, ChatGPT, Cursor oder Perplexity direkt in den AfA-Beständen suchen können.

Live-Endpunkt: <https://mcp.histoirerurale.ch/mcp>

## Werkzeuge

| Tool | Beschreibung |
|---|---|
| `search` | Volltext-Suche, optional mit `hierarchy`-Filter |
| `search_entities` | Personen / Institutionen / Betriebe (Parameter `entity_type`) |
| `search_audiovisual` | Foto- und Film-Bestände (optional `photos` / `films`) |
| `search_edition_hofstetter` | Edition Mina Hofstetter (67 Dokumente) |
| `search_edition_gillabert_randin` | Edition Augusta Gillabert-Randin (132 Dokumente) |
| `search_edition_bobbett` | Edition Elizabeth Bobbett (271 Dokumente) |
| `fetch_document` | Einzelnes Dokument inkl. Volltext anhand der ID |
| `list_hierarchy` | Hierarchie-Buckets mit Trefferzahlen |
| `server_info` | Versions- und Endpunkt-Information |

## Hierarchie-IDs

| ID | Sammlung | Doks |
|---|---|---|
| `AfA_Personen` | Personen | 15 824 |
| `AfA_Organisationen` | Institutionen | 1 206 |
| `AfA_Betriebe` | Betriebe | 1 |
| `AfA_Archiv` | Archivbestände | 212 |
| `AfA_FotoFilm` | Audio-/visuelle Quellen | 3 197 |
| `AfA_FotoFilm_001` | — Fotos | 1 960 |
| `AfA_FotoFilm_002` | — Filme | 1 237 |
| `AfA_Edition_001` | Edition Mina Hofstetter | 67 |
| `AfA_Edition_002` | Edition Augusta Gillabert-Randin | 132 |
| `AfA_Edition_003` | Edition Elizabeth Bobbett | 271 |
| `AfA_Publikationen` | Publikationen | 178 |
| `AfA_Berichte` | Medienberichte | 72 |
| `AfA_Weitere` | Weitere Quellen | 36 |

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
- Recherche-Frontend: <https://www.recherche.histoirerurale.ch>
- Schwesterprojekt: <https://github.com/entscheidsuche/entscheidsuche-mcp>

## Lizenz

MIT
