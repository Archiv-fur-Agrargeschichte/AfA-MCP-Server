#!/usr/bin/env python3
"""Generiert eine statische HTML-Statistikseite aus dem afa-mcp-Access-Log.

Parst das Logfile (Default ``~/afa-mcp/afa-mcp.log``), aggregiert die
JSON-RPC-Calls pro Tag, Tool und KI-Client und schreibt eine selbst-
enthaltene HTML-Datei (Default ``~/mcp.histoirerurale.ch/httpdocs/
statistik/index.html``). Geeignet als Plesk Scheduled Task.

Aufruf:

    python3 generate_stats.py
    python3 generate_stats.py --log ~/afa-mcp/afa-mcp.log \\
                              --out ~/mcp.histoirerurale.ch/httpdocs/statistik/index.html
"""

from __future__ import annotations

import argparse
import gzip
import html
import os
import re
import sys
from collections import Counter, defaultdict
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Iterable

# Logzeile (das ``app=``/``appver=``-Feld kam mit Version >= 0.2 dazu; aeltere
# Zeilen ohne diese Felder werden weiter unterstuetzt).
LOG_LINE = re.compile(
    r"^(?P<date>\d{4}-\d{2}-\d{2}) (?P<time>\d{2}:\d{2}:\d{2}),\d+"
    r"\s+INFO\s+afa_mcp\.access\s+[—-]+\s+"
    r"method=(?P<method>\S+)\s+"
    r"tool=(?P<tool>\S+)\s+"
    r"id=(?P<id>\S+)\s+"
    r"status=(?P<status>\S+)\s+"
    r"size=(?P<size>\d+)\s+"
    r"ms=(?P<ms>\d+)\s+"
    r"client=(?P<client>\S+)"
    r"(?:\s+app=(?P<app>\S+))?"
    r"(?:\s+appver=(?P<appver>\S+))?"
)


def iter_log_lines(path: Path) -> Iterable[str]:
    """Liefert Zeilen des Hauptlogs plus rotierter Geschwister chronologisch."""
    parent = path.parent
    base = path.name
    candidates: list[Path] = []
    for p in sorted(parent.glob(base + "*")):
        if p == path or p.name.startswith(base + "."):
            candidates.append(p)
    candidates.sort(key=lambda p: (p.suffix != "", p.name), reverse=True)
    for p in candidates:
        try:
            opener = gzip.open if p.suffix == ".gz" else open
            with opener(p, "rt", encoding="utf-8", errors="replace") as f:
                yield from f
        except FileNotFoundError:
            continue


def parse(path: Path) -> list[dict]:
    out: list[dict] = []
    for line in iter_log_lines(path):
        m = LOG_LINE.match(line)
        if not m:
            continue
        d = m.groupdict()
        try:
            ts = datetime.strptime(d["date"] + " " + d["time"],
                                   "%Y-%m-%d %H:%M:%S")
        except ValueError:
            continue
        out.append({
            "ts": ts,
            "date": d["date"],
            "hour": ts.hour,
            "method": d["method"],
            "tool": d["tool"],
            "status": d["status"],
            "size": int(d["size"]),
            "ms": int(d["ms"]),
            "client": d["client"],
            "app": d.get("app") or "-",
            "appver": d.get("appver") or "-",
        })
    out.sort(key=lambda r: r["ts"])
    return out


# ---------------------------------------------------------------------------
# Aggregation
# ---------------------------------------------------------------------------

SETUP_METHODS = {"initialize", "notifications/initialized",
                 "tools/list", "resources/list", "prompts/list"}


def per_day(rows: list[dict]) -> dict[str, dict]:
    days: dict[str, dict] = defaultdict(lambda: {
        "total": 0, "setup": 0, "tool_calls": 0, "other": 0,
        "sessions": 0,            # = Anzahl initialize-Calls
        "tools": Counter(),
        "hours_tools": [0] * 24,  # Sparkline-Daten: Tool-Calls pro Stunde
        "hours_all": [0] * 24,
        "apps": Counter(),        # KI-Clients (eindeutig per Session/initialize)
        "ms_total": 0, "ms_n": 0,
        "errors": 0,
    })
    for r in rows:
        d = days[r["date"]]
        d["total"] += 1
        d["hours_all"][r["hour"]] += 1
        if r["method"] == "initialize":
            d["sessions"] += 1
            d["setup"] += 1
            if r["app"] != "-":
                d["apps"][r["app"]] += 1
        elif r["method"] in SETUP_METHODS:
            d["setup"] += 1
        elif r["method"] == "tools/call":
            d["tool_calls"] += 1
            d["hours_tools"][r["hour"]] += 1
            if r["tool"] != "-":
                d["tools"][r["tool"]] += 1
        else:
            d["other"] += 1
        d["ms_total"] += r["ms"]
        d["ms_n"] += 1
        try:
            if int(r["status"]) >= 400:
                d["errors"] += 1
        except ValueError:
            pass
    return days


