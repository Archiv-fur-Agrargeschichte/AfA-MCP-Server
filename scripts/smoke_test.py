#!/usr/bin/env python3
"""Smoke-Test: führt echte Suchläufe gegen die Live-AfA-API aus."""

from __future__ import annotations

import asyncio
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "src"))

from afa_mcp import hierarchy as H  # noqa: E402
from afa_mcp.models import EntityType, Language, SearchParams, SortOrder  # noqa: E402
from afa_mcp.search import AfaClient  # noqa: E402


ES_URL = os.environ.get(
    "AFA_ES_URL",
    "https://agrargeschichte.pansoft.de:9210/*/_search",
)


async def main() -> int:
    async with AfaClient(es_url=ES_URL) as client:
        print(f"== Volltext-Suche: 'Bauernhof', size=3 (Endpoint: {ES_URL})")
        resp = await client.search(SearchParams(query="Bauernhof", size=3))
        print(f"  Total: {resp.total}")
        for h in resp.hits:
            print(f"  - {h.id}  [{h.collection}]  {h.title[:80]}")

        print()
        print("== Entity-Suche (Personen): 'Müller', size=3")
        resp = await client.search(SearchParams(
            query="Müller", size=3, hierarchy=[H.PERSONS]
        ))
        print(f"  Total: {resp.total}")
        for h in resp.hits:
            print(f"  - {h.id}  {h.title[:80]}")

        print()
        print("== Edition Mina Hofstetter — alles, sortiert nach Datum, size=3")
        resp = await client.search(SearchParams(
            query="*", size=3, sort=SortOrder.date,
            hierarchy=[H.EDITION_HOFSTETTER],
        ))
        print(f"  Total: {resp.total}")
        for h in resp.hits:
            print(f"  - {h.id}  {h.date or '----'} — {h.title[:80]}")

        print()
        print("== Edition Bobbett — Suche 'Wicklow', size=3")
        resp = await client.search(SearchParams(
            query="Wicklow", size=3, hierarchy=[H.EDITION_BOBBETT],
        ))
        print(f"  Total: {resp.total}")
        for h in resp.hits:
            print(f"  - {h.id}  {h.title[:80]}")

        print()
        print("== Audio-/visuelle Quellen — alles, size=3")
        resp = await client.search(SearchParams(
            query="*", size=3, hierarchy=[H.AUDIOVISUAL],
        ))
        print(f"  Total: {resp.total}")
        for h in resp.hits:
            print(f"  - {h.id}  [{h.collection}]  {h.title[:80]}")

        print()
        print("== Hierarchie-Buckets (Top 10):")
        h_resp = await client.list_hierarchy(query="*", size=20, lang=Language.de)
        for entry in h_resp.entries[:10]:
            print(f"  {entry.id:35s} {entry.count:>8}   {entry.label}")

    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
