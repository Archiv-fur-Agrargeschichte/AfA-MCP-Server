"""CLI-Einstiegspunkt für den AfA-MCP-Server."""

from __future__ import annotations

import argparse
import logging
import os
import sys

import uvicorn
from starlette.middleware.cors import CORSMiddleware

from .server import build_server, create_app


def _parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        prog="afa-mcp",
        description="MCP-Server für das Archiv für Agrargeschichte (Streamable HTTP / stdio).",
    )
    parser.add_argument("--transport", choices=("streamable-http", "stdio"),
                        default=os.environ.get("MCP_TRANSPORT", "streamable-http"))
    parser.add_argument("--host", default=os.environ.get("HOST", "127.0.0.1"))
    parser.add_argument("--port", type=int, default=int(os.environ.get("PORT", "8766")))
    parser.add_argument("--path", default=os.environ.get("MCP_PATH", "/mcp"))
    parser.add_argument("--log-level", default=os.environ.get("LOG_LEVEL", "INFO"))
    return parser.parse_args(argv)


def _parse_cors_origins() -> list[str]:
    raw = os.environ.get("CORS_ALLOW_ORIGINS", "*").strip()
    if not raw:
        return []
    if raw == "*":
        return ["*"]
    return [origin.strip() for origin in raw.split(",") if origin.strip()]


def _parse_bool_env(name: str, default: bool) -> bool:
    raw = os.environ.get(name)
    if raw is None:
        return default
    return raw.strip().lower() not in {"0", "false", "no", "off"}


def main(argv: list[str] | None = None) -> int:
    args = _parse_args(argv)

    logging.basicConfig(
        level=getattr(logging, args.log_level.upper(), logging.INFO),
        format="%(asctime)s %(levelname)s %(name)s — %(message)s",
    )

    server = build_server()

    if args.transport == "stdio":
        server.run(transport="stdio")
        return 0

    server.settings.host = args.host
    server.settings.port = args.port
    server.settings.streamable_http_path = args.path
    server.settings.stateless_http = _parse_bool_env("MCP_STATELESS_HTTP", True)
    # JSON-Response-Modus aktiv: akzeptiert Clients, die nur application/json
    # im Accept-Header senden — siehe entscheidsuche-mcp/Lessons-Learned.
    server.settings.json_response = _parse_bool_env("MCP_JSON_RESPONSE", True)

    app = create_app(server)

    cors_origins = _parse_cors_origins()
    if cors_origins:
        app = CORSMiddleware(
            app,
            allow_origins=cors_origins,
            allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
            allow_headers=["*"],
            expose_headers=["Mcp-Session-Id"],
        )

    uvicorn.run(app, host=args.host, port=args.port, log_level=args.log_level.lower())
    return 0


if __name__ == "__main__":
    sys.exit(main())