def overall_tools(rows: list[dict]) -> Counter:
    c: Counter = Counter()
    for r in rows:
        if r["method"] == "tools/call" and r["tool"] != "-":
            c[r["tool"]] += 1
    return c


def overall_methods(rows: list[dict]) -> Counter:
    return Counter(r["method"] for r in rows)


def overall_apps(rows: list[dict]) -> dict[str, dict]:
    """Pro KI-Client: Sessions (initialize-Counts), letzte Sitzung."""
    apps: dict[str, dict] = defaultdict(lambda: {"sessions": 0, "last": None,
                                                  "versions": Counter()})
    for r in rows:
        if r["method"] != "initialize" or r["app"] == "-":
            continue
        a = apps[r["app"]]
        a["sessions"] += 1
        a["versions"][r["appver"]] += 1
        if a["last"] is None or r["ts"] > a["last"]:
            a["last"] = r["ts"]
    return apps


def overall_hours(rows: list[dict]) -> tuple[list[int], list[int]]:
    tools = [0] * 24
    setup = [0] * 24
    for r in rows:
        if r["method"] == "tools/call":
            tools[r["hour"]] += 1
        else:
            setup[r["hour"]] += 1
    return tools, setup


# ---------------------------------------------------------------------------
# HTML-Rendering
# ---------------------------------------------------------------------------

CSS = """
:root {
  --bg: #f3efe6; --panel: #fdfaf3; --ink: #1d1b16; --muted: #5d564a;
  --accent: #4a6b3a; --accent-2: #8a9a5b; --line: #ddd2bb; --soft: #ebe3cf;
}
* { box-sizing: border-box; }
body {
  margin: 0; font-family: Georgia, "Times New Roman", serif;
  background:
    radial-gradient(circle at top left, rgba(138,154,91,.16), transparent 28rem),
    linear-gradient(180deg, #f6f1e7 0%, var(--bg) 100%);
  color: var(--ink);
}
main { max-width: 62rem; margin: 0 auto; padding: 3rem 1.5rem 4rem; }
.eyebrow { letter-spacing: .08em; text-transform: uppercase;
  color: var(--accent); font-size: .82rem; font-weight: 700; }
h1 { font-size: clamp(2rem,5vw,3.4rem); line-height: 1; margin: .4rem 0 1.2rem; }
.subtitle { color: var(--muted); margin: 0 0 2rem; font-size: 1.05rem; }
.kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: 1rem; margin: 0 0 2rem; }
.kpi { background: var(--panel); border: 1px solid var(--line);
  border-radius: 10px; padding: 1rem 1.2rem; }
.kpi .v { font-size: 2.1rem; font-weight: 700; color: var(--ink);
  font-variant-numeric: tabular-nums; }
.kpi .l { color: var(--muted); font-size: .92rem; margin-top: .1rem; }
.panel { background: var(--panel); border: 1px solid var(--line);
  border-radius: 12px; padding: 1.4rem 1.6rem; margin-bottom: 1.4rem;
  box-shadow: 0 2px 14px rgba(60,50,30,.05); }
.panel h2 { margin: 0 0 .3rem; font-size: 1.25rem; }
.panel .lead { color: var(--muted); margin: 0 0 1rem; font-size: .94rem; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: .55rem .55rem; border-bottom: 1px dotted var(--line);
  font-size: .96rem; text-align: left; vertical-align: middle; }
th { color: var(--accent); font-weight: 600; font-size: .8rem;
  text-transform: uppercase; letter-spacing: .04em; }
td.num { text-align: right; font-variant-numeric: tabular-nums; }
td.day { font-weight: 600; }
td.muted { color: var(--muted); }
td.spark { padding: 0 .5rem; }
.bar { height: .55rem; background: var(--accent); border-radius: 3px;
  display: inline-block; vertical-align: middle; }
.bar.alt { background: var(--accent-2); }
.bar-cell { width: 14rem; }
code { font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: .92rem; color: var(--ink); }
footer { margin-top: 2rem; font-size: .88rem; color: var(--muted); }
.empty { color: var(--muted); font-style: italic; padding: 1rem 0; }
svg.sparkline { display: block; }
.hours-axis { font-size: .72rem; color: var(--muted); margin-top: .2rem;
  display: flex; justify-content: space-between; }
"""

