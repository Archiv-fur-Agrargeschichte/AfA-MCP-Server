// ---------------------------------------------------------------------------
// Mit doppel / kann auskommentiert werden
// ---------------------------------------------------------------------------

const I18N = {
  de: {
    nav_intro: 'Einführung',
    call_intro: 'Für diese Anfrage ruft der Assistent dieses Werkzeug auf:',
    more_tools_h: 'Weitere Werkzeuge',
    tools_intro: '<p>So können Sie den MCP-Server benutzen:<br>Ohne spezifische Anweisung berechnet der KI-Client die Antwort unter Zuhilfnahme aller Werkzeuge.</p>',
    ex1_h: 'Personenrecherche',
    ex1_q: '«Suche auf dem AGHIST-MCP-Server nach Landräten im Kanton Nidwalden und stelle diese in einer Excel-Tabelle mit den Spalten Nachname, Vorname, AfA-Nummer, Geburtsdatum, Todesdatum und Amtsjahre dar.»',
    ex1_tool: 'Personenrecherche Werkzeug',
    ex2_h: 'Institutionensuche',
    ex2_q: '«Suche auf dem AGHIST-MCP-Server nach Landfrauen- und Bäuerinnenvereinigungen in der Schweiz. Wie sind diese heute auf nationaler Ebene organisiert? Inwiefern änderte sich dies im Laufe der Zeit? Darstellung in einem geeigneten Diagramm.»',
    ex2_tool: 'Institutionensuche Werkzeug',
    ex3_h: 'Suche nach Fotos und Filmen',
    ex3_q: '«Gibt es Fotografien und Filme zur Mechanisierung (aber nicht Motorisierung) der Landwirtschaft in der ersten Hälfte des 20. Jahrhunderts? Erstelle eine Liste mit Titel und Live-URL zum Eintrag.»',
    ex3_tool: 'Suche nach Fotos und Filmen Werkzeug',
    ex4_h: 'Digitale Editionen',
    ex4_q: '«Durchsuche die Edition Gillabert-Randin nach Textstellen zum Frauenstimmrecht und zitiere diese.»',
    ex4_tool: 'Digitale Editionen Werkzeug',
    ex5_h: 'Volltext von Einträgen konsultieren',
    ex5_q: '«Hol den Volltext des Eintrags zu Ineichen, Franz (1887-1953)--DB1734 und nenne mir die dort angegebenen Quellenangaben.»',
    ex5_tool: 'Volltext von Einträgen konsultieren Werkzeug',
    nav_clients: 'Clients',
    nav_examples: 'Werkzeuge',
    nav_tips: 'Nutzung',
    nav_reliability: 'Verlässlichkeit',
    nav_reference: 'Technisches',
    brand: "Archiv für Agrargeschichte",
    subtitle: "MCP-Schnittstelle zum AGHIST-Suchportal des Archivs für Agrargeschichte",
    intro: 'AGHIST ermöglicht eine syntaktische (textuelle) Suche im <a href="https://www.recherche2.histoirerurale.ch">Recherche-Portal</a> des <a href="https://histoirerurale.ch">Archivs für Agrargeschichte</a>: Die Suche erfasst sämtliche Online-Ressourcen, die vom Archiv für Agrargeschichte öffentlich und unentgeltlich zur Verfügung gestellt werden. Es handelt sich um mehr als 15.000 Einträge zu Personen, mehr als 1.200 Einträge zu Institutionen, Einträge zu landwirtschaftlichen Betrieben, Einträgen zu audio-visuelle Quellen und zu Verzeichnungsdaten von Archivbeständen sowie digitale Editionen und Publikationen aus dem AfA und über das AfA. Über den MCP-Server (Model Context Protocol, Streamable HTTP) sind diese Online-Ressourcen direkt aus Claude, ChatGPT, Cursor, Perplexity und anderen MCP-fähigen Clients ansprechbar.',
    guide_h: "So funktioniert die Recherche",
    guide_p: '<p>Ist der Konnektor zum MCP-Server eingerichtet und Verbindung hergestellt und für die Suche aktiviert, stellen Sie Recherchefragen in natürlicher Sprache: Der Client durchsucht die die Online-Ressourcen, kombiniert Suchanfragen, folgt Querverweisen und fasst die Ergebnisse zusammen. Zum Beispiel:</p>'
        + '<blockquote>«Suche ausschliesslich auf dem MCP-Server AGHIST des Archivs für Agrargeschichte nach Personen mit dem Namen Ineichen.»</blockquote>'
        + '<p>Der Client findet 79 Personen und erkennt, dass viele davon zur Familie Ineichen des Sentenhofs (Muri, Kt. Aargau) gehören, und stellt die Generationenfolge übersichtlich dar. Mögliche Nachfragen: «Mehr Informationen zu Franz Ineichen suchen» oder «Fotos und Filme zum Sentenhof und zur bzw. von Familien Ineichen suchen»</p>',
    holdings_h: "Welche Online-Ressourcen sind durchsuchbar?",
    holdings: '<table><thead><tr><th>Bestand</th><th>Inhalt</th></tr></thead><tbody>'
        + '<tr><td><strong>Personen</strong></td><td>Biografische Einträge zu Akteurinnen und Akteuren der ländlichen Gesellschaft: Lebensdaten, Funktionen, verwandtschaftliche Beziehungen, Quellenhinweise</td></tr>'
        + '<tr><td><strong>Institutionen</strong></td><td>Einträge zu Verbänden, Genossenschaften, Behörden und weitere Organisationen aus dem Agrar- und Ernährungsbereich</td></tr>'
        + '<tr><td><strong>Betriebe</strong></td><td>Einträge zu landwirtschaftliche Betrieben</td></tr>'
        + '<tr><td><strong>Foto &amp; Film</strong></td><td>Einträge zu audiovisuellen Quellen: Fotografien und Filme</td></tr>'
        + '<tr><td><strong>Digitale Editionen</strong></td><td>Drei edigitale Editionen mit Texten von und zu Mina Hofstetter, Augusta Gillabert-Randin und Elizabeth Bobbett</td></tr>'
        + '<tr><td><strong>Archivbestände</strong></td><td>Verzeichnungsdaten der Archivbestände des AfA</td></tr>'
        + '<tr><td><strong>Publikationen &amp; Medienberichte</strong></td><td>Publikation aus dem AfA und über das AfA</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem">Die Online-Ressourcen liegen in einer der drei folgenden Sprachen vor: Deutsch, Französisch, Englisch.</p>',
    setup_h: "Einrichten in drei Schritten",
    setup_steps: '<ol><li><strong>KI-Client auswählen.</strong> Sie benötigen einen Zugang bspw. zu Claude (claude.ai oder Desktop-App), ChatGPT (Plus/Team/Enterprise), Perplexity Pro oder einer Entwicklungsumgebung wie Cursor oder VS Code.</li><li><strong>Server verbinden (Konnektor hinzufügen, App hinzufügen).</strong> Tragen Sie die Adresse des Endpoints <code>https://mcp.histoirerurale.ch/mcp</code> als MCP-Server ein. Die genauen Schritte unterscheiden sich je nach Client, siehe die Anleitungen im nächsten Abschnitt.</li><li><strong>Start.</strong> Stellen Sie Ihre erste Rechercheanfrage in natürlicher Sprache. Eine Suchsyntax kann zusätzlich verwendet werden.</li></ol>',
    examples_h: 'Werkzeuge des MCP-Servers',
    tips_h: 'Nutzung des MCP-Servers',
    tips: '<ul><li><strong>Iterativ arbeiten.</strong> Beginnen Sie mit einer breit gefassten Anfrage und verengen Sie diese erst in einem zweiten Schritt: erst «Landfrauenverbände», dann «nur Kanton Bern», dann «Volltext von Eintrag X».</li><li><strong>Nach Querverweisen fragen.</strong> Insbesondere im Portal «Personen und Institutionen» sind die Einträge untereinander vernetzt (Verwandtschaft, Mitgliedschaften, Vorgänger und Nachfolger von Funktionärinnen und Funktionären, etc.). Fragen Sie nach diesen Verbindungen: «Welche weiteren Personen sind mit dem Eintrag Schnyder, Bertha (1887-1968)--DB3219 verknüpft?»</li><li><strong>Mehrsprachig suchen.</strong> Die Online-Ressourcen sind mehrsprachig, Prompts können wie folgt ergänzt werden: «Suche auch auf Englisch und Französisch».</li><li><strong>Quellen verifizieren.</strong> Für Zitate immer den Quell-Eintrag über die mitgelieferte Live-URL (<code>recherche2.histoirerurale.ch</code>) bzw. den dort angebebenen Zitiervorschlag angeben.</li><li><strong>Scope berücksichtigen.</strong> Der Client findet nur Texte, die im AGHIST-Portal hinterlegt sind.</li><li><strong>Suchwege des Clients nachvollziehen.</strong> Viele Clients zeigen im Chatverlauf an, welche Suchanfragen sie tatsächlich ausgeführt haben (meist als aufklappbare Blöcke wie «Used afa-recherche search»). Konsultieren Sie diese Suchprotokolle, um die Abfrage etwas besser nachvollziehen zu können. So sehen Sie, mit welchen Begriffen und Filtern gesucht wurde, und Sie können u.U. erkennen, ob eine Recherche zu eng oder zu breit angelegt war. Die Zusammenfassung des Clients ist nicht dasselbe wie das Suchergebnis.</li></ul>',
    reliability_h: "Reproduzierbarkeit der Abfrageergebnisse",
    reliability: '<p>KI-Clients sind ein (mehr oder weniger zuverlässiges) Recherchewerkzeug, keine Quelle. Testen Sie auch deshalb die :</p><p><strong>Reproduzierbarkeit:</strong> der Resultate: Stellen Sie dieselbe Frage zweimal (das zweite Mal u.U. im Inkognito-Modus), kann der Assistent unterschiedliche Suchanfragen an den MCP-Server formulieren, andere Treffer auswählen und zu anderen Schwerpunkten in der Zusammenfassung kommen. Was Sie heute finden, findet eine andere Person morgen mit derselben Frage vielleicht nicht. Die Dokument-IDs und die Links zu den Quell-Einträgen sind stabil und zitierfähig, der Chatverlauf ist es nicht.</p><p><strong>Was hilft.</strong> Je enger geführt die Eingabe ist, desto eher kann das Ergebnis reproduziert werden. Eine Frage in natürlicher Sprache lässt dem Client viel Spielraum bei der Auswahl der Werkzeuge, der Suchbegriffe und der Filter). Ein explizit notierter Suchaufruf wie <code>search_entities({"entity_type": "person", "query": "Ineichen"})</code> legt diese Entscheidungen fest und liefert bei unverändertem Datenbestand auf dem MCP-Server dieselben Treffer. Empfehlung: Für die Nachvollziehbarkeit den tatsächlich ausgeführten Suchaufruf aus dem Chatverlauf kopieren und dokumentieren.</p><p>Wer volle Reproduzierbarkeit braucht, ruft die Schnittstelle direkt per Skript auf (siehe technische Dokumentation).</p><p>Kurz: Der Client ersetzt die Suchmaske, nicht die Prüfung und Würdigung der Quelle.</p>',
    techref_h: "Technische Dokumentation",
    techref_p: 'Dieser Abschnitt richtet sich an Entwicklerinnen und Entwickler sowie an alle, die genauer erfahren möchten, wie der Client auf dem MCP-Server sucht.',
    endpoint_h: "MCP-Endpoint",
    endpoint_p: 'Transport: <em>Streamable HTTP</em>. Authentifizierung: keine. In MCP-fähigen Clients als Remote-Server mit dieser URL eintragen.',
    direct_h: "Direktzugriff ohne KI",
    direct_intro: '<p>Für technisch interessierte Nutzerinnen und Nutzer ist der MCP-Server auch ohne KI-Assistent nutzbar, ähnlich wie eine herkömmliche Schnittstelle (API). MCP basiert auf JSON-RPC über HTTP: Jedes Werkzeug lässt sich direkt aufrufen, etwa per <code>curl</code> oder aus einem Skript (siehe «eigene MCP-Clients»). Das ist der Weg zu voller Reproduzierbarkeit: gleicher Aufruf, gleiche Treffer, kein zwischengeschaltetes Sprachmodell.</p>',
    direct_notes: '<p>Die Antwort enthält die Trefferliste als JSON im Feld <code>result.content[0].text</code>. Zwei Hinweise: Der <code>Accept</code>-Header muss beide Inhaltstypen nennen (<code>application/json, text/event-stream</code>), sonst lehnt der Server die Anfrage ab. Und der sonst übliche <code>initialize</code>-Handshake des MCP-Protokolls entfällt, weil der Server zustandslos betrieben wird; einzelne Aufrufe funktionieren direkt. Damit eignet sich der Server auch für reine Datenabfragen: Trefferzahlen über Bestände vergleichen, Editionen systematisch abfragen oder Ergebnisse in eigene Werkzeuge einbinden.</p>',
    integration_h: 'Clients: Integration in LLMs und weitere Softwares',
    integration_p: 'Klicken Sie unten auf den jeweiligen Client für die detaillierte Anleitung.',
    claude_web: '<strong>claude.ai (Web)</strong>: Settings → <em>Connectors</em> → <em>Add custom connector</em> → URL eintragen:',
    claude_desktop: '<strong>Claude Desktop</strong>: in <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> (macOS) bzw. <code>%APPDATA%\\Claude\\claude_desktop_config.json</code> (Windows) den Eintrag ergänzen:',
    claude_restart: "Claude Desktop danach neu starten.",
    chatgpt: 'In ChatGPT → Settings → <em>Connectors</em> → <em>Custom connectors</em> → <em>New connector</em>:',
    chatgpt_use: 'Den Connector im Chat per "+ Tools" aktivieren. Auch in Custom GPTs als Action / MCP-Server hinterlegbar.',
    cursor: 'In <code>~/.cursor/mcp.json</code> (oder <em>Settings → MCP → Add new MCP server</em>):',
    cursor_loads: "Cursor lädt die Konfiguration sofort, Tools erscheinen im Agent-Panel.",
    perplexity: 'In Perplexity → Settings → <em>Connectors</em> → <em>Add connector</em> → <em>MCP Server</em>:',
    perplexity_space: "In Spaces lässt sich der Connector pro Workspace aktivieren.",
    vscode: 'In <code>.vscode/mcp.json</code> im Workspace oder global über <em>MCP: Open User Configuration</em>:',
    vscode_use: 'Im Copilot-Chat-Panel <em>Agent-Mode</em> auswählen; die Tools stehen dann zur Verfügung.',
    cli_intro: "Einmaliger Aufruf in einem beliebigen Terminal:",
    cli_done: "Danach in jeder Claude-Code-Sitzung verfügbar.",
    custom_clients_h: "Eigene MCP-Clients (Python / TypeScript)",
    custom_py: 'Python mit dem offiziellen <code>mcp</code>-SDK:',
    custom_ts: 'TypeScript/Node mit <code>@modelcontextprotocol/sdk</code> analog: StreamableHTTPClientTransport mit derselben URL.',
    tools_h: "Werkzeuge",
    th_name: "Name",
    th_function: "Funktion",
    tool_search: "Volltext-Suche über alle Bestände, optional mit Hierarchie-Filter.",
    tool_search_entities: 'Personen, Institutionen oder Betriebe (Parameter <code>entity_type</code>).',
    tool_search_av: 'Foto- und Film-Bestände (optional auf <code>photos</code> / <code>films</code> einschränkbar).',
    tool_ed_hofstetter: "Edition Mina Hofstetter.",
    tool_ed_gr: "Edition Augusta Gillabert-Randin.",
    tool_ed_bobbett: "Edition Elizabeth Bobbett.",
    tool_fetch: "Einzelnes Dokument inkl. Volltext anhand seiner ID.",
    tool_list_h: "Hierarchie-Buckets mit Trefferzahlen.",
    tool_server_info: "Versions- und Endpunkt-Information.",
    tool_search_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String (Phrasen mit "…", <code>AND</code>/<code>OR</code>/<code>NOT</code>, Wildcards <code>*</code> und <code>?</code>).</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Bevorzugte Sprache für Titel/Highlight: <code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code>. Kein Filter; fällt auf andere Sprachen zurück.</td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>Treffer pro Seite (1–100).</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Cursor aus <code>next_cursor</code> der vorigen Antwort.</td></tr>'
        + '<tr><td><code>hierarchy</code></td><td>list[str]</td><td>-</td><td>Hierarchie-IDs zur Einschränkung (per OR verknüpft, aus <code>list_hierarchy</code>).</td></tr>'
        + '<tr><td><code>include_aggregations</code></td><td>bool</td><td>false</td><td>Hierarchie-Aggregation mitliefern.</td></tr>'
        + '</tbody></table>'
        + '<h3 style="margin-top:1rem">Rückgabe (SearchResponse)</h3>'
        + '<table><thead><tr><th>Feld</th><th>Typ</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>total</code></td><td>int</td><td>Gesamtzahl der Treffer (auch über <code>size</code> hinaus).</td></tr>'
        + '<tr><td><code>hits</code></td><td>list[SearchHit]</td><td>Trefferliste (max. <code>size</code> Einträge).</td></tr>'
        + '<tr><td><code>next_cursor</code></td><td>list | null</td><td>An <code>search_after</code> des nächsten Requests übergeben; <code>null</code> = keine weiteren Treffer.</td></tr>'
        + '<tr><td><code>aggregations</code></td><td>dict | null</td><td>Hierarchie-Buckets, nur bei <code>include_aggregations=true</code>.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>SearchHit-Felder:</strong> <code>id</code>, <code>title</code>, <code>abstract</code>, <code>text</code> (Highlight-Snippet), <code>meta</code>, <code>hierarchy</code> (Pfad), <code>collection</code> (Label), <code>date</code> (ISO, optional), <code>is_pdf</code>, <code>document_url</code> (Suchportal-Deep-Link), <code>original_url</code> (Quell-URL), <code>sort</code> (interner Cursor).</p>',
    tool_search_entities_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String.</td></tr>'
        + '<tr><td><code>entity_type</code></td><td>enum</td><td><code>any</code></td><td><code>person</code>|<code>institution</code>|<code>farm</code>|<code>any</code>. <code>company</code> bleibt als Deprecated-Alias für <code>farm</code> erhalten.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Paginierungs-Cursor.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>Rückgabe:</strong> <code>SearchResponse</code> (siehe <code>search</code>); Hits sind auf Personen/Institutionen/Betriebe eingeschränkt.</p>',
    tool_search_av_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String.</td></tr>'
        + '<tr><td><code>media_type</code></td><td>enum</td><td>-</td><td><code>photos</code> = nur Fotos, <code>films</code> = nur Filme; ohne Angabe beide.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Paginierungs-Cursor.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>Rückgabe:</strong> <code>SearchResponse</code> (siehe <code>search</code>); Hits sind auf Foto-/Filmbestände eingeschränkt.</p>',
    tool_edition_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Paginierungs-Cursor.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>Rückgabe:</strong> <code>SearchResponse</code> (siehe <code>search</code>); Hits sind auf die jeweilige Edition eingeschränkt.</p>',
    tool_fetch_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>id</code></td><td>str</td><td>erforderlich</td><td>Dokument-ID, z.B. <code>AfA_Personen_001_DB9920</code>. Aus dem <code>id</code>-Feld einer <code>search</code>-Antwort.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Bevorzugte Sprache für Titel/Text.</td></tr>'
        + '</tbody></table>'
        + '<h3 style="margin-top:1rem">Rückgabe (SearchHit, ohne Volltext)</h3>'
        + '<ul>'
        + '<li><strong>Metadaten:</strong> <code>id</code>, <code>title</code>, <code>abstract</code>, <code>meta</code>, <code>hierarchy</code> (Sammlungs-Pfad), <code>collection</code> (Label), <code>date</code> (ISO, optional), <code>is_pdf</code>.</li>'
        + '<li><code>document_url</code>: Link zur PDF- oder HTML-Datei im <strong>Suchportal</strong> (<code>recherche2.histoirerurale.ch</code>).</li>'
        + '<li><code>original_url</code>: <strong>Deep-Link ins Quellportal</strong>, also die Website, von der der Scraper das Dokument geholt hat (z.B. <code>histoirerurale.ch</code>; kann je nach Bestand variieren).</li>'
        + '</ul>'
        + '<p><code>null</code>, wenn die ID nicht gefunden wird.</p>',
    tool_list_h_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Optionale Volltext-Anfrage.</td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>200</td><td>Maximale Anzahl Hierarchie-Einträge (1–10 000).</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Label-Sprache.</td></tr>'
        + '</tbody></table>'
        + '<h3 style="margin-top:1rem">Rückgabe (HierarchyResponse)</h3>'
        + '<table><thead><tr><th>Feld</th><th>Typ</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>entries</code></td><td>list[HierarchyEntry]</td><td>Pro Eintrag: <code>id</code> (Hierarchie-ID), <code>count</code> (Trefferanzahl), <code>label</code> (menschenlesbare Bezeichnung).</td></tr>'
        + '</tbody></table>',
    tool_server_info_params: '<p>Keine Parameter.</p>'
        + '<h3 style="margin-top:1rem">Rückgabe (dict)</h3>'
        + '<table><thead><tr><th>Feld</th><th>Typ</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>name</code></td><td>str</td><td>Server-Name (<code>afa-mcp</code>).</td></tr>'
        + '<tr><td><code>version</code></td><td>str</td><td>Semver.</td></tr>'
        + '<tr><td><code>elasticsearch_url</code></td><td>str</td><td>Upstream-URL des ES-Backends.</td></tr>'
        + '<tr><td><code>languages</code></td><td>list[str]</td><td><code>de</code>, <code>fr</code>, <code>it</code>, <code>en</code></td></tr>'
        + '<tr><td><code>sort_orders</code></td><td>list[str]</td><td>Akzeptierte Werte für <code>sort</code>.</td></tr>'
        + '<tr><td><code>hierarchy_constants</code></td><td>dict</td><td>Sprechende Konstanten (z.B. <code>PERSONS</code>, <code>EDITION_BOBBETT</code>) → Hierarchie-ID-Strings.</td></tr>'
        + '</tbody></table>',
    tools_note: 'Volltext-Suche und Hierarchie-Filter lassen sich beliebig kombinieren, z.B. <code>search(query="Bauernhof", hierarchy=["AfA_FotoFilm"])</code> für alle Bauernhof-Bilder. Mehrere Hierarchie-IDs werden mit OR verknüpft, mit der Volltext-Suche per AND.',
    discovery_h: "Discovery-Endpunkte",
    disc_mcp: "MCP-Server-Manifest",
    disc_card: "A2A Agent Card",
    disc_llms: "LLM-/Crawler-freundliche Beschreibung",
    footer: 'Recherche-Portal: <a href="https://www.recherche2.histoirerurale.ch">recherche2.histoirerurale.ch</a> · Trägerinstitution: <a href="https://histoirerurale.ch">Archiv für Agrargeschichte</a> · Quellcode: <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server">GitHub</a>',
    poweredby: 'powered by <a href="https://histoirerurale.ch">AfA</a> und <a href="https://www.pansoft.de/">Pansoft</a>'
  },
  fr: {
    nav_intro: 'Introduction',
    call_intro: 'Für diese Anfrage ruft der Assistent dieses Werkzeug auf:',
    more_tools_h: 'Autres outils',
    tools_intro: '<p>Comment utiliser le serveur MCP:<br>En l\'absence d\'instructions spécifiques, le client IA calcule la réponse à l\'aide de tous les outils.</p>',
    ex1_h: 'Recherche de personnes',
    ex1_q: '“« Effectue une recherche sur le serveur AGHIST-MCP pour trouver les Landräte du canton de Nidwald et présente les résultats dans un tableau Excel comportant les colonnes suivantes: nom, prénom, numéro AfA, date de naissance, date de décès et années de mandat. »”»',
    ex1_tool: 'Outil recherche de personnes',
    ex2_h: 'Recherche d\'institutions',
    ex2_q: '« Effectuer une recherche sur le serveur AGHIST-MCP concernant les associations de femmes rurales et d\'agricultrices en Suisse. Comment celles-ci sont-elles organisées aujourd’hui au niveau national? Dans quelle mesure cela a-t-il évolué au fil du temps? Présentez vos résultats sous forme d’un diagramme approprié.»',
    ex2_tool: 'Outil recherche d\'institutions',
    ex3_h: 'Recherche de photos et de films',
    ex3_q: '« Existe-t-il des photographies et des films sur la mécanisation (mais pas la motorisation) de l’agriculture au cours de la première moitié du XXe siècle ? Dressez une liste comprenant le titre et l’URL directe vers l’entrée.»',
    ex3_tool: 'Outil recherche de photos et de films',
    ex4_h: 'Editions numériques',
    ex4_q: '«Parcourez l’édition Gillabert-Randin à la recherche de passages sur le droit de vote des femmes et citez-les.»',
    ex4_tool: 'Outils éditions numériques',
    ex5_h: 'Consulter le texte intégral des entrées',
    ex5_q: '«Récupérer le texte intégral de l’entrée concernant Ineichen, Franz (1887-1953) -- DB1734 et indique-moi les références bibliographiques qui y figurent.»',
    ex5_tool: 'Volltext von Einträgen konsultieren Werkzeug',
    nav_clients: 'Clients',
    nav_examples: 'Outils',
    nav_tips: 'Utilisation',
    nav_reliability: 'Reproductibilité',
    nav_reference: 'Informations techniques',
    brand: "Archives de l'histoire rurale",
    subtitle: "Interface MCP vers le portail de recherche AGHIST des Archives de l'histoire rurale",
    intro: 'AGHIST permet d’effectuer une recherche syntaxique (textuelle) dans le <a href="https://www.recherche2.histoirerurale.ch">portail de recherche</a> des <a href="https://histoirerurale.ch ">Archives d’histoire agricole</a> : la recherche porte sur l’ensemble des ressources en ligne mises à disposition gratuitement et ouvertement par les Archives d’histoire agricole. Il s’agit de plus de 15 000 entrées concernant des personnes, de plus de 1 200 entrées concernant des institutions, fiches sur des exploitations agricoles, des fiches sur des sources audiovisuelles et sur les données d’inventaire des fonds d’archives, ainsi que des éditions numériques et des publications provenant des Archives d’histoire agricole (AfA) ou les concernant. Via le serveur MCP (Model Context Protocol, Streamable HTTP), ces ressources en ligne sont directement accessibles depuis Claude, ChatGPT, Cursor, Perplexity et d’autres clients compatibles MCP',
    guide_h: "Comment fonctionne la recherche",
    guide_p: '<p>Une fois le connecteur vers le serveur MCP configuré, la connexion établie et la recherche activée, formulez vos requêtes en langage naturel: le client explore les ressources des AHR en ligne, combine les requêtes, suit les références croisées et synthétise les résultats. Par exemple:</p>'
        + '<blockquote>«Recherche exclusivement sur le serveur MCP AGHIST des Archives de l\'histoire rurale les personnes portant le nom d\'Ineichen.»</blockquote>'
        + '<p>Der Client findet 79 Personen und erkennt, dass viele davon zur Familie Ineichen des Sentenhofs (Muri, Kt. Aargau) gehören, und stellt die Generationenfolge übersichtlich dar. Mögliche Nachfragen: «Mehr Informationen zu Franz Ineichen suchen» oder «Fotos und Filme zum Sentenhof und zur bzw. von Familien Ineichen suchen»</p>',
    holdings_h: "Welche Online-Ressourcen sind durchsuchbar?",
    holdings: '<table><thead><tr><th>Bestand</th><th>Inhalt</th></tr></thead><tbody>'
        + '<tr><td><strong>Personen</strong></td><td>Biografische Einträge zu Akteurinnen und Akteuren der ländlichen Gesellschaft: Lebensdaten, Funktionen, verwandtschaftliche Beziehungen, Quellenhinweise</td></tr>'
        + '<tr><td><strong>Institutionen</strong></td><td>Einträge zu Verbänden, Genossenschaften, Behörden und weitere Organisationen aus dem Agrar- und Ernährungsbereich</td></tr>'
        + '<tr><td><strong>Betriebe</strong></td><td>Einträge zu landwirtschaftliche Betrieben</td></tr>'
        + '<tr><td><strong>Foto &amp; Film</strong></td><td>Einträge zu audiovisuellen Quellen: Fotografien und Filme</td></tr>'
        + '<tr><td><strong>Digitale Editionen</strong></td><td>Drei edigitale Editionen mit Texten von und zu Mina Hofstetter, Augusta Gillabert-Randin und Elizabeth Bobbett</td></tr>'
        + '<tr><td><strong>Archivbestände</strong></td><td>Verzeichnungsdaten der Archivbestände des AfA</td></tr>'
        + '<tr><td><strong>Publikationen &amp; Medienberichte</strong></td><td>Publikation aus dem AfA und über das AfA</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem">Die Online-Ressourcen liegen in einer der drei folgenden Sprachen vor: Deutsch, Französisch, Englisch.</p>',
    setup_h: "Einrichten in drei Schritten",
    setup_steps: '<ol><li><strong>KI-Client auswählen.</strong> Sie benötigen einen Zugang bspw. zu Claude (claude.ai oder Desktop-App), ChatGPT (Plus/Team/Enterprise), Perplexity Pro oder einer Entwicklungsumgebung wie Cursor oder VS Code.</li><li><strong>Server verbinden (Konnektor hinzufügen, App hinzufügen).</strong> Tragen Sie die Adresse des Endpoints <code>https://mcp.histoirerurale.ch/mcp</code> als MCP-Server ein. Die genauen Schritte unterscheiden sich je nach Client, siehe die Anleitungen im nächsten Abschnitt.</li><li><strong>Start.</strong> Stellen Sie Ihre erste Rechercheanfrage in natürlicher Sprache. Eine Suchsyntax kann zusätzlich verwendet werden.</li></ol>',
    examples_h: 'Werkzeuge des MCP-Servers',
    tips_h: 'Nutzung des MCP-Servers',
    tips: '<ul><li><strong>Iterativ arbeiten.</strong> Beginnen Sie mit einer breit gefassten Anfrage und verengen Sie diese erst in einem zweiten Schritt: erst «Landfrauenverbände», dann «nur Kanton Bern», dann «Volltext von Eintrag X».</li><li><strong>Nach Querverweisen fragen.</strong> Insbesondere im Portal «Personen und Institutionen» sind die Einträge untereinander vernetzt (Verwandtschaft, Mitgliedschaften, Vorgänger und Nachfolger von Funktionärinnen und Funktionären, etc.). Fragen Sie nach diesen Verbindungen: «Welche weiteren Personen sind mit dem Eintrag Schnyder, Bertha (1887-1968)--DB3219 verknüpft?»</li><li><strong>Mehrsprachig suchen.</strong> Die Online-Ressourcen sind mehrsprachig, Prompts können wie folgt ergänzt werden: «Suche auch auf Englisch und Französisch».</li><li><strong>Quellen verifizieren.</strong> Für Zitate immer den Quell-Eintrag über die mitgelieferte Live-URL (<code>recherche2.histoirerurale.ch</code>) bzw. den dort angebebenen Zitiervorschlag angeben.</li><li><strong>Scope berücksichtigen.</strong> Der Client findet nur Texte, die im AGHIST-Portal hinterlegt sind.</li><li><strong>Suchwege des Clients nachvollziehen.</strong> Viele Clients zeigen im Chatverlauf an, welche Suchanfragen sie tatsächlich ausgeführt haben (meist als aufklappbare Blöcke wie «Used afa-recherche search»). Konsultieren Sie diese Suchprotokolle, um die Abfrage etwas besser nachvollziehen zu können. So sehen Sie, mit welchen Begriffen und Filtern gesucht wurde, und Sie können u.U. erkennen, ob eine Recherche zu eng oder zu breit angelegt war. Die Zusammenfassung des Clients ist nicht dasselbe wie das Suchergebnis.</li></ul>',
    reliability_h: "Reproduzierbarkeit der Abfrageergebnisse",
    reliability: '<p>KI-Clients sind ein (mehr oder weniger zuverlässiges) Recherchewerkzeug, keine Quelle. Testen Sie auch deshalb die :</p><p><strong>Reproduzierbarkeit:</strong> der Resultate: Stellen Sie dieselbe Frage zweimal (das zweite Mal u.U. im Inkognito-Modus), kann der Assistent unterschiedliche Suchanfragen an den MCP-Server formulieren, andere Treffer auswählen und zu anderen Schwerpunkten in der Zusammenfassung kommen. Was Sie heute finden, findet eine andere Person morgen mit derselben Frage vielleicht nicht. Die Dokument-IDs und die Links zu den Quell-Einträgen sind stabil und zitierfähig, der Chatverlauf ist es nicht.</p><p><strong>Was hilft.</strong> Je enger geführt die Eingabe ist, desto eher kann das Ergebnis reproduziert werden. Eine Frage in natürlicher Sprache lässt dem Client viel Spielraum bei der Auswahl der Werkzeuge, der Suchbegriffe und der Filter). Ein explizit notierter Suchaufruf wie <code>search_entities({"entity_type": "person", "query": "Ineichen"})</code> legt diese Entscheidungen fest und liefert bei unverändertem Datenbestand auf dem MCP-Server dieselben Treffer. Empfehlung: Für die Nachvollziehbarkeit den tatsächlich ausgeführten Suchaufruf aus dem Chatverlauf kopieren und dokumentieren.</p><p>Wer volle Reproduzierbarkeit braucht, ruft die Schnittstelle direkt per Skript auf (siehe technische Dokumentation).</p><p>Kurz: Der Client ersetzt die Suchmaske, nicht die Prüfung und Würdigung der Quelle.</p>',
    techref_h: "Technische Dokumentation",
    techref_p: 'Dieser Abschnitt richtet sich an Entwicklerinnen und Entwickler sowie an alle, die genauer erfahren möchten, wie der Client auf dem MCP-Server sucht.',
    endpoint_h: "MCP-Endpoint",
    endpoint_p: 'Transport: <em>Streamable HTTP</em>. Authentifizierung: keine. In MCP-fähigen Clients als Remote-Server mit dieser URL eintragen.',
    direct_h: "Direktzugriff ohne KI",
    direct_intro: '<p>Für technisch interessierte Nutzerinnen und Nutzer ist der MCP-Server auch ohne KI-Assistent nutzbar, ähnlich wie eine herkömmliche Schnittstelle (API). MCP basiert auf JSON-RPC über HTTP: Jedes Werkzeug lässt sich direkt aufrufen, etwa per <code>curl</code> oder aus einem Skript (siehe «eigene MCP-Clients»). Das ist der Weg zu voller Reproduzierbarkeit: gleicher Aufruf, gleiche Treffer, kein zwischengeschaltetes Sprachmodell.</p>',
    direct_notes: '<p>Die Antwort enthält die Trefferliste als JSON im Feld <code>result.content[0].text</code>. Zwei Hinweise: Der <code>Accept</code>-Header muss beide Inhaltstypen nennen (<code>application/json, text/event-stream</code>), sonst lehnt der Server die Anfrage ab. Und der sonst übliche <code>initialize</code>-Handshake des MCP-Protokolls entfällt, weil der Server zustandslos betrieben wird; einzelne Aufrufe funktionieren direkt. Damit eignet sich der Server auch für reine Datenabfragen: Trefferzahlen über Bestände vergleichen, Editionen systematisch abfragen oder Ergebnisse in eigene Werkzeuge einbinden.</p>',
    integration_h: 'Clients: Integration in LLMs und weitere Softwares',
    integration_p: 'Klicken Sie unten auf den jeweiligen Client für die detaillierte Anleitung.',
    claude_web: '<strong>claude.ai (Web)</strong>: Settings → <em>Connectors</em> → <em>Add custom connector</em> → URL eintragen:',
    claude_desktop: '<strong>Claude Desktop</strong>: in <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> (macOS) bzw. <code>%APPDATA%\\Claude\\claude_desktop_config.json</code> (Windows) den Eintrag ergänzen:',
    claude_restart: "Claude Desktop danach neu starten.",
    chatgpt: 'In ChatGPT → Settings → <em>Connectors</em> → <em>Custom connectors</em> → <em>New connector</em>:',
    chatgpt_use: 'Den Connector im Chat per "+ Tools" aktivieren. Auch in Custom GPTs als Action / MCP-Server hinterlegbar.',
    cursor: 'In <code>~/.cursor/mcp.json</code> (oder <em>Settings → MCP → Add new MCP server</em>):',
    cursor_loads: "Cursor lädt die Konfiguration sofort, Tools erscheinen im Agent-Panel.",
    perplexity: 'In Perplexity → Settings → <em>Connectors</em> → <em>Add connector</em> → <em>MCP Server</em>:',
    perplexity_space: "In Spaces lässt sich der Connector pro Workspace aktivieren.",
    vscode: 'In <code>.vscode/mcp.json</code> im Workspace oder global über <em>MCP: Open User Configuration</em>:',
    vscode_use: 'Im Copilot-Chat-Panel <em>Agent-Mode</em> auswählen; die Tools stehen dann zur Verfügung.',
    cli_intro: "Einmaliger Aufruf in einem beliebigen Terminal:",
    cli_done: "Danach in jeder Claude-Code-Sitzung verfügbar.",
    custom_clients_h: "Eigene MCP-Clients (Python / TypeScript)",
    custom_py: 'Python mit dem offiziellen <code>mcp</code>-SDK:',
    custom_ts: 'TypeScript/Node mit <code>@modelcontextprotocol/sdk</code> analog: StreamableHTTPClientTransport mit derselben URL.',
    tools_h: "Werkzeuge",
    th_name: "Name",
    th_function: "Funktion",
    tool_search: "Volltext-Suche über alle Bestände, optional mit Hierarchie-Filter.",
    tool_search_entities: 'Personen, Institutionen oder Betriebe (Parameter <code>entity_type</code>).',
    tool_search_av: 'Foto- und Film-Bestände (optional auf <code>photos</code> / <code>films</code> einschränkbar).',
    tool_ed_hofstetter: "Edition Mina Hofstetter.",
    tool_ed_gr: "Edition Augusta Gillabert-Randin.",
    tool_ed_bobbett: "Edition Elizabeth Bobbett.",
    tool_fetch: "Einzelnes Dokument inkl. Volltext anhand seiner ID.",
    tool_list_h: "Hierarchie-Buckets mit Trefferzahlen.",
    tool_server_info: "Versions- und Endpunkt-Information.",
    tool_search_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String (Phrasen mit "…", <code>AND</code>/<code>OR</code>/<code>NOT</code>, Wildcards <code>*</code> und <code>?</code>).</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Bevorzugte Sprache für Titel/Highlight: <code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code>. Kein Filter; fällt auf andere Sprachen zurück.</td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>Treffer pro Seite (1–100).</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Cursor aus <code>next_cursor</code> der vorigen Antwort.</td></tr>'
        + '<tr><td><code>hierarchy</code></td><td>list[str]</td><td>-</td><td>Hierarchie-IDs zur Einschränkung (per OR verknüpft, aus <code>list_hierarchy</code>).</td></tr>'
        + '<tr><td><code>include_aggregations</code></td><td>bool</td><td>false</td><td>Hierarchie-Aggregation mitliefern.</td></tr>'
        + '</tbody></table>'
        + '<h3 style="margin-top:1rem">Rückgabe (SearchResponse)</h3>'
        + '<table><thead><tr><th>Feld</th><th>Typ</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>total</code></td><td>int</td><td>Gesamtzahl der Treffer (auch über <code>size</code> hinaus).</td></tr>'
        + '<tr><td><code>hits</code></td><td>list[SearchHit]</td><td>Trefferliste (max. <code>size</code> Einträge).</td></tr>'
        + '<tr><td><code>next_cursor</code></td><td>list | null</td><td>An <code>search_after</code> des nächsten Requests übergeben; <code>null</code> = keine weiteren Treffer.</td></tr>'
        + '<tr><td><code>aggregations</code></td><td>dict | null</td><td>Hierarchie-Buckets, nur bei <code>include_aggregations=true</code>.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>SearchHit-Felder:</strong> <code>id</code>, <code>title</code>, <code>abstract</code>, <code>text</code> (Highlight-Snippet), <code>meta</code>, <code>hierarchy</code> (Pfad), <code>collection</code> (Label), <code>date</code> (ISO, optional), <code>is_pdf</code>, <code>document_url</code> (Suchportal-Deep-Link), <code>original_url</code> (Quell-URL), <code>sort</code> (interner Cursor).</p>',
    tool_search_entities_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String.</td></tr>'
        + '<tr><td><code>entity_type</code></td><td>enum</td><td><code>any</code></td><td><code>person</code>|<code>institution</code>|<code>farm</code>|<code>any</code>. <code>company</code> bleibt als Deprecated-Alias für <code>farm</code> erhalten.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Paginierungs-Cursor.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>Rückgabe:</strong> <code>SearchResponse</code> (siehe <code>search</code>); Hits sind auf Personen/Institutionen/Betriebe eingeschränkt.</p>',
    tool_search_av_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String.</td></tr>'
        + '<tr><td><code>media_type</code></td><td>enum</td><td>-</td><td><code>photos</code> = nur Fotos, <code>films</code> = nur Filme; ohne Angabe beide.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Paginierungs-Cursor.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>Rückgabe:</strong> <code>SearchResponse</code> (siehe <code>search</code>); Hits sind auf Foto-/Filmbestände eingeschränkt.</p>',
    tool_edition_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Paginierungs-Cursor.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>Rückgabe:</strong> <code>SearchResponse</code> (siehe <code>search</code>); Hits sind auf die jeweilige Edition eingeschränkt.</p>',
    tool_fetch_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>id</code></td><td>str</td><td>erforderlich</td><td>Dokument-ID, z.B. <code>AfA_Personen_001_DB9920</code>. Aus dem <code>id</code>-Feld einer <code>search</code>-Antwort.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Bevorzugte Sprache für Titel/Text.</td></tr>'
        + '</tbody></table>'
        + '<h3 style="margin-top:1rem">Rückgabe (SearchHit, ohne Volltext)</h3>'
        + '<ul>'
        + '<li><strong>Metadaten:</strong> <code>id</code>, <code>title</code>, <code>abstract</code>, <code>meta</code>, <code>hierarchy</code> (Sammlungs-Pfad), <code>collection</code> (Label), <code>date</code> (ISO, optional), <code>is_pdf</code>.</li>'
        + '<li><code>document_url</code>: Link zur PDF- oder HTML-Datei im <strong>Suchportal</strong> (<code>recherche2.histoirerurale.ch</code>).</li>'
        + '<li><code>original_url</code>: <strong>Deep-Link ins Quellportal</strong>, also die Website, von der der Scraper das Dokument geholt hat (z.B. <code>histoirerurale.ch</code>; kann je nach Bestand variieren).</li>'
        + '</ul>'
        + '<p><code>null</code>, wenn die ID nicht gefunden wird.</p>',
    tool_list_h_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Optionale Volltext-Anfrage.</td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>200</td><td>Maximale Anzahl Hierarchie-Einträge (1–10 000).</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Label-Sprache.</td></tr>'
        + '</tbody></table>'
        + '<h3 style="margin-top:1rem">Rückgabe (HierarchyResponse)</h3>'
        + '<table><thead><tr><th>Feld</th><th>Typ</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>entries</code></td><td>list[HierarchyEntry]</td><td>Pro Eintrag: <code>id</code> (Hierarchie-ID), <code>count</code> (Trefferanzahl), <code>label</code> (menschenlesbare Bezeichnung).</td></tr>'
        + '</tbody></table>',
    tool_server_info_params: '<p>Keine Parameter.</p>'
        + '<h3 style="margin-top:1rem">Rückgabe (dict)</h3>'
        + '<table><thead><tr><th>Feld</th><th>Typ</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>name</code></td><td>str</td><td>Server-Name (<code>afa-mcp</code>).</td></tr>'
        + '<tr><td><code>version</code></td><td>str</td><td>Semver.</td></tr>'
        + '<tr><td><code>elasticsearch_url</code></td><td>str</td><td>Upstream-URL des ES-Backends.</td></tr>'
        + '<tr><td><code>languages</code></td><td>list[str]</td><td><code>de</code>, <code>fr</code>, <code>it</code>, <code>en</code></td></tr>'
        + '<tr><td><code>sort_orders</code></td><td>list[str]</td><td>Akzeptierte Werte für <code>sort</code>.</td></tr>'
        + '<tr><td><code>hierarchy_constants</code></td><td>dict</td><td>Sprechende Konstanten (z.B. <code>PERSONS</code>, <code>EDITION_BOBBETT</code>) → Hierarchie-ID-Strings.</td></tr>'
        + '</tbody></table>',
    tools_note: 'Volltext-Suche und Hierarchie-Filter lassen sich beliebig kombinieren, z.B. <code>search(query="Bauernhof", hierarchy=["AfA_FotoFilm"])</code> für alle Bauernhof-Bilder. Mehrere Hierarchie-IDs werden mit OR verknüpft, mit der Volltext-Suche per AND.',
    discovery_h: "Discovery-Endpunkte",
    disc_mcp: "MCP-Server-Manifest",
    disc_card: "A2A Agent Card",
    disc_llms: "LLM-/Crawler-freundliche Beschreibung",
    footer: 'Recherche-Portal: <a href="https://www.recherche2.histoirerurale.ch">recherche2.histoirerurale.ch</a> · Trägerinstitution: <a href="https://histoirerurale.ch">Archiv für Agrargeschichte</a> · Quellcode: <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server">GitHub</a>',
    poweredby: 'powered by <a href="https://histoirerurale.ch">AfA</a> und <a href="https://www.pansoft.de/">Pansoft</a>'
  },
  it: {
    nav_intro: 'Einführung',
    call_intro: 'Für diese Anfrage ruft der Assistent dieses Werkzeug auf:',
    more_tools_h: 'Weitere Werkzeuge',
    tools_intro: '<p>So können Sie den MCP-Server benutzen:<br> Default portalübergreifend, spezifische Anfragen unten</p>',
    ex1_h: 'Personenrecherche',
    ex1_q: '«Suche auf dem AGHIST-MCP-Server nach Landräten im Kanton Nidwalden und stelle diese in einer Excel-Tabelle mit den Spalten Nachname, Vorname, AfA-Nummer, Geburtsdatum, Todesdatum und Amtsjahre dar.»',
    ex1_tool: 'Personenrecherche Werkzeug',
    ex2_h: 'Institutionensuche',
    ex2_q: '«Suche auf dem AGHIST-MCP-Server nach Landfrauen- und Bäuerinnenvereinigungen in der Schweiz. Wie sind diese heute auf nationaler Ebene organisiert? Inwiefern änderte sich dies im Laufe der Zeit? Darstellung in einem geeigneten Diagramm.»',
    ex2_tool: 'Institutionensuche Werkzeug',
    ex3_h: 'Suche nach Fotos und Filmen',
    ex3_q: '«Gibt es Fotografien und Filme zur Mechanisierung (aber nicht Motorisierung) der Landwirtschaft in der ersten Hälfte des 20. Jahrhunderts? Erstelle eine Liste mit Titel und Live-URL zum Eintrag.»',
    ex3_tool: 'Suche nach Fotos und Filmen Werkzeug',
    ex4_h: 'Digitale Editionen',
    ex4_q: '«Durchsuche die Edition Gillabert-Randin nach Textstellen zum Frauenstimmrecht und zitiere diese.»',
    ex4_tool: 'Digitale Editionen Werkzeug',
    ex5_h: 'Volltext von Einträgen konsultieren',
    ex5_q: '«Hol den Volltext des Eintrags zu Ineichen, Franz (1887-1953)--DB1734 und nenne mir die dort angegebenen Quellenangaben.»',
    ex5_tool: 'Volltext von Einträgen konsultieren Werkzeug',
    nav_clients: 'Clients',
    nav_examples: 'Werkzeuge',
    nav_tips: 'Nutzung',
    nav_reliability: 'Verlässlichkeit',
    nav_reference: 'Technisches',
    brand: "Archiv für Agrargeschichte",
    subtitle: "MCP-Schnittstelle zum AGHIST-Suchportal des Archivs für Agrargeschichte",
    intro: 'AGHIST ermöglicht eine syntaktische (textuelle) Suche im <a href="https://www.recherche2.histoirerurale.ch">Recherche-Portal</a> des <a href="https://histoirerurale.ch">Archivs für Agrargeschichte</a>: Die Suche erfasst sämtliche Online-Ressourcen, die vom Archiv für Agrargeschichte öffentlich und unentgeltlich zur Verfügung gestellt werden. Es handelt sich um mehr als 15.000 Einträge zu Personen, mehr als 1.200 Einträge zu Institutionen, Einträge zu landwirtschaftlichen Betrieben, Einträgen zu audio-visuelle Quellen und zu Verzeichnungsdaten von Archivbeständen sowie digitale Editionen und Publikationen aus dem AfA und über das AfA. Über den MCP-Server (Model Context Protocol, Streamable HTTP) sind diese Online-Ressourcen direkt aus Claude, ChatGPT, Cursor, Perplexity und anderen MCP-fähigen Clients ansprechbar.',
    guide_h: "So funktioniert die Recherche",
    guide_p: '<p>Ist der Konnektor zum MCP-Server eingerichtet und Verbindung hergestellt und für die Suche aktiviert, stellen Sie Recherchefragen in natürlicher Sprache: Der Client durchsucht die die Online-Ressourcen, kombiniert Suchanfragen, folgt Querverweisen und fasst die Ergebnisse zusammen. Zum Beispiel:</p>'
        + '<blockquote>«Suche ausschliesslich auf dem MCP-Server AGHIST des Archivs für Agrargeschichte nach Personen mit dem Namen Ineichen.»</blockquote>'
        + '<p>Der Client findet 79 Personen und erkennt, dass viele davon zur Familie Ineichen des Sentenhofs (Muri, Kt. Aargau) gehören, und stellt die Generationenfolge übersichtlich dar. Mögliche Nachfragen: «Mehr Informationen zu Franz Ineichen suchen» oder «Fotos und Filme zum Sentenhof und zur bzw. von Familien Ineichen suchen»</p>',
    holdings_h: "Welche Online-Ressourcen sind durchsuchbar?",
    holdings: '<table><thead><tr><th>Bestand</th><th>Inhalt</th></tr></thead><tbody>'
        + '<tr><td><strong>Personen</strong></td><td>Biografische Einträge zu Akteurinnen und Akteuren der ländlichen Gesellschaft: Lebensdaten, Funktionen, verwandtschaftliche Beziehungen, Quellenhinweise</td></tr>'
        + '<tr><td><strong>Institutionen</strong></td><td>Einträge zu Verbänden, Genossenschaften, Behörden und weitere Organisationen aus dem Agrar- und Ernährungsbereich</td></tr>'
        + '<tr><td><strong>Betriebe</strong></td><td>Einträge zu landwirtschaftliche Betrieben</td></tr>'
        + '<tr><td><strong>Foto &amp; Film</strong></td><td>Einträge zu audiovisuellen Quellen: Fotografien und Filme</td></tr>'
        + '<tr><td><strong>Digitale Editionen</strong></td><td>Drei edigitale Editionen mit Texten von und zu Mina Hofstetter, Augusta Gillabert-Randin und Elizabeth Bobbett</td></tr>'
        + '<tr><td><strong>Archivbestände</strong></td><td>Verzeichnungsdaten der Archivbestände des AfA</td></tr>'
        + '<tr><td><strong>Publikationen &amp; Medienberichte</strong></td><td>Publikation aus dem AfA und über das AfA</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem">Die Online-Ressourcen liegen in einer der drei folgenden Sprachen vor: Deutsch, Französisch, Englisch.</p>',
    setup_h: "Einrichten in drei Schritten",
    setup_steps: '<ol><li><strong>KI-Client auswählen.</strong> Sie benötigen einen Zugang bspw. zu Claude (claude.ai oder Desktop-App), ChatGPT (Plus/Team/Enterprise), Perplexity Pro oder einer Entwicklungsumgebung wie Cursor oder VS Code.</li><li><strong>Server verbinden (Konnektor hinzufügen, App hinzufügen).</strong> Tragen Sie die Adresse des Endpoints <code>https://mcp.histoirerurale.ch/mcp</code> als MCP-Server ein. Die genauen Schritte unterscheiden sich je nach Client, siehe die Anleitungen im nächsten Abschnitt.</li><li><strong>Start.</strong> Stellen Sie Ihre erste Rechercheanfrage in natürlicher Sprache. Eine Suchsyntax kann zusätzlich verwendet werden.</li></ol>',
    examples_h: 'Werkzeuge des MCP-Servers',
    tips_h: 'Nutzung des MCP-Servers',
    tips: '<ul><li><strong>Iterativ arbeiten.</strong> Beginnen Sie mit einer breit gefassten Anfrage und verengen Sie diese erst in einem zweiten Schritt: erst «Landfrauenverbände», dann «nur Kanton Bern», dann «Volltext von Eintrag X».</li><li><strong>Nach Querverweisen fragen.</strong> Insbesondere im Portal «Personen und Institutionen» sind die Einträge untereinander vernetzt (Verwandtschaft, Mitgliedschaften, Vorgänger und Nachfolger von Funktionärinnen und Funktionären, etc.). Fragen Sie nach diesen Verbindungen: «Welche weiteren Personen sind mit dem Eintrag Schnyder, Bertha (1887-1968)--DB3219 verknüpft?»</li><li><strong>Mehrsprachig suchen.</strong> Die Online-Ressourcen sind mehrsprachig, Prompts können wie folgt ergänzt werden: «Suche auch auf Englisch und Französisch».</li><li><strong>Quellen verifizieren.</strong> Für Zitate immer den Quell-Eintrag über die mitgelieferte Live-URL (<code>recherche2.histoirerurale.ch</code>) bzw. den dort angebebenen Zitiervorschlag angeben.</li><li><strong>Scope berücksichtigen.</strong> Der Client findet nur Texte, die im AGHIST-Portal hinterlegt sind.</li><li><strong>Suchwege des Clients nachvollziehen.</strong> Viele Clients zeigen im Chatverlauf an, welche Suchanfragen sie tatsächlich ausgeführt haben (meist als aufklappbare Blöcke wie «Used afa-recherche search»). Konsultieren Sie diese Suchprotokolle, um die Abfrage etwas besser nachvollziehen zu können. So sehen Sie, mit welchen Begriffen und Filtern gesucht wurde, und Sie können u.U. erkennen, ob eine Recherche zu eng oder zu breit angelegt war. Die Zusammenfassung des Clients ist nicht dasselbe wie das Suchergebnis.</li></ul>',
    reliability_h: "Reproduzierbarkeit der Abfrageergebnisse",
    reliability: '<p>KI-Clients sind ein (mehr oder weniger zuverlässiges) Recherchewerkzeug, keine Quelle. Testen Sie auch deshalb die :</p><p><strong>Reproduzierbarkeit:</strong> der Resultate: Stellen Sie dieselbe Frage zweimal (das zweite Mal u.U. im Inkognito-Modus), kann der Assistent unterschiedliche Suchanfragen an den MCP-Server formulieren, andere Treffer auswählen und zu anderen Schwerpunkten in der Zusammenfassung kommen. Was Sie heute finden, findet eine andere Person morgen mit derselben Frage vielleicht nicht. Die Dokument-IDs und die Links zu den Quell-Einträgen sind stabil und zitierfähig, der Chatverlauf ist es nicht.</p><p><strong>Was hilft.</strong> Je enger geführt die Eingabe ist, desto eher kann das Ergebnis reproduziert werden. Eine Frage in natürlicher Sprache lässt dem Client viel Spielraum bei der Auswahl der Werkzeuge, der Suchbegriffe und der Filter). Ein explizit notierter Suchaufruf wie <code>search_entities({"entity_type": "person", "query": "Ineichen"})</code> legt diese Entscheidungen fest und liefert bei unverändertem Datenbestand auf dem MCP-Server dieselben Treffer. Empfehlung: Für die Nachvollziehbarkeit den tatsächlich ausgeführten Suchaufruf aus dem Chatverlauf kopieren und dokumentieren.</p><p>Wer volle Reproduzierbarkeit braucht, ruft die Schnittstelle direkt per Skript auf (siehe technische Dokumentation).</p><p>Kurz: Der Client ersetzt die Suchmaske, nicht die Prüfung und Würdigung der Quelle.</p>',
    techref_h: "Technische Dokumentation",
    techref_p: 'Dieser Abschnitt richtet sich an Entwicklerinnen und Entwickler sowie an alle, die genauer erfahren möchten, wie der Client auf dem MCP-Server sucht.',
    endpoint_h: "MCP-Endpoint",
    endpoint_p: 'Transport: <em>Streamable HTTP</em>. Authentifizierung: keine. In MCP-fähigen Clients als Remote-Server mit dieser URL eintragen.',
    direct_h: "Direktzugriff ohne KI",
    direct_intro: '<p>Für technisch interessierte Nutzerinnen und Nutzer ist der MCP-Server auch ohne KI-Assistent nutzbar, ähnlich wie eine herkömmliche Schnittstelle (API). MCP basiert auf JSON-RPC über HTTP: Jedes Werkzeug lässt sich direkt aufrufen, etwa per <code>curl</code> oder aus einem Skript (siehe «eigene MCP-Clients»). Das ist der Weg zu voller Reproduzierbarkeit: gleicher Aufruf, gleiche Treffer, kein zwischengeschaltetes Sprachmodell.</p>',
    direct_notes: '<p>Die Antwort enthält die Trefferliste als JSON im Feld <code>result.content[0].text</code>. Zwei Hinweise: Der <code>Accept</code>-Header muss beide Inhaltstypen nennen (<code>application/json, text/event-stream</code>), sonst lehnt der Server die Anfrage ab. Und der sonst übliche <code>initialize</code>-Handshake des MCP-Protokolls entfällt, weil der Server zustandslos betrieben wird; einzelne Aufrufe funktionieren direkt. Damit eignet sich der Server auch für reine Datenabfragen: Trefferzahlen über Bestände vergleichen, Editionen systematisch abfragen oder Ergebnisse in eigene Werkzeuge einbinden.</p>',
    integration_h: 'Clients: Integration in LLMs und weitere Softwares',
    integration_p: 'Klicken Sie unten auf den jeweiligen Client für die detaillierte Anleitung.',
    claude_web: '<strong>claude.ai (Web)</strong>: Settings → <em>Connectors</em> → <em>Add custom connector</em> → URL eintragen:',
    claude_desktop: '<strong>Claude Desktop</strong>: in <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> (macOS) bzw. <code>%APPDATA%\\Claude\\claude_desktop_config.json</code> (Windows) den Eintrag ergänzen:',
    claude_restart: "Claude Desktop danach neu starten.",
    chatgpt: 'In ChatGPT → Settings → <em>Connectors</em> → <em>Custom connectors</em> → <em>New connector</em>:',
    chatgpt_use: 'Den Connector im Chat per "+ Tools" aktivieren. Auch in Custom GPTs als Action / MCP-Server hinterlegbar.',
    cursor: 'In <code>~/.cursor/mcp.json</code> (oder <em>Settings → MCP → Add new MCP server</em>):',
    cursor_loads: "Cursor lädt die Konfiguration sofort, Tools erscheinen im Agent-Panel.",
    perplexity: 'In Perplexity → Settings → <em>Connectors</em> → <em>Add connector</em> → <em>MCP Server</em>:',
    perplexity_space: "In Spaces lässt sich der Connector pro Workspace aktivieren.",
    vscode: 'In <code>.vscode/mcp.json</code> im Workspace oder global über <em>MCP: Open User Configuration</em>:',
    vscode_use: 'Im Copilot-Chat-Panel <em>Agent-Mode</em> auswählen; die Tools stehen dann zur Verfügung.',
    cli_intro: "Einmaliger Aufruf in einem beliebigen Terminal:",
    cli_done: "Danach in jeder Claude-Code-Sitzung verfügbar.",
    custom_clients_h: "Eigene MCP-Clients (Python / TypeScript)",
    custom_py: 'Python mit dem offiziellen <code>mcp</code>-SDK:',
    custom_ts: 'TypeScript/Node mit <code>@modelcontextprotocol/sdk</code> analog: StreamableHTTPClientTransport mit derselben URL.',
    tools_h: "Werkzeuge",
    th_name: "Name",
    th_function: "Funktion",
    tool_search: "Volltext-Suche über alle Bestände, optional mit Hierarchie-Filter.",
    tool_search_entities: 'Personen, Institutionen oder Betriebe (Parameter <code>entity_type</code>).',
    tool_search_av: 'Foto- und Film-Bestände (optional auf <code>photos</code> / <code>films</code> einschränkbar).',
    tool_ed_hofstetter: "Edition Mina Hofstetter.",
    tool_ed_gr: "Edition Augusta Gillabert-Randin.",
    tool_ed_bobbett: "Edition Elizabeth Bobbett.",
    tool_fetch: "Einzelnes Dokument inkl. Volltext anhand seiner ID.",
    tool_list_h: "Hierarchie-Buckets mit Trefferzahlen.",
    tool_server_info: "Versions- und Endpunkt-Information.",
    tool_search_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String (Phrasen mit "…", <code>AND</code>/<code>OR</code>/<code>NOT</code>, Wildcards <code>*</code> und <code>?</code>).</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Bevorzugte Sprache für Titel/Highlight: <code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code>. Kein Filter; fällt auf andere Sprachen zurück.</td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>Treffer pro Seite (1–100).</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Cursor aus <code>next_cursor</code> der vorigen Antwort.</td></tr>'
        + '<tr><td><code>hierarchy</code></td><td>list[str]</td><td>-</td><td>Hierarchie-IDs zur Einschränkung (per OR verknüpft, aus <code>list_hierarchy</code>).</td></tr>'
        + '<tr><td><code>include_aggregations</code></td><td>bool</td><td>false</td><td>Hierarchie-Aggregation mitliefern.</td></tr>'
        + '</tbody></table>'
        + '<h3 style="margin-top:1rem">Rückgabe (SearchResponse)</h3>'
        + '<table><thead><tr><th>Feld</th><th>Typ</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>total</code></td><td>int</td><td>Gesamtzahl der Treffer (auch über <code>size</code> hinaus).</td></tr>'
        + '<tr><td><code>hits</code></td><td>list[SearchHit]</td><td>Trefferliste (max. <code>size</code> Einträge).</td></tr>'
        + '<tr><td><code>next_cursor</code></td><td>list | null</td><td>An <code>search_after</code> des nächsten Requests übergeben; <code>null</code> = keine weiteren Treffer.</td></tr>'
        + '<tr><td><code>aggregations</code></td><td>dict | null</td><td>Hierarchie-Buckets, nur bei <code>include_aggregations=true</code>.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>SearchHit-Felder:</strong> <code>id</code>, <code>title</code>, <code>abstract</code>, <code>text</code> (Highlight-Snippet), <code>meta</code>, <code>hierarchy</code> (Pfad), <code>collection</code> (Label), <code>date</code> (ISO, optional), <code>is_pdf</code>, <code>document_url</code> (Suchportal-Deep-Link), <code>original_url</code> (Quell-URL), <code>sort</code> (interner Cursor).</p>',
    tool_search_entities_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String.</td></tr>'
        + '<tr><td><code>entity_type</code></td><td>enum</td><td><code>any</code></td><td><code>person</code>|<code>institution</code>|<code>farm</code>|<code>any</code>. <code>company</code> bleibt als Deprecated-Alias für <code>farm</code> erhalten.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Paginierungs-Cursor.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>Rückgabe:</strong> <code>SearchResponse</code> (siehe <code>search</code>); Hits sind auf Personen/Institutionen/Betriebe eingeschränkt.</p>',
    tool_search_av_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String.</td></tr>'
        + '<tr><td><code>media_type</code></td><td>enum</td><td>-</td><td><code>photos</code> = nur Fotos, <code>films</code> = nur Filme; ohne Angabe beide.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Paginierungs-Cursor.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>Rückgabe:</strong> <code>SearchResponse</code> (siehe <code>search</code>); Hits sind auf Foto-/Filmbestände eingeschränkt.</p>',
    tool_edition_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Paginierungs-Cursor.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>Rückgabe:</strong> <code>SearchResponse</code> (siehe <code>search</code>); Hits sind auf die jeweilige Edition eingeschränkt.</p>',
    tool_fetch_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>id</code></td><td>str</td><td>erforderlich</td><td>Dokument-ID, z.B. <code>AfA_Personen_001_DB9920</code>. Aus dem <code>id</code>-Feld einer <code>search</code>-Antwort.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Bevorzugte Sprache für Titel/Text.</td></tr>'
        + '</tbody></table>'
        + '<h3 style="margin-top:1rem">Rückgabe (SearchHit, ohne Volltext)</h3>'
        + '<ul>'
        + '<li><strong>Metadaten:</strong> <code>id</code>, <code>title</code>, <code>abstract</code>, <code>meta</code>, <code>hierarchy</code> (Sammlungs-Pfad), <code>collection</code> (Label), <code>date</code> (ISO, optional), <code>is_pdf</code>.</li>'
        + '<li><code>document_url</code>: Link zur PDF- oder HTML-Datei im <strong>Suchportal</strong> (<code>recherche2.histoirerurale.ch</code>).</li>'
        + '<li><code>original_url</code>: <strong>Deep-Link ins Quellportal</strong>, also die Website, von der der Scraper das Dokument geholt hat (z.B. <code>histoirerurale.ch</code>; kann je nach Bestand variieren).</li>'
        + '</ul>'
        + '<p><code>null</code>, wenn die ID nicht gefunden wird.</p>',
    tool_list_h_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Optionale Volltext-Anfrage.</td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>200</td><td>Maximale Anzahl Hierarchie-Einträge (1–10 000).</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Label-Sprache.</td></tr>'
        + '</tbody></table>'
        + '<h3 style="margin-top:1rem">Rückgabe (HierarchyResponse)</h3>'
        + '<table><thead><tr><th>Feld</th><th>Typ</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>entries</code></td><td>list[HierarchyEntry]</td><td>Pro Eintrag: <code>id</code> (Hierarchie-ID), <code>count</code> (Trefferanzahl), <code>label</code> (menschenlesbare Bezeichnung).</td></tr>'
        + '</tbody></table>',
    tool_server_info_params: '<p>Keine Parameter.</p>'
        + '<h3 style="margin-top:1rem">Rückgabe (dict)</h3>'
        + '<table><thead><tr><th>Feld</th><th>Typ</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>name</code></td><td>str</td><td>Server-Name (<code>afa-mcp</code>).</td></tr>'
        + '<tr><td><code>version</code></td><td>str</td><td>Semver.</td></tr>'
        + '<tr><td><code>elasticsearch_url</code></td><td>str</td><td>Upstream-URL des ES-Backends.</td></tr>'
        + '<tr><td><code>languages</code></td><td>list[str]</td><td><code>de</code>, <code>fr</code>, <code>it</code>, <code>en</code></td></tr>'
        + '<tr><td><code>sort_orders</code></td><td>list[str]</td><td>Akzeptierte Werte für <code>sort</code>.</td></tr>'
        + '<tr><td><code>hierarchy_constants</code></td><td>dict</td><td>Sprechende Konstanten (z.B. <code>PERSONS</code>, <code>EDITION_BOBBETT</code>) → Hierarchie-ID-Strings.</td></tr>'
        + '</tbody></table>',
    tools_note: 'Volltext-Suche und Hierarchie-Filter lassen sich beliebig kombinieren, z.B. <code>search(query="Bauernhof", hierarchy=["AfA_FotoFilm"])</code> für alle Bauernhof-Bilder. Mehrere Hierarchie-IDs werden mit OR verknüpft, mit der Volltext-Suche per AND.',
    discovery_h: "Discovery-Endpunkte",
    disc_mcp: "MCP-Server-Manifest",
    disc_card: "A2A Agent Card",
    disc_llms: "LLM-/Crawler-freundliche Beschreibung",
    footer: 'Recherche-Portal: <a href="https://www.recherche2.histoirerurale.ch">recherche2.histoirerurale.ch</a> · Trägerinstitution: <a href="https://histoirerurale.ch">Archiv für Agrargeschichte</a> · Quellcode: <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server">GitHub</a>',
    poweredby: 'powered by <a href="https://histoirerurale.ch">AfA</a> und <a href="https://www.pansoft.de/">Pansoft</a>'
  },
  en: {
    nav_intro: 'Einführung',
    call_intro: 'Für diese Anfrage ruft der Assistent dieses Werkzeug auf:',
    more_tools_h: 'Weitere Werkzeuge',
    tools_intro: '<p>So können Sie den MCP-Server benutzen:<br> Default portalübergreifend, spezifische Anfragen unten</p>',
    ex1_h: 'Personenrecherche',
    ex1_q: '«Suche auf dem AGHIST-MCP-Server nach Landräten im Kanton Nidwalden und stelle diese in einer Excel-Tabelle mit den Spalten Nachname, Vorname, AfA-Nummer, Geburtsdatum, Todesdatum und Amtsjahre dar.»',
    ex1_tool: 'Personenrecherche Werkzeug',
    ex2_h: 'Institutionensuche',
    ex2_q: '«Suche auf dem AGHIST-MCP-Server nach Landfrauen- und Bäuerinnenvereinigungen in der Schweiz. Wie sind diese heute auf nationaler Ebene organisiert? Inwiefern änderte sich dies im Laufe der Zeit? Darstellung in einem geeigneten Diagramm.»',
    ex2_tool: 'Institutionensuche Werkzeug',
    ex3_h: 'Suche nach Fotos und Filmen',
    ex3_q: '«Gibt es Fotografien und Filme zur Mechanisierung (aber nicht Motorisierung) der Landwirtschaft in der ersten Hälfte des 20. Jahrhunderts? Erstelle eine Liste mit Titel und Live-URL zum Eintrag.»',
    ex3_tool: 'Suche nach Fotos und Filmen Werkzeug',
    ex4_h: 'Digitale Editionen',
    ex4_q: '«Durchsuche die Edition Gillabert-Randin nach Textstellen zum Frauenstimmrecht und zitiere diese.»',
    ex4_tool: 'Digitale Editionen Werkzeug',
    ex5_h: 'Volltext von Einträgen konsultieren',
    ex5_q: '«Hol den Volltext des Eintrags zu Ineichen, Franz (1887-1953)--DB1734 und nenne mir die dort angegebenen Quellenangaben.»',
    ex5_tool: 'Volltext von Einträgen konsultieren Werkzeug',
    nav_clients: 'Clients',
    nav_examples: 'Werkzeuge',
    nav_tips: 'Nutzung',
    nav_reliability: 'Verlässlichkeit',
    nav_reference: 'Technisches',
    brand: "Archiv für Agrargeschichte",
    subtitle: "MCP-Schnittstelle zum AGHIST-Suchportal des Archivs für Agrargeschichte",
    intro: 'AGHIST ermöglicht eine syntaktische (textuelle) Suche im <a href="https://www.recherche2.histoirerurale.ch">Recherche-Portal</a> des <a href="https://histoirerurale.ch">Archivs für Agrargeschichte</a>: Die Suche erfasst sämtliche Online-Ressourcen, die vom Archiv für Agrargeschichte öffentlich und unentgeltlich zur Verfügung gestellt werden. Es handelt sich um mehr als 15.000 Einträge zu Personen, mehr als 1.200 Einträge zu Institutionen, Einträge zu landwirtschaftlichen Betrieben, Einträgen zu audio-visuelle Quellen und zu Verzeichnungsdaten von Archivbeständen sowie digitale Editionen und Publikationen aus dem AfA und über das AfA. Über den MCP-Server (Model Context Protocol, Streamable HTTP) sind diese Online-Ressourcen direkt aus Claude, ChatGPT, Cursor, Perplexity und anderen MCP-fähigen Clients ansprechbar.',
    guide_h: "So funktioniert die Recherche",
    guide_p: '<p>Ist der Konnektor zum MCP-Server eingerichtet und Verbindung hergestellt und für die Suche aktiviert, stellen Sie Recherchefragen in natürlicher Sprache: Der Client durchsucht die die Online-Ressourcen, kombiniert Suchanfragen, folgt Querverweisen und fasst die Ergebnisse zusammen. Zum Beispiel:</p>'
        + '<blockquote>«Suche ausschliesslich auf dem MCP-Server AGHIST des Archivs für Agrargeschichte nach Personen mit dem Namen Ineichen.»</blockquote>'
        + '<p>Der Client findet 79 Personen und erkennt, dass viele davon zur Familie Ineichen des Sentenhofs (Muri, Kt. Aargau) gehören, und stellt die Generationenfolge übersichtlich dar. Mögliche Nachfragen: «Mehr Informationen zu Franz Ineichen suchen» oder «Fotos und Filme zum Sentenhof und zur bzw. von Familien Ineichen suchen»</p>',
    holdings_h: "Welche Online-Ressourcen sind durchsuchbar?",
    holdings: '<table><thead><tr><th>Bestand</th><th>Inhalt</th></tr></thead><tbody>'
        + '<tr><td><strong>Personen</strong></td><td>Biografische Einträge zu Akteurinnen und Akteuren der ländlichen Gesellschaft: Lebensdaten, Funktionen, verwandtschaftliche Beziehungen, Quellenhinweise</td></tr>'
        + '<tr><td><strong>Institutionen</strong></td><td>Einträge zu Verbänden, Genossenschaften, Behörden und weitere Organisationen aus dem Agrar- und Ernährungsbereich</td></tr>'
        + '<tr><td><strong>Betriebe</strong></td><td>Einträge zu landwirtschaftliche Betrieben</td></tr>'
        + '<tr><td><strong>Foto &amp; Film</strong></td><td>Einträge zu audiovisuellen Quellen: Fotografien und Filme</td></tr>'
        + '<tr><td><strong>Digitale Editionen</strong></td><td>Drei edigitale Editionen mit Texten von und zu Mina Hofstetter, Augusta Gillabert-Randin und Elizabeth Bobbett</td></tr>'
        + '<tr><td><strong>Archivbestände</strong></td><td>Verzeichnungsdaten der Archivbestände des AfA</td></tr>'
        + '<tr><td><strong>Publikationen &amp; Medienberichte</strong></td><td>Publikation aus dem AfA und über das AfA</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem">Die Online-Ressourcen liegen in einer der drei folgenden Sprachen vor: Deutsch, Französisch, Englisch.</p>',
    setup_h: "Einrichten in drei Schritten",
    setup_steps: '<ol><li><strong>KI-Client auswählen.</strong> Sie benötigen einen Zugang bspw. zu Claude (claude.ai oder Desktop-App), ChatGPT (Plus/Team/Enterprise), Perplexity Pro oder einer Entwicklungsumgebung wie Cursor oder VS Code.</li><li><strong>Server verbinden (Konnektor hinzufügen, App hinzufügen).</strong> Tragen Sie die Adresse des Endpoints <code>https://mcp.histoirerurale.ch/mcp</code> als MCP-Server ein. Die genauen Schritte unterscheiden sich je nach Client, siehe die Anleitungen im nächsten Abschnitt.</li><li><strong>Start.</strong> Stellen Sie Ihre erste Rechercheanfrage in natürlicher Sprache. Eine Suchsyntax kann zusätzlich verwendet werden.</li></ol>',
    examples_h: 'Werkzeuge des MCP-Servers',
    tips_h: 'Nutzung des MCP-Servers',
    tips: '<ul><li><strong>Iterativ arbeiten.</strong> Beginnen Sie mit einer breit gefassten Anfrage und verengen Sie diese erst in einem zweiten Schritt: erst «Landfrauenverbände», dann «nur Kanton Bern», dann «Volltext von Eintrag X».</li><li><strong>Nach Querverweisen fragen.</strong> Insbesondere im Portal «Personen und Institutionen» sind die Einträge untereinander vernetzt (Verwandtschaft, Mitgliedschaften, Vorgänger und Nachfolger von Funktionärinnen und Funktionären, etc.). Fragen Sie nach diesen Verbindungen: «Welche weiteren Personen sind mit dem Eintrag Schnyder, Bertha (1887-1968)--DB3219 verknüpft?»</li><li><strong>Mehrsprachig suchen.</strong> Die Online-Ressourcen sind mehrsprachig, Prompts können wie folgt ergänzt werden: «Suche auch auf Englisch und Französisch».</li><li><strong>Quellen verifizieren.</strong> Für Zitate immer den Quell-Eintrag über die mitgelieferte Live-URL (<code>recherche2.histoirerurale.ch</code>) bzw. den dort angebebenen Zitiervorschlag angeben.</li><li><strong>Scope berücksichtigen.</strong> Der Client findet nur Texte, die im AGHIST-Portal hinterlegt sind.</li><li><strong>Suchwege des Clients nachvollziehen.</strong> Viele Clients zeigen im Chatverlauf an, welche Suchanfragen sie tatsächlich ausgeführt haben (meist als aufklappbare Blöcke wie «Used afa-recherche search»). Konsultieren Sie diese Suchprotokolle, um die Abfrage etwas besser nachvollziehen zu können. So sehen Sie, mit welchen Begriffen und Filtern gesucht wurde, und Sie können u.U. erkennen, ob eine Recherche zu eng oder zu breit angelegt war. Die Zusammenfassung des Clients ist nicht dasselbe wie das Suchergebnis.</li></ul>',
    reliability_h: "Reproduzierbarkeit der Abfrageergebnisse",
    reliability: '<p>KI-Clients sind ein (mehr oder weniger zuverlässiges) Recherchewerkzeug, keine Quelle. Testen Sie auch deshalb die :</p><p><strong>Reproduzierbarkeit:</strong> der Resultate: Stellen Sie dieselbe Frage zweimal (das zweite Mal u.U. im Inkognito-Modus), kann der Assistent unterschiedliche Suchanfragen an den MCP-Server formulieren, andere Treffer auswählen und zu anderen Schwerpunkten in der Zusammenfassung kommen. Was Sie heute finden, findet eine andere Person morgen mit derselben Frage vielleicht nicht. Die Dokument-IDs und die Links zu den Quell-Einträgen sind stabil und zitierfähig, der Chatverlauf ist es nicht.</p><p><strong>Was hilft.</strong> Je enger geführt die Eingabe ist, desto eher kann das Ergebnis reproduziert werden. Eine Frage in natürlicher Sprache lässt dem Client viel Spielraum bei der Auswahl der Werkzeuge, der Suchbegriffe und der Filter). Ein explizit notierter Suchaufruf wie <code>search_entities({"entity_type": "person", "query": "Ineichen"})</code> legt diese Entscheidungen fest und liefert bei unverändertem Datenbestand auf dem MCP-Server dieselben Treffer. Empfehlung: Für die Nachvollziehbarkeit den tatsächlich ausgeführten Suchaufruf aus dem Chatverlauf kopieren und dokumentieren.</p><p>Wer volle Reproduzierbarkeit braucht, ruft die Schnittstelle direkt per Skript auf (siehe technische Dokumentation).</p><p>Kurz: Der Client ersetzt die Suchmaske, nicht die Prüfung und Würdigung der Quelle.</p>',
    techref_h: "Technische Dokumentation",
    techref_p: 'Dieser Abschnitt richtet sich an Entwicklerinnen und Entwickler sowie an alle, die genauer erfahren möchten, wie der Client auf dem MCP-Server sucht.',
    endpoint_h: "MCP-Endpoint",
    endpoint_p: 'Transport: <em>Streamable HTTP</em>. Authentifizierung: keine. In MCP-fähigen Clients als Remote-Server mit dieser URL eintragen.',
    direct_h: "Direktzugriff ohne KI",
    direct_intro: '<p>Für technisch interessierte Nutzerinnen und Nutzer ist der MCP-Server auch ohne KI-Assistent nutzbar, ähnlich wie eine herkömmliche Schnittstelle (API). MCP basiert auf JSON-RPC über HTTP: Jedes Werkzeug lässt sich direkt aufrufen, etwa per <code>curl</code> oder aus einem Skript (siehe «eigene MCP-Clients»). Das ist der Weg zu voller Reproduzierbarkeit: gleicher Aufruf, gleiche Treffer, kein zwischengeschaltetes Sprachmodell.</p>',
    direct_notes: '<p>Die Antwort enthält die Trefferliste als JSON im Feld <code>result.content[0].text</code>. Zwei Hinweise: Der <code>Accept</code>-Header muss beide Inhaltstypen nennen (<code>application/json, text/event-stream</code>), sonst lehnt der Server die Anfrage ab. Und der sonst übliche <code>initialize</code>-Handshake des MCP-Protokolls entfällt, weil der Server zustandslos betrieben wird; einzelne Aufrufe funktionieren direkt. Damit eignet sich der Server auch für reine Datenabfragen: Trefferzahlen über Bestände vergleichen, Editionen systematisch abfragen oder Ergebnisse in eigene Werkzeuge einbinden.</p>',
    integration_h: 'Clients: Integration in LLMs und weitere Softwares',
    integration_p: 'Klicken Sie unten auf den jeweiligen Client für die detaillierte Anleitung.',
    claude_web: '<strong>claude.ai (Web)</strong>: Settings → <em>Connectors</em> → <em>Add custom connector</em> → URL eintragen:',
    claude_desktop: '<strong>Claude Desktop</strong>: in <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> (macOS) bzw. <code>%APPDATA%\\Claude\\claude_desktop_config.json</code> (Windows) den Eintrag ergänzen:',
    claude_restart: "Claude Desktop danach neu starten.",
    chatgpt: 'In ChatGPT → Settings → <em>Connectors</em> → <em>Custom connectors</em> → <em>New connector</em>:',
    chatgpt_use: 'Den Connector im Chat per "+ Tools" aktivieren. Auch in Custom GPTs als Action / MCP-Server hinterlegbar.',
    cursor: 'In <code>~/.cursor/mcp.json</code> (oder <em>Settings → MCP → Add new MCP server</em>):',
    cursor_loads: "Cursor lädt die Konfiguration sofort, Tools erscheinen im Agent-Panel.",
    perplexity: 'In Perplexity → Settings → <em>Connectors</em> → <em>Add connector</em> → <em>MCP Server</em>:',
    perplexity_space: "In Spaces lässt sich der Connector pro Workspace aktivieren.",
    vscode: 'In <code>.vscode/mcp.json</code> im Workspace oder global über <em>MCP: Open User Configuration</em>:',
    vscode_use: 'Im Copilot-Chat-Panel <em>Agent-Mode</em> auswählen; die Tools stehen dann zur Verfügung.',
    cli_intro: "Einmaliger Aufruf in einem beliebigen Terminal:",
    cli_done: "Danach in jeder Claude-Code-Sitzung verfügbar.",
    custom_clients_h: "Eigene MCP-Clients (Python / TypeScript)",
    custom_py: 'Python mit dem offiziellen <code>mcp</code>-SDK:',
    custom_ts: 'TypeScript/Node mit <code>@modelcontextprotocol/sdk</code> analog: StreamableHTTPClientTransport mit derselben URL.',
    tools_h: "Werkzeuge",
    th_name: "Name",
    th_function: "Funktion",
    tool_search: "Volltext-Suche über alle Bestände, optional mit Hierarchie-Filter.",
    tool_search_entities: 'Personen, Institutionen oder Betriebe (Parameter <code>entity_type</code>).',
    tool_search_av: 'Foto- und Film-Bestände (optional auf <code>photos</code> / <code>films</code> einschränkbar).',
    tool_ed_hofstetter: "Edition Mina Hofstetter.",
    tool_ed_gr: "Edition Augusta Gillabert-Randin.",
    tool_ed_bobbett: "Edition Elizabeth Bobbett.",
    tool_fetch: "Einzelnes Dokument inkl. Volltext anhand seiner ID.",
    tool_list_h: "Hierarchie-Buckets mit Trefferzahlen.",
    tool_server_info: "Versions- und Endpunkt-Information.",
    tool_search_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String (Phrasen mit "…", <code>AND</code>/<code>OR</code>/<code>NOT</code>, Wildcards <code>*</code> und <code>?</code>).</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Bevorzugte Sprache für Titel/Highlight: <code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code>. Kein Filter; fällt auf andere Sprachen zurück.</td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>Treffer pro Seite (1–100).</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Cursor aus <code>next_cursor</code> der vorigen Antwort.</td></tr>'
        + '<tr><td><code>hierarchy</code></td><td>list[str]</td><td>-</td><td>Hierarchie-IDs zur Einschränkung (per OR verknüpft, aus <code>list_hierarchy</code>).</td></tr>'
        + '<tr><td><code>include_aggregations</code></td><td>bool</td><td>false</td><td>Hierarchie-Aggregation mitliefern.</td></tr>'
        + '</tbody></table>'
        + '<h3 style="margin-top:1rem">Rückgabe (SearchResponse)</h3>'
        + '<table><thead><tr><th>Feld</th><th>Typ</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>total</code></td><td>int</td><td>Gesamtzahl der Treffer (auch über <code>size</code> hinaus).</td></tr>'
        + '<tr><td><code>hits</code></td><td>list[SearchHit]</td><td>Trefferliste (max. <code>size</code> Einträge).</td></tr>'
        + '<tr><td><code>next_cursor</code></td><td>list | null</td><td>An <code>search_after</code> des nächsten Requests übergeben; <code>null</code> = keine weiteren Treffer.</td></tr>'
        + '<tr><td><code>aggregations</code></td><td>dict | null</td><td>Hierarchie-Buckets, nur bei <code>include_aggregations=true</code>.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>SearchHit-Felder:</strong> <code>id</code>, <code>title</code>, <code>abstract</code>, <code>text</code> (Highlight-Snippet), <code>meta</code>, <code>hierarchy</code> (Pfad), <code>collection</code> (Label), <code>date</code> (ISO, optional), <code>is_pdf</code>, <code>document_url</code> (Suchportal-Deep-Link), <code>original_url</code> (Quell-URL), <code>sort</code> (interner Cursor).</p>',
    tool_search_entities_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String.</td></tr>'
        + '<tr><td><code>entity_type</code></td><td>enum</td><td><code>any</code></td><td><code>person</code>|<code>institution</code>|<code>farm</code>|<code>any</code>. <code>company</code> bleibt als Deprecated-Alias für <code>farm</code> erhalten.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Paginierungs-Cursor.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>Rückgabe:</strong> <code>SearchResponse</code> (siehe <code>search</code>); Hits sind auf Personen/Institutionen/Betriebe eingeschränkt.</p>',
    tool_search_av_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String.</td></tr>'
        + '<tr><td><code>media_type</code></td><td>enum</td><td>-</td><td><code>photos</code> = nur Fotos, <code>films</code> = nur Filme; ohne Angabe beide.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Paginierungs-Cursor.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>Rückgabe:</strong> <code>SearchResponse</code> (siehe <code>search</code>); Hits sind auf Foto-/Filmbestände eingeschränkt.</p>',
    tool_edition_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene-Query-String.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
        + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
        + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Paginierungs-Cursor.</td></tr>'
        + '</tbody></table>'
        + '<p style="margin-top:.6rem"><strong>Rückgabe:</strong> <code>SearchResponse</code> (siehe <code>search</code>); Hits sind auf die jeweilige Edition eingeschränkt.</p>',
    tool_fetch_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>id</code></td><td>str</td><td>erforderlich</td><td>Dokument-ID, z.B. <code>AfA_Personen_001_DB9920</code>. Aus dem <code>id</code>-Feld einer <code>search</code>-Antwort.</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Bevorzugte Sprache für Titel/Text.</td></tr>'
        + '</tbody></table>'
        + '<h3 style="margin-top:1rem">Rückgabe (SearchHit, ohne Volltext)</h3>'
        + '<ul>'
        + '<li><strong>Metadaten:</strong> <code>id</code>, <code>title</code>, <code>abstract</code>, <code>meta</code>, <code>hierarchy</code> (Sammlungs-Pfad), <code>collection</code> (Label), <code>date</code> (ISO, optional), <code>is_pdf</code>.</li>'
        + '<li><code>document_url</code>: Link zur PDF- oder HTML-Datei im <strong>Suchportal</strong> (<code>recherche2.histoirerurale.ch</code>).</li>'
        + '<li><code>original_url</code>: <strong>Deep-Link ins Quellportal</strong>, also die Website, von der der Scraper das Dokument geholt hat (z.B. <code>histoirerurale.ch</code>; kann je nach Bestand variieren).</li>'
        + '</ul>'
        + '<p><code>null</code>, wenn die ID nicht gefunden wird.</p>',
    tool_list_h_params: '<table><thead><tr><th>Parameter</th><th>Typ</th><th>Default</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Optionale Volltext-Anfrage.</td></tr>'
        + '<tr><td><code>size</code></td><td>int</td><td>200</td><td>Maximale Anzahl Hierarchie-Einträge (1–10 000).</td></tr>'
        + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Label-Sprache.</td></tr>'
        + '</tbody></table>'
        + '<h3 style="margin-top:1rem">Rückgabe (HierarchyResponse)</h3>'
        + '<table><thead><tr><th>Feld</th><th>Typ</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>entries</code></td><td>list[HierarchyEntry]</td><td>Pro Eintrag: <code>id</code> (Hierarchie-ID), <code>count</code> (Trefferanzahl), <code>label</code> (menschenlesbare Bezeichnung).</td></tr>'
        + '</tbody></table>',
    tool_server_info_params: '<p>Keine Parameter.</p>'
        + '<h3 style="margin-top:1rem">Rückgabe (dict)</h3>'
        + '<table><thead><tr><th>Feld</th><th>Typ</th><th>Beschreibung</th></tr></thead><tbody>'
        + '<tr><td><code>name</code></td><td>str</td><td>Server-Name (<code>afa-mcp</code>).</td></tr>'
        + '<tr><td><code>version</code></td><td>str</td><td>Semver.</td></tr>'
        + '<tr><td><code>elasticsearch_url</code></td><td>str</td><td>Upstream-URL des ES-Backends.</td></tr>'
        + '<tr><td><code>languages</code></td><td>list[str]</td><td><code>de</code>, <code>fr</code>, <code>it</code>, <code>en</code></td></tr>'
        + '<tr><td><code>sort_orders</code></td><td>list[str]</td><td>Akzeptierte Werte für <code>sort</code>.</td></tr>'
        + '<tr><td><code>hierarchy_constants</code></td><td>dict</td><td>Sprechende Konstanten (z.B. <code>PERSONS</code>, <code>EDITION_BOBBETT</code>) → Hierarchie-ID-Strings.</td></tr>'
        + '</tbody></table>',
    tools_note: 'Volltext-Suche und Hierarchie-Filter lassen sich beliebig kombinieren, z.B. <code>search(query="Bauernhof", hierarchy=["AfA_FotoFilm"])</code> für alle Bauernhof-Bilder. Mehrere Hierarchie-IDs werden mit OR verknüpft, mit der Volltext-Suche per AND.',
    discovery_h: "Discovery-Endpunkte",
    disc_mcp: "MCP-Server-Manifest",
    disc_card: "A2A Agent Card",
    disc_llms: "LLM-/Crawler-freundliche Beschreibung",
    footer: 'Recherche-Portal: <a href="https://www.recherche2.histoirerurale.ch">recherche2.histoirerurale.ch</a> · Trägerinstitution: <a href="https://histoirerurale.ch">Archiv für Agrargeschichte</a> · Quellcode: <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server">GitHub</a>',
    poweredby: 'powered by <a href="https://histoirerurale.ch">AfA</a> und <a href="https://www.pansoft.de/">Pansoft</a>'
  }
};


