#!/bin/bash
# Plesk-User-Space-Starter fuer den AfA-MCP-Server.
#
# Anders als deploy/install.sh + deploy/afa-mcp.service (systemd, root noetig)
# laeuft dieses Skript komplett im User-Space:
#
#   * Wird per Plesk Scheduled Task (Cron, alle 1 Minute) angestossen.
#   * Pruef per PID-File, ob der Server laeuft. Falls ja: exit 0.
#   * Falls nein: env setzen, im Venv starten, PID merken.
#
# Voraussetzungen:
#   ~/afa-mcp/             enthaelt das Repo (git clone)
#   ~/afa-mcp/.venv/       enthaelt das virtualenv mit den Dependencies
#
# Logs:
#   ~/afa-mcp/afa-mcp.log  stdout+stderr (FastMCP-Startup + afa_mcp.access)
#
# Anpassen falls noetig: PUBLIC_BASE_URL, ALLOWED_HOSTS, ALLOWED_ORIGINS.

set -u

PIDFILE=~/afa-mcp/afa-mcp.pid
LOGFILE=~/afa-mcp/afa-mcp.log

if [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
    exit 0
fi

cd ~/afa-mcp

export HOST=127.0.0.1 PORT=8766 \
       PUBLIC_BASE_URL=https://mcp.histoirerurale.ch \
       MCP_JSON_RESPONSE=true MCP_STATELESS_HTTP=true \
       MCP_DNS_REBINDING_PROTECTION=false \
       MCP_ALLOWED_HOSTS=mcp.histoirerurale.ch \
       MCP_ALLOWED_ORIGINS=https://mcp.histoirerurale.ch \
       AFA_ACCESS_LOG=true \
       AFA_ACCESS_LOG_ARGS_MAX=0 \
       AFA_STATS_CACHE=$HOME/afa-mcp/stats-cache.json

# /statistik durch Basic Auth schuetzen: User+Passwort hier setzen.
# Sind beide leer, ist /statistik offen.
export AFA_STATS_USER=admin
export AFA_STATS_PASS=CHANGEME

nohup .venv/bin/python -m afa_mcp --port 8766 --host 127.0.0.1 --path /mcp \
    >> "$LOGFILE" 2>&1 &
echo $! > "$PIDFILE"