PAGE = """<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>AfA-MCP — Nutzungsstatistik</title>
<style>{css}</style>
</head>
<body>
<main>
  <div class="eyebrow">recherche2.histoirerurale.ch · MCP</div>
  <h1>Nutzungsstatistik</h1>
  <p class="subtitle">Stand: {generated} · Datenquelle: <code>{logfile}</code></p>

  <div class="kpis">
    <div class="kpi"><div class="v">{today_tool_calls}</div><div class="l">heute · Tool-Aufrufe</div></div>
    <div class="kpi"><div class="v">{today_sessions}</div><div class="l">heute · Sessions</div></div>
    <div class="kpi"><div class="v">{week_tool_calls}</div><div class="l">letzte 7&nbsp;Tage · Tool-Aufrufe</div></div>
    <div class="kpi"><div class="v">{total_tool_calls}</div><div class="l">gesamt · Tool-Aufrufe</div></div>
  </div>

  <div class="panel">
    <h2>Tagesübersicht</h2>
    <p class="lead">Tool-Aufrufe pro Tag, dazu die Stundenverteilung als Sparkline.
       Eine <em>Session</em> entspricht einer <code>initialize</code>-Anfrage —
       d.&nbsp;h. einem neu geöffneten Chat im jeweiligen KI-Client.</p>
    {day_table}
  </div>

  <div class="panel">
    <h2>Top-Tools</h2>
    <p class="lead">Welche AfA-Werkzeuge wurden tatsächlich aufgerufen?</p>
    {tool_table}
  </div>

  <div class="panel">
    <h2>KI-Clients</h2>
    <p class="lead">Aus dem <code>clientInfo</code>-Feld der MCP-Handshakes.
       Jede Zeile = ein KI-Tool, das mindestens einmal eine Session aufgebaut hat.</p>
    {app_table}
  </div>

  <div class="panel">
    <h2>Tagesübergreifende Aktivität nach Stunde</h2>
    <p class="lead">Tool-Aufrufe (dunkelgrün) und Setup-Aufrufe (heller) über
       alle Tage hinweg, lokale Server-Zeit (Europe/Zurich).</p>
    {hours_chart}
  </div>

  <div class="panel" style="opacity:.85">
    <h2>Methoden-Verteilung (technisch)</h2>
    <p class="lead">Setup-Methoden (<code>initialize</code>, <code>tools/list</code>,
       <code>resources/list</code> …) sind MCP-Protokoll-Overhead — pro neu
       geöffnetem Chat einmalig. Echte Nutzung steckt in <code>tools/call</code>.</p>
    {method_table}
  </div>

  <footer>
    Aktualisierung via Plesk Scheduled Task. Reine Aggregate —
    keine Nutzerinhalte gespeichert (<code>AFA_ACCESS_LOG_ARGS_MAX=0</code>).
  </footer>
</main>
</body>
</html>
"""


# ---------------------------------------------------------------------------
# Sparkline / Bar-Chart helpers
# ---------------------------------------------------------------------------


def _sparkline_svg(values: list[int], width: int = 144, height: int = 28,
                   color: str = "var(--accent)") -> str:
    """24-Spalten-Balken-Sparkline. Null-Werte werden als hauchduenne
    Grundlinie gerendert, damit man den ganzen Tag im Blick hat."""
    n = len(values)
    if n == 0:
        return ""
    maxv = max(values) or 1
    bar_w = width / n
    inner = []
    for i, v in enumerate(values):
        h = max(1.0, (v / maxv) * (height - 2))
        x = i * bar_w + 0.5
        y = height - h
        inner.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="{bar_w-1:.2f}" '
                     f'height="{h:.2f}" fill="{color}" rx="1"/>')
    title = "Stundenwerte: " + ", ".join(f"{h:02d}h:{v}" for h, v in enumerate(values))
    return (f'<svg class="sparkline" width="{width}" height="{height}" '
            f'viewBox="0 0 {width} {height}" aria-label="{html.escape(title)}">'
            f'<title>{html.escape(title)}</title>' + "".join(inner) + '</svg>')