// ---------------------------------------------------------------------------
// Werkzeug-Abschnitt: zu jeder Beispielanfrage der Aufruf und die Angaben zum
// Werkzeug. Aus Bausteinen zusammengesetzt, damit die Parametertabellen nur
// einmal gepflegt werden.
// ---------------------------------------------------------------------------

const EXAMPLE_CALLS = [
  { call: "search_entities({\"entity_type\": \"person\",\n                 \"query\": \"Landrat AND Nidwalden\", \"sort\": \"id\", \"size\": 100})", params: "tool_search_entities_params" },
  { call: "search_entities({\"entity_type\": \"institution\",\n                 \"query\": \"Landfrauen OR Bäuerinnen\", \"size\": 100})", params: "tool_search_entities_params" },
  { call: "search_audiovisual({\"query\": \"Mechanisierung NOT Motorisierung\", \"size\": 100})", params: "tool_search_av_params" },
  { call: "search_edition_gillabert_randin({\"query\": \"Frauenstimmrecht\", \"size\": 20})", params: "tool_edition_params" },
  { call: "fetch_document({\"id\": \"AfA_Personen_001_DB1734\"})", params: "tool_fetch_params" }
];

const MORE_TOOLS = [
  { name: "search", label: "tool_search", params: "tool_search_params" },
  { name: "search_edition_hofstetter", label: "tool_ed_hofstetter", params: "tool_edition_params" },
  { name: "search_edition_bobbett", label: "tool_ed_bobbett", params: "tool_edition_params" },
  { name: "list_hierarchy", label: "tool_list_h", params: "tool_list_h_params" },
  { name: "server_info", label: "tool_server_info", params: "tool_server_info_params" }
];

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

for (const lang of Object.keys(I18N)) {
  const d = I18N[lang];
  let html = d.tools_intro;
  EXAMPLE_CALLS.forEach((entry, i) => {
    const n = i + 1;
    html += "<p><strong>" + d["ex" + n + "_h"] + "</strong></p>"
        + "<blockquote>" + d["ex" + n + "_q"] + "</blockquote>"
        + "<details><summary>" + d["ex" + n + "_tool"] + "</summary><div>"
        + "<p>" + d.call_intro + "</p>"
        + "<pre>" + escapeHtml(entry.call) + "</pre>"
        + d[entry.params]
        + "</div></details>";
  });
  html += "<h3>" + d.more_tools_h + "</h3>";
  for (const tool of MORE_TOOLS) {
    html += "<details><summary><code>" + tool.name + "</code> · " + d[tool.label]
        + "</summary><div>" + d[tool.params] + "</div></details>";
  }
  html += "<p>" + d.tools_note + "</p>";
  d.examples = html;
}