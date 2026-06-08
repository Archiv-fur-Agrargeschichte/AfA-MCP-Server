#!/usr/bin/env bash
# Installations-Script für afa-mcp auf Debian.
# Auf dem Zielserver als root ausführen.

set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/agrargeschichte/afa-mcp.git}"
INSTALL_DIR="${INSTALL_DIR:-/opt/afa-mcp}"
SERVICE_USER="${SERVICE_USER:-afa}"
DOMAIN="${DOMAIN:-mcp.histoirerurale.ch}"

if [[ $EUID -ne 0 ]]; then
    echo "Bitte als root ausführen (sudo bash install.sh)" >&2
    exit 1
fi

echo "==> Pakete installieren"
apt-get update
apt-get install -y python3 python3-venv python3-pip git nginx

echo "==> Systemnutzer anlegen"
if ! id "$SERVICE_USER" &>/dev/null; then
    useradd --system --home "$INSTALL_DIR" --shell /usr/sbin/nologin "$SERVICE_USER"
fi

echo "==> Code beziehen (HTTPS — kein Auth nötig für öffentliche Repos)"
if [[ -d "$INSTALL_DIR/.git" ]]; then
    sudo -u "$SERVICE_USER" git -C "$INSTALL_DIR" pull --ff-only
else
    rm -rf "$INSTALL_DIR"
    git clone "$REPO_URL" "$INSTALL_DIR"
fi
chown -R "$SERVICE_USER:$SERVICE_USER" "$INSTALL_DIR"

echo "==> Python-venv erzeugen"
sudo -u "$SERVICE_USER" python3 -m venv "$INSTALL_DIR/.venv"
sudo -u "$SERVICE_USER" "$INSTALL_DIR/.venv/bin/pip" install --upgrade pip
sudo -u "$SERVICE_USER" "$INSTALL_DIR/.venv/bin/pip" install -r "$INSTALL_DIR/requirements.txt"
sudo -u "$SERVICE_USER" "$INSTALL_DIR/.venv/bin/pip" install "$INSTALL_DIR"

echo "==> Konfigurations-Datei"
if [[ ! -f /etc/afa-mcp.env ]]; then
    cp "$INSTALL_DIR/.env.example" /etc/afa-mcp.env
    chmod 640 /etc/afa-mcp.env
    chown root:"$SERVICE_USER" /etc/afa-mcp.env
fi

echo "==> systemd-Unit installieren"
install -m 644 "$INSTALL_DIR/deploy/afa-mcp.service" \
    /etc/systemd/system/afa-mcp.service
mkdir -p /var/log/afa-mcp
chown "$SERVICE_USER:$SERVICE_USER" /var/log/afa-mcp
systemctl daemon-reload
systemctl enable --now afa-mcp.service

echo "==> nginx vHost"
if [[ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" && -f "/etc/letsencrypt/live/$DOMAIN/privkey.pem" ]]; then
    NGINX_TEMPLATE="$INSTALL_DIR/deploy/nginx.conf"
else
    NGINX_TEMPLATE="$INSTALL_DIR/deploy/nginx-http.conf"
fi
install -m 644 "$NGINX_TEMPLATE" "/etc/nginx/sites-available/$DOMAIN"
ln -sf "../sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
nginx -t
systemctl reload nginx

echo
if [[ "$NGINX_TEMPLATE" == *"nginx-http.conf" ]]; then
    echo "Bootstrap-Konfiguration ohne TLS wurde installiert."
    echo "Nächster Schritt — TLS-Zertifikat holen und danach auf HTTPS umstellen:"
    echo "    apt-get install -y certbot python3-certbot-nginx"
    echo "    certbot --nginx -d $DOMAIN"
    echo "    install -m 644 $INSTALL_DIR/deploy/nginx.conf /etc/nginx/sites-available/$DOMAIN"
    echo "    nginx -t && systemctl reload nginx"
else
    echo "TLS-Zertifikat war bereits vorhanden; HTTPS-Konfiguration ist aktiv."
fi
echo
echo "Status prüfen:"
echo "    systemctl status afa-mcp"
echo "    journalctl -u afa-mcp -f"