def _stacked_hours_svg(tools: list[int], setup: list[int],
                       width: int = 760, height: int = 180) -> str:
    n = 24
    maxv = max((t + s) for t, s in zip(tools, setup)) or 1
    bar_w = (width - 40) / n
    inner = []
    # Y-Achse: 3 Grid-Linien
    for i in range(4):
        y = 20 + i * ((height - 50) / 3)
        v = int(maxv - i * maxv / 3)
        inner.append(f'<line x1="35" y1="{y:.1f}" x2="{width-5}" y2="{y:.1f}" '
                     f'stroke="var(--soft)" stroke-width="1"/>')
        inner.append(f'<text x="30" y="{y+3:.1f}" text-anchor="end" '
                     f'font-size="10" fill="var(--muted)">{v}</text>')
    # Balken
    for i in range(n):
        t = tools[i]
        s = setup[i]
        h_total = ((t + s) / maxv) * (height - 50)
        h_tools = (t / maxv) * (height - 50)
        x = 38 + i * bar_w + 1
        y0 = height - 30
        # Setup unten (heller), Tools oben (dunkel) — gestapelt
        if s > 0:
            inner.append(f'<rect x="{x:.2f}" y="{y0 - h_total:.2f}" '
                         f'width="{bar_w-2:.2f}" height="{h_total - h_tools:.2f}" '
                         f'fill="var(--accent-2)" opacity="0.5" rx="1"/>')
        if t > 0:
            inner.append(f'<rect x="{x:.2f}" y="{y0 - h_tools:.2f}" '
                         f'width="{bar_w-2:.2f}" height="{h_tools:.2f}" '
                         f'fill="var(--accent)" rx="1"/>')
        # Stundenlabel (jede 3.)
        if i % 3 == 0:
            inner.append(f'<text x="{x + bar_w/2:.2f}" y="{height-12}" '
                         f'text-anchor="middle" font-size="10" '
                         f'fill="var(--muted)">{i:02d}h</text>')
    return (f'<svg width="100%" height="{height}" viewBox="0 0 {width} {height}" '
            f'preserveAspectRatio="xMidYMid meet" '
            f'role="img" aria-label="Stundenverteilung">' + "".join(inner) +
            '</svg>')


# ---------------------------------------------------------------------------
# Tabellen
# ---------------------------------------------------------------------------


def _render_day_table(days: dict[str, dict]) -> str:
    if not days:
        return ('<div class="empty">Noch keine Daten — der Server hat seit '
                'Aktivierung des Access-Logs keine Anfragen erhalten.</div>')
    max_tool_calls = max((d["tool_calls"] for d in days.values()), default=0) or 1
    rows = ["<table><thead><tr>"
            "<th>Tag</th><th class='num'>Tool-Calls</th>"
            "<th>Stundenverteilung</th>"
            "<th class='num'>Sessions</th>"
            "<th>Top-Tool</th>"
            "<th>KI-Clients</th>"
            "<th class='num'>Ø&nbsp;ms</th>"
            "<th class='num muted'>Setup</th>"
            "<th class='num muted'>Fehler</th>"
            "</tr></thead><tbody>"]
    for day in sorted(days.keys(), reverse=True):
        d = days[day]
        avg_ms = round(d["ms_total"] / d["ms_n"]) if d["ms_n"] else 0
        top_tool = d["tools"].most_common(1)
        top_tool_str = (f"<code>{html.escape(top_tool[0][0])}</code> "
                        f"<span class='muted'>({top_tool[0][1]})</span>"
                        if top_tool else "—")
        apps_str = ", ".join(f"{html.escape(a)} ({n})"
                             for a, n in d["apps"].most_common()) or "—"
        bar_w = 100 * d["tool_calls"] / max_tool_calls if max_tool_calls else 0
        spark = _sparkline_svg(d["hours_tools"])
        rows.append(
            f"<tr>"
            f"<td class='day'>{html.escape(day)}</td>"
            f"<td class='num'><span class='bar' style='width:{bar_w*0.7:.1f}%;"
            f"margin-right:.4rem'></span>{d['tool_calls']}</td>"
            f"<td class='spark'>{spark}</td>"
            f"<td class='num'>{d['sessions']}</td>"
            f"<td>{top_tool_str}</td>"
            f"<td class='muted'>{apps_str}</td>"
            f"<td class='num muted'>{avg_ms}</td>"
            f"<td class='num muted'>{d['setup']}</td>"
            f"<td class='num muted'>{d['errors']}</td>"
            f"</tr>"
        )
    rows.append("</tbody></table>")
    return "".join(rows)


def _render_tool_table(tools: Counter) -> str:
    if not tools:
        return '<div class="empty">Noch keine Tool-Aufrufe registriert.</div>'
    max_v = tools.most_common(1)[0][1]
    rows = ["<table><thead><tr><th>Tool</th><th class='num'>Calls</th>"
            "<th class='bar-cell'>Anteil</th></tr></thead><tbody>"]
    for name, n in tools.most_common(20):
        w = 100 * n / max_v
        rows.append(
            f"<tr><td><code>{html.escape(name)}</code></td>"
            f"<td class='num'>{n}</td>"
            f"<td class='bar-cell'><span class='bar alt' "
            f"style='width:{w:.1f}%'></span></td></tr>"
        )
    rows.append("</tbody></table>")
    return "".join(rows)


def _render_app_table(apps: dict[str, dict]) -> str:
    if not apps:
        return ('<div class="empty">Noch keine identifizierten KI-Clients '
                '(d.&nbsp;h. noch keine <code>initialize</code>-Calls mit '
                '<code>clientInfo</code>).</div>')
    max_v = max(a["sessions"] for a in apps.values()) or 1
    items = sorted(apps.items(), key=lambda x: -x[1]["sessions"])
    rows = ["<table><thead><tr>"
            "<th>KI-Client</th><th class='num'>Sessions</th>"
            "<th class='bar-cell'>Anteil</th>"
            "<th>Letzte Sitzung</th><th>Versionen</th>"
            "</tr></thead><tbody>"]
    for name, info in items:
        w = 100 * info["sessions"] / max_v
        last = info["last"].strftime("%Y-%m-%d %H:%M") if info["last"] else "—"
        vers = ", ".join(f"{html.escape(v)} ({n})"
                         for v, n in info["versions"].most_common())
        rows.append(
            f"<tr><td><strong>{html.escape(name)}</strong></td>"
            f"<td class='num'>{info['sessions']}</td>"
            f"<td class='bar-cell'><span class='bar' "
            f"style='width:{w:.1f}%'></span></td>"
            f"<td class='muted'>{html.escape(last)}</td>"
            f"<td class='muted'>{vers or '—'}</td></tr>"
        )
    rows.append("</tbody></table>")
    return "".join(rows)


def _render_method_table(methods: Counter) -> str:
    if not methods:
        return '<div class="empty">Noch keine Methoden registriert.</div>'
    max_v = methods.most_common(1)[0][1]
    rows = ["<table><thead><tr><th>Methode</th><th class='num'>Calls</th>"
            "<th class='bar-cell'>Anteil</th></tr></thead><tbody>"]
    for name, n in methods.most_common():
        w = 100 * n / max_v
        cls = "" if name == "tools/call" else " class='muted'"
        rows.append(
            f"<tr{cls}><td><code>{html.escape(name)}</code></td>"
            f"<td class='num'>{n}</td>"
            f"<td class='bar-cell'><span class='bar' "
            f"style='width:{w:.1f}%'></span></td></tr>"
        )
    rows.append("</tbody></table>")
    return "".join(rows)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def render(rows: list[dict], logfile: Path) -> str:
    days = per_day(rows)
    today = date.today().isoformat()
    week_cutoff = (date.today() - timedelta(days=6)).isoformat()
    today_d = days.get(today, {})
    week_tool_calls = sum(d["tool_calls"] for k, d in days.items()
                          if k >= week_cutoff)
    tools_hours, setup_hours = overall_hours(rows)
    return PAGE.format(
        css=CSS,
        generated=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        logfile=html.escape(str(logfile)),
        today_tool_calls=today_d.get("tool_calls", 0),
        today_sessions=today_d.get("sessions", 0),
        week_tool_calls=week_tool_calls,
        total_tool_calls=sum(d["tool_calls"] for d in days.values()),
        day_table=_render_day_table(days),
        tool_table=_render_tool_table(overall_tools(rows)),
        app_table=_render_app_table(overall_apps(rows)),
        hours_chart=_stacked_hours_svg(tools_hours, setup_hours),
        method_table=_render_method_table(overall_methods(rows)),
    )


def main(argv: list[str] | None = None) -> int:
    home = Path(os.path.expanduser("~"))
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--log", type=Path,
                        default=home / "afa-mcp" / "afa-mcp.log",
                        help="Pfad zum Access-Log")
    parser.add_argument("--out", type=Path,
                        default=home / "mcp.histoirerurale.ch" /
                                "httpdocs" / "statistik" / "index.html",
                        help="Zieldatei für die HTML-Seite")
    args = parser.parse_args(argv)

    if not args.log.exists():
        print(f"WARN: log file not found: {args.log}", file=sys.stderr)
        rows: list[dict] = []
    else:
        rows = parse(args.log)

    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(render(rows, args.log), encoding="utf-8")
    print(f"wrote {args.out} ({len(rows)} log entries)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
