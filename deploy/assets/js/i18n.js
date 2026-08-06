const I18N = {
  de: {
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
    nav_tips: 'Tipps',
    nav_reliability: 'Verlässlichkeit',
    nav_reference: 'Technisches',
    brand: "Archiv für Agrargeschichte",
    subtitle: "MCP-Schnittstelle zum Archiv für Agrargeschichte",
    intro: 'Modellfähige Volltextsuche im <a href="https://www.recherche2.histoirerurale.ch">Recherche-Portal</a> des <a href="https://histoirerurale.ch">Archivs für Agrargeschichte</a>: Personen, Institutionen, Betriebe, audio-visuelle Quellen, Archivbestände, digitale Editionen und Publikationen. Über das Model Context Protocol (Streamable HTTP) direkt aus Claude, ChatGPT, Cursor, Perplexity und allen anderen MCP-fähigen Clients ansprechbar.',
    guide_h: "So funktioniert die Recherche",
    guide_p: '<p>Einmal eingerichtet, stellen Sie Ihre Recherchefragen in ganz normaler Sprache: Der Assistent durchsucht die Bestände für Sie, kombiniert Suchanfragen, folgt Querverweisen und fasst die Ergebnisse zusammen. Zum Beispiel:</p>'
      + '<blockquote>«Such nach Personen mit dem Namen Ineichen.»</blockquote>'
      + '<p>Der Assistent findet 79 Personen, erkennt, dass viele davon zur Familie des Sentenhofs im Aargau gehören, und stellt die Generationenfolge übersichtlich dar. Anschliessend können Sie nachfragen: «Zeig mir mehr zu Franz Ineichen» oder «Gibt es Fotos dazu?»</p>',
    holdings_h: "Was ist durchsuchbar?",
    holdings: '<table><thead><tr><th>Bestand</th><th>Inhalt</th></tr></thead><tbody>'
      + '<tr><td><strong>Personen</strong></td><td>Biografische Einträge zu Akteurinnen und Akteuren der ländlichen Gesellschaft: Lebensdaten, Funktionen, verwandtschaftliche Beziehungen, Quellenhinweise</td></tr>'
      + '<tr><td><strong>Institutionen</strong></td><td>Verbände, Genossenschaften, Behörden und weitere Organisationen</td></tr>'
      + '<tr><td><strong>Betriebe</strong></td><td>Landwirtschaftliche Betriebe und Unternehmen</td></tr>'
      + '<tr><td><strong>Foto &amp; Film</strong></td><td>Audiovisuelle Quellen: Fotografien und Filme</td></tr>'
      + '<tr><td><strong>Digitale Editionen</strong></td><td>Drei edierte Quellenkorpora: Mina Hofstetter, Augusta Gillabert-Randin, Elizabeth Bobbett</td></tr>'
      + '<tr><td><strong>Archivbestände</strong></td><td>Verzeichnisse der Archivbestände des AfA</td></tr>'
      + '<tr><td><strong>Publikationen &amp; Medienberichte</strong></td><td>Veröffentlichungen und Berichterstattung</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem">Alle Inhalte sind in vier Sprachen erschlossen (Deutsch, Französisch, Italienisch, Englisch).</p>',
    setup_h: "Einrichten in drei Schritten",
    setup_steps: '<ol><li><strong>KI-Assistent wählen.</strong> Sie brauchen einen Zugang zu Claude (claude.ai oder Desktop-App), ChatGPT (Plus/Team/Enterprise), Perplexity Pro oder einer Entwicklungsumgebung wie Cursor oder VS Code.</li><li><strong>Server verbinden (Konnektor hinzufügen, App hinzufügen).</strong> Tragen Sie die Adresse des Endpoints <code>https://mcp.histoirerurale.ch/mcp</code> als MCP-Server ein. Die genauen Schritte unterscheiden sich je nach Plattform, siehe die Anleitungen im nächsten Abschnitt.</li><li><strong>Losfragen.</strong> Stellen Sie Ihre erste Rechercheanfrage in normaler Sprache. Eine Suchsyntax kann (zusätzlich) verwendet werden.</li></ol>',
    examples_h: 'Werkzeuge des MCP-Servers',
    tips_h: 'Vorgehensweisen den MCP zu nutzen',
    tips: '<ul><li><strong>Iterativ arbeiten.</strong> Beginnen Sie mit einer breit gefassten Anfrage und verengen Sie erst in einem zweiten Schritt: erst «Landfrauenverbände», dann «nur Kanton Bern», dann «Volltext von Dokument X».</li><li><strong>Nach Querverweisen fragen.</strong> Die Einträge insbesondere im Portal «Personen und Institutionen» sind vernetzt (Verwandtschaft, Mitgliedschaften, Vorgänger und Nachfolger von Funktionärinnen und Funktionären, etc.). Fragen Sie: «Welche weiteren Personen sind mit dem Eintrag Schnyder, Bertha (1887-1968)--DB3219 verknüpft?»</li><li><strong>Mehrsprachig suchen.</strong> Die Online-Ressourcen sind mehrsprachig, Prompts können wie folgt ergänzt werden: «Suche auch auf Englisch und Französisch».</li><li><strong>Quellen verifizieren.</strong> Für Zitate immer den Quell-Eintrag über die mitgelieferte Live-URL (<code>recherche2.histoirerurale.ch</code>) angeben.</li><li><strong>Scope berücksichtigen.</strong> Der Assistent findet nur, was im AGHIST-Portal hinterlegt ist.</li><li><strong>Suchwege nachvollziehen.</strong> Die meisten KI-Assistenten zeigen im Chatverlauf an, welche Suchanfragen sie tatsächlich ausgeführt haben (meist als aufklappbare Blöcke wie «Used afa-recherche search»). Werfen Sie einen Blick hinein: So sehen Sie, mit welchen Begriffen und Filtern gesucht wurde, und erkennen, ob eine Recherche zu eng oder zu breit angelegt war. Die Zusammenfassung des Assistenten ist nicht dasselbe wie das Suchergebnis.</li></ul>',
    reliability_h: "Ein Wort zur Verlässlichkeit",
    reliability: '<p>KI-Assistenten sind ein Recherchewerkzeug, keine Quelle. Zwei Eigenschaften sollten Sie als Historikerin oder Historiker im Blick behalten:</p>'
      + '<p><strong>Ergebnisse sind nicht reproduzierbar.</strong> Stellen Sie dieselbe Frage zweimal, kann der Assistent unterschiedliche Suchanfragen formulieren, andere Treffer auswählen und zu anderen Schwerpunkten in der Zusammenfassung kommen. Was Sie heute finden, findet eine Kommilitonin morgen mit derselben Frage vielleicht nicht. Halten Sie deshalb fest, was zählt: die Dokument-IDs, die Links zu den Originaleinträgen und die Dossier-Nummern. Diese sind stabil und zitierfähig, der Chatverlauf ist es nicht.</p>'
      + '<p><strong>Reproduzierbarkeit hat Stufen.</strong> Je genauer die Eingabe, desto wiederholbarer das Ergebnis. Eine Frage in natürlicher Sprache lässt dem Assistenten viele Entscheidungen offen (Werkzeug, Suchbegriffe, Filter). Ein explizit notierter Suchaufruf wie <code>search_entities({"entity_type": "person", "query": "Ineichen"})</code> legt diese Entscheidungen fest und liefert bei unverändertem Bestand dieselben Treffer. Empfehlung: beim Explorieren frei fragen, für zentrale Befunde aber den tatsächlich ausgeführten Suchaufruf aus dem Chatverlauf kopieren und dokumentieren. Wer volle Reproduzierbarkeit braucht, ruft die Schnittstelle direkt per Skript auf (siehe technische Referenz). Nur die Zusammenfassung des Assistenten bleibt in jedem Fall variabel.</p>'
      + '<p><strong>Zusammenfassungen können Fehler enthalten.</strong> Der Assistent kann Inhalte verkürzen, Zusammenhänge falsch verknüpfen oder im schlechtesten Fall Details erfinden, die so nicht in der Quelle stehen. Behandeln Sie seine Ausgabe wie das Referat einer Hilfskraft: nützlich als Einstieg und Überblick, aber jede Aussage, die in eine Arbeit einfliesst, gehört am Original-Eintrag verifiziert.</p>'
      + '<p><strong>Vorlagen, die die Streuung verringern.</strong> Zwei gleiche Antworten sind auch mit der besten Vorgabe nicht zu erwarten. Einschränken lässt sich aber, wie viel der Assistent selbst entscheidet: Im Quellcode liegen Prompt-Vorlagen, die Suchaufrufe, Ausgabeschema, Abrufdatum und eine Prüfsumme über die gefundenen Kennungen festhalten, dazu Vorlagen für belegte Recherche, für vollständige Trefferlisten und für Personendossiers mit festen Feldern, sowie eine Vorlage, mit der jemand anders Ihr Ergebnis nachrechnet und die Abweichung benennt. Das macht Läufe besser vergleichbar und Auslassungen sichtbarer. Gleichheit garantiert es nicht. Siehe <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>'
      + '<p>Kurz: Der Assistent ersetzt die Suchmaske, nicht die Quellenkritik.</p>',
    techref_h: "Technische Referenz",
    techref_p: 'Dieser Abschnitt richtet sich an Entwicklerinnen und Entwickler sowie an alle, die genauer wissen wollen, wie der Assistent sucht.',
    endpoint_h: "MCP-Endpoint",
    endpoint_p: 'Transport: <em>Streamable HTTP</em>. Authentifizierung: keine. In MCP-fähigen Clients als Remote-Server mit dieser URL eintragen.',
    sysprompt_h: 'Systemprompt des Servers',
    sysprompt: '<p>Ein MCP-Server liefert dem Client bei jeder Verbindung nicht nur Werkzeuge, sondern auch einen Text mit Anweisungen (Feld <code>instructions</code>). Der Client stellt ihn dem Sprachmodell voran. Er entscheidet damit mit, wie sorgfältig ein Assistent arbeitet, ohne dass Nutzende etwas einrichten müssen.</p><p>Der AfA-Server beschreibt darin heute die Bestände und die Werkzeuge. Im Quellcode liegt zusätzlich ein ausgearbeiteter Vorschlag, diesen Text um Arbeitsregeln zu erweitern, die die Streuung der Antworten verringern: jede Aussage mit Dokument-ID und Link belegen, nicht aus dem gekürzten Trefferausschnitt antworten sondern den Eintrag abrufen, für wiederholbare Ergebnisse nach ID sortieren statt nach Relevanz, vor der Aussage «alle Treffer» bis zum Ende der Trefferliste blättern, und Widersprüche zwischen Einträgen mit beiden Kennungen nennen statt sie aufzulösen. Auch damit bleiben Auswahl und Formulierung des Assistenten variabel: die Regeln verringern Auslassungen und Zufall, sie beseitigen sie nicht.</p><p>Ergänzend dazu, und für Recherchen einzeln einsetzbar, gibt es die Prompt-Vorlagen aus dem Abschnitt zur Verlässlichkeit: Rezept-Format mit Prüfsumme, Arbeitsvorlagen und Fremdprüfung. Beides liegt zusammen in <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>',
    direct_h: "Direktzugriff ohne KI",
    direct_intro: '<p>Für technisch versierte Nutzerinnen und Nutzer ist der MCP-Server auch ohne KI-Assistent nutzbar, ähnlich einer gewöhnlichen API. MCP basiert auf JSON-RPC über HTTP: Jedes Werkzeug lässt sich direkt aufrufen, etwa per <code>curl</code> oder aus einem Skript (siehe «Eigene MCP-Clients»). Das ist der Weg zu voller Reproduzierbarkeit: gleicher Aufruf, gleiche Treffer, kein Sprachmodell dazwischen.</p>',
    direct_notes: '<p>Die Antwort enthält die Trefferliste als JSON im Feld <code>result.content[0].text</code>. Zwei Hinweise: Der <code>Accept</code>-Header muss beide Inhaltstypen nennen (<code>application/json, text/event-stream</code>), sonst lehnt der Server die Anfrage ab. Und der sonst übliche <code>initialize</code>-Handshake des MCP-Protokolls entfällt, weil der Server zustandslos betrieben wird; einzelne Aufrufe funktionieren direkt. Damit eignet sich der Server auch für quantitative Auswertungen und Digital-Humanities-Projekte: Trefferzahlen über Bestände vergleichen, Korpora systematisch abfragen oder Ergebnisse in eigene Werkzeuge einbinden.</p>',
    integration_h: 'Clients: Integration in LLMs und weitere Softwares',
    integration_p: 'Klicken Sie unten auf den jeweiligen Client für die detaillierte Anleitung. Die URL des Endpoints ist immer dieselbe: <code>https://mcp.histoirerurale.ch/mcp</code>.',
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
    call_intro: 'Pour cette requête, l’assistant appelle cet outil :',
    more_tools_h: 'Autres outils',
    tools_intro: '<p>Voici comment utiliser le serveur MCP :<br> par défaut sur l’ensemble des portails, requêtes spécifiques ci-dessous</p>',
    ex1_h: 'Recherche de personnes',
    ex1_q: '« Cherche sur le serveur MCP AGHIST les membres du Grand Conseil (Landrat) du canton de Nidwald et présente-les dans un tableau Excel avec les colonnes nom, prénom, numéro AfA, date de naissance, date de décès et années de mandat. »',
    ex1_tool: 'Outil : Recherche de personnes',
    ex2_h: 'Recherche d’institutions',
    ex2_q: '« Cherche sur le serveur MCP AGHIST les associations de paysannes et de femmes rurales en Suisse. Comment sont-elles organisées aujourd’hui au niveau national ? Dans quelle mesure cela a-t-il changé au fil du temps ? Présentation dans un diagramme approprié. »',
    ex2_tool: 'Outil : Recherche d’institutions',
    ex3_h: 'Recherche de photos et de films',
    ex3_q: '« Existe-t-il des photographies et des films sur la mécanisation (mais pas la motorisation) de l’agriculture dans la première moitié du XXe siècle ? Établis une liste avec le titre et l’URL en direct vers la notice. »',
    ex3_tool: 'Outil : Recherche de photos et de films',
    ex4_h: 'Éditions numériques',
    ex4_q: '« Parcours l’édition Gillabert-Randin à la recherche de passages sur le suffrage féminin et cite-les. »',
    ex4_tool: 'Outil : Éditions numériques',
    ex5_h: 'Consulter le texte intégral des notices',
    ex5_q: '« Récupère le texte intégral de la notice Ineichen, Franz (1887-1953)--DB1734 et indique-moi les références de sources qui y figurent. »',
    ex5_tool: 'Outil : Consulter le texte intégral des notices',
    nav_clients: 'Clients',
    nav_examples: 'Outils',
    nav_tips: 'Conseils',
    nav_reliability: 'Fiabilité',
    nav_reference: 'Technique',
    brand: "Archives d'histoire rurale",
    subtitle: "Interface MCP des Archives d'histoire rurale",
    intro: 'Recherche en plein texte adaptée aux modèles dans le <a href="https://www.recherche2.histoirerurale.ch">portail de recherche</a> des <a href="https://histoirerurale.ch">Archives d\'histoire rurale</a> : personnes, institutions, exploitations, sources audiovisuelles, fonds d\'archives, éditions numériques et publications. Accessible via le Model Context Protocol (Streamable HTTP) directement depuis Claude, ChatGPT, Cursor, Perplexity et tous les autres clients compatibles MCP.',
    guide_h: "Comment fonctionne la recherche",
    guide_p: '<p>Une fois la connexion établie, posez vos questions de recherche en langage courant : l\'assistant parcourt les fonds pour vous, combine les requêtes, suit les renvois et résume les résultats. Par exemple :</p>'
      + '<blockquote>« Cherche des personnes portant le nom Ineichen. »</blockquote>'
      + '<p>L\'assistant trouve 79 personnes, reconnaît que beaucoup appartiennent à la famille du Sentenhof en Argovie et présente clairement la succession des générations. Vous pouvez ensuite préciser : « Montre-moi plus de détails sur Franz Ineichen » ou « Y a-t-il des photos ? »</p>',
    holdings_h: "Que peut-on consulter ?",
    holdings: '<table><thead><tr><th>Fonds</th><th>Contenu</th></tr></thead><tbody>'
      + '<tr><td><strong>Personnes</strong></td><td>Notices biographiques d\'acteurs et actrices de la société rurale : dates de vie, fonctions, liens de parenté, références aux sources</td></tr>'
      + '<tr><td><strong>Institutions</strong></td><td>Associations, coopératives, autorités et autres organisations</td></tr>'
      + '<tr><td><strong>Exploitations</strong></td><td>Exploitations agricoles et entreprises</td></tr>'
      + '<tr><td><strong>Photo &amp; film</strong></td><td>Sources audiovisuelles : photographies et films</td></tr>'
      + '<tr><td><strong>Éditions numériques</strong></td><td>Trois corpus de sources édités : Mina Hofstetter, Augusta Gillabert-Randin, Elizabeth Bobbett</td></tr>'
      + '<tr><td><strong>Fonds d\'archives</strong></td><td>Inventaires des fonds d\'archives des AHR</td></tr>'
      + '<tr><td><strong>Publications &amp; presse</strong></td><td>Publications et couverture médiatique</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem">Tous les contenus sont indexés en quatre langues (allemand, français, italien, anglais).</p>',
    setup_h: "Mise en place en trois étapes",
    setup_steps: '<ol><li><strong>Choisir un assistant IA.</strong> Il vous faut un accès à Claude (claude.ai ou application de bureau), ChatGPT (Plus/Team/Enterprise), Perplexity Pro ou un environnement de développement comme Cursor ou VS Code.</li><li><strong>Connecter le serveur (ajouter un connecteur, ajouter une application).</strong> Enregistrez l’adresse du point d’accès <code>https://mcp.histoirerurale.ch/mcp</code> comme serveur MCP. Les étapes exactes varient selon la plateforme, voir les instructions dans la section suivante.</li><li><strong>Poser vos questions.</strong> Formulez votre première requête en langage courant. Une syntaxe de recherche peut être utilisée (en complément).</li></ol>',
    examples_h: 'Outils du serveur MCP',
    tips_h: 'Manières d’utiliser le MCP',
    tips: '<ul><li><strong>Travailler par itérations.</strong> Commencez par une requête largement formulée et ne restreignez que dans un deuxième temps : d’abord « associations de paysannes », puis « seulement canton de Berne », puis « texte intégral du document X ».</li><li><strong>Demander les renvois.</strong> Les notices, en particulier dans le portail « Personnes et institutions », sont reliées entre elles (parenté, adhésions, prédécesseurs et successeurs de fonctionnaires, etc.). Demandez : « Quelles autres personnes sont liées à la notice Schnyder, Bertha (1887-1968)--DB3219 ? »</li><li><strong>Chercher en plusieurs langues.</strong> Les ressources en ligne sont multilingues ; les prompts peuvent être complétés ainsi : « Cherche aussi en anglais et en français ».</li><li><strong>Vérifier les sources.</strong> Pour toute citation, indiquez toujours la notice source via l’URL en direct fournie (<code>recherche2.histoirerurale.ch</code>).</li><li><strong>Tenir compte du périmètre.</strong> L’assistant ne trouve que ce qui est déposé dans le portail AGHIST.</li><li><strong>Retracer les recherches effectuées.</strong> La plupart des assistants IA affichent dans la conversation les requêtes réellement exécutées (souvent sous forme de blocs dépliables comme « Used afa-recherche search »). Jetez-y un œil : vous verrez avec quels termes et filtres la recherche a été menée et reconnaîtrez si elle était trop étroite ou trop large. Le résumé de l’assistant n’est pas la même chose que le résultat de recherche.</li></ul>',
    reliability_h: "Un mot sur la fiabilité",
    reliability: '<p>Les assistants IA sont un outil de recherche, pas une source. Deux caractéristiques méritent l\'attention de l\'historien ou de l\'historienne :</p>'
      + '<p><strong>Les résultats ne sont pas reproductibles.</strong> Posez deux fois la même question et l\'assistant peut formuler d\'autres requêtes, sélectionner d\'autres résultats et mettre d\'autres accents dans son résumé. Ce que vous trouvez aujourd\'hui, un collègue ne le trouvera peut-être pas demain avec la même question. Notez donc ce qui compte : les identifiants de documents, les liens vers les notices originales et les numéros de dossier. Ceux-ci sont stables et citables, la conversation ne l\'est pas.</p>'
      + '<p><strong>La reproductibilité connaît des degrés.</strong> Plus la saisie est précise, plus le résultat est répétable. Une question en langage courant laisse à l\'assistant de nombreuses décisions (outil, termes de recherche, filtres). Une requête notée explicitement comme <code>search_entities({"entity_type": "person", "query": "Ineichen"})</code> fixe ces décisions et livre les mêmes résultats tant que les fonds n\'ont pas changé. Recommandation : questionner librement pour explorer, mais copier et documenter la requête réellement exécutée depuis la conversation pour les résultats centraux. Pour une reproductibilité totale, appelez l\'interface directement par script (voir la référence technique). Seul le résumé de l\'assistant reste variable dans tous les cas.</p>'
      + '<p><strong>Les résumés peuvent contenir des erreurs.</strong> L\'assistant peut raccourcir des contenus, relier des faits de manière erronée ou, dans le pire des cas, inventer des détails absents de la source. Traitez sa production comme l\'exposé d\'un assistant de recherche : utile comme point d\'entrée et vue d\'ensemble, mais toute affirmation destinée à un travail doit être vérifiée sur la notice originale.</p>'
      + '<p><strong>Des modèles qui réduisent la dispersion.</strong> Deux réponses identiques ne sont pas à attendre, même avec la meilleure consigne. En revanche, on peut limiter ce que l’assistant décide lui-même : le code source contient des modèles de prompts qui fixent les appels de recherche, le schéma de sortie, la date de consultation et une somme de contrôle sur les identifiants trouvés, ainsi que des modèles pour la recherche sourcée, pour les listes de résultats complètes et pour les dossiers de personnes à champs fixes, plus un modèle permettant à quelqu’un d’autre de refaire votre résultat et de nommer l’écart. Cela rend les exécutions plus comparables et les omissions plus visibles. Cela ne garantit pas l’identité. Voir <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>'
      + '<p>En bref : l\'assistant remplace le masque de recherche, pas la critique des sources.</p>',
    techref_h: "Référence technique",
    techref_p: 'Cette section s\'adresse aux développeurs et développeuses ainsi qu\'à toute personne souhaitant comprendre précisément comment l\'assistant effectue ses recherches.',
    endpoint_h: "Point d'accès MCP",
    endpoint_p: 'Transport : <em>Streamable HTTP</em>. Authentification : aucune. À ajouter dans les clients MCP comme serveur distant avec cette URL.',
    sysprompt_h: 'Prompt système du serveur',
    sysprompt: '<p>Un serveur MCP ne fournit pas seulement des outils au client, mais aussi un texte d\'instructions (champ <code>instructions</code>) transmis à chaque connexion. Le client le place devant le modèle de langue. Il influence donc le soin avec lequel un assistant travaille, sans que l\'utilisateur ait à configurer quoi que ce soit.</p><p>Aujourd\'hui, le serveur AfA y décrit les fonds et les outils. Le code source contient en plus une proposition détaillée d\'étendre ce texte par des règles de travail visant à réduire la dispersion des réponses : étayer chaque affirmation par un identifiant de document et un lien, ne pas répondre à partir de l\'extrait abrégé mais consulter la notice, trier par identifiant plutôt que par pertinence pour des résultats répétables, parcourir la liste jusqu\'au bout avant de parler de « tous les résultats », et signaler les contradictions entre notices avec les deux identifiants au lieu de les trancher. Même ainsi, la sélection et la formulation de l\'assistant restent variables : les règles réduisent les omissions et le hasard, elles ne les suppriment pas.</p><p>En complément, et utilisables recherche par recherche, il y a les modèles de prompts mentionnés dans la section sur la fiabilité : format de recette avec somme de contrôle, modèles de travail et vérification par un tiers. Le tout se trouve dans <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>',
    direct_h: "Accès direct sans IA",
    direct_intro: '<p>Pour les utilisateurs et utilisatrices techniques, le serveur MCP s\'utilise aussi sans assistant IA, comme une API ordinaire. MCP repose sur JSON-RPC via HTTP : chaque outil peut être appelé directement, par exemple avec <code>curl</code> ou depuis un script (voir « Clients MCP personnalisés »). C\'est la voie vers une reproductibilité totale : même requête, mêmes résultats, sans modèle de langage intermédiaire.</p>',
    direct_notes: '<p>La réponse contient la liste des résultats au format JSON dans le champ <code>result.content[0].text</code>. Deux remarques : l\'en-tête <code>Accept</code> doit mentionner les deux types de contenu (<code>application/json, text/event-stream</code>), sinon le serveur refuse la requête. Et le handshake <code>initialize</code> habituel du protocole MCP n\'est pas requis, car le serveur fonctionne sans état ; les appels isolés fonctionnent directement. Le serveur convient ainsi aussi aux analyses quantitatives et aux projets d\'humanités numériques : comparer les nombres de résultats entre fonds, interroger systématiquement des corpus ou intégrer les résultats dans ses propres outils.</p>',
    integration_h: 'Clients : intégration dans les LLM et autres logiciels',
    integration_p: 'Cliquez ci-dessous sur le client concerné pour les instructions détaillées. L’URL du point d’accès est toujours la même : <code>https://mcp.histoirerurale.ch/mcp</code>.',
    claude_web: '<strong>claude.ai (Web)</strong>: Settings → <em>Connectors</em> → <em>Add custom connector</em> → saisir l\'URL :',
    claude_desktop: '<strong>Claude Desktop</strong> : dans <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> (macOS) ou <code>%APPDATA%\\Claude\\claude_desktop_config.json</code> (Windows), ajouter :',
    claude_restart: "Redémarrer Claude Desktop ensuite.",
    chatgpt: 'Dans ChatGPT → Settings → <em>Connectors</em> → <em>Custom connectors</em> → <em>New connector</em> :',
    chatgpt_use: 'Activer le connecteur dans la conversation via "+ Tools". Également utilisable dans les Custom GPTs comme Action / serveur MCP.',
    cursor: 'Dans <code>~/.cursor/mcp.json</code> (ou <em>Settings → MCP → Add new MCP server</em>) :',
    cursor_loads: "Cursor charge la configuration immédiatement ; les outils apparaissent dans le panneau Agent.",
    perplexity: 'Dans Perplexity → Settings → <em>Connectors</em> → <em>Add connector</em> → <em>MCP Server</em> :',
    perplexity_space: "Dans les Spaces, le connecteur peut être activé par espace de travail.",
    vscode: 'Dans <code>.vscode/mcp.json</code> au niveau du projet ou globalement via <em>MCP: Open User Configuration</em> :',
    vscode_use: 'Sélectionner le <em>mode Agent</em> dans le panneau Copilot Chat ; les outils sont alors disponibles.',
    cli_intro: "Appel unique dans n'importe quel terminal :",
    cli_done: "Disponible ensuite dans chaque session Claude Code.",
    custom_clients_h: "Clients MCP personnalisés (Python / TypeScript)",
    custom_py: 'Python avec le SDK officiel <code>mcp</code> :',
    custom_ts: 'TypeScript/Node avec <code>@modelcontextprotocol/sdk</code> de manière analogue : StreamableHTTPClientTransport avec la même URL.',
    tools_h: "Outils",
    th_name: "Nom",
    th_function: "Fonction",
    tool_search: "Recherche en plein texte sur tous les fonds, filtre hiérarchique optionnel.",
    tool_search_entities: 'Personnes, institutions ou exploitations (paramètre <code>entity_type</code>).',
    tool_search_av: 'Fonds photographiques et filmiques (limitable à <code>photos</code> / <code>films</code>).',
    tool_search_params: '<table><thead><tr><th>Paramètre</th><th>Type</th><th>Défaut</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Requête Lucene (expressions entre "…", <code>AND</code>/<code>OR</code>/<code>NOT</code>, jokers <code>*</code> et <code>?</code>).</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Langue préférée pour titre/extrait: <code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code>. Pas un filtre ; rétrograde sur les autres langues.</td></tr>'
      + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
      + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>Résultats par page (1–100).</td></tr>'
      + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Curseur issu de <code>next_cursor</code> de la réponse précédente.</td></tr>'
      + '<tr><td><code>hierarchy</code></td><td>list[str]</td><td>-</td><td>IDs de hiérarchie pour restreindre (via OR, issus de <code>list_hierarchy</code>).</td></tr>'
      + '<tr><td><code>include_aggregations</code></td><td>bool</td><td>false</td><td>Inclure l\'agrégation hiérarchique.</td></tr>'
      + '</tbody></table>'
      + '<h3 style="margin-top:1rem">Retour (SearchResponse)</h3>'
      + '<table><thead><tr><th>Champ</th><th>Type</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>total</code></td><td>int</td><td>Nombre total de résultats (même au-delà de <code>size</code>).</td></tr>'
      + '<tr><td><code>hits</code></td><td>list[SearchHit]</td><td>Liste de résultats (max. <code>size</code> entrées).</td></tr>'
      + '<tr><td><code>next_cursor</code></td><td>list | null</td><td>À passer à <code>search_after</code> de la requête suivante ; <code>null</code> = plus de résultats.</td></tr>'
      + '<tr><td><code>aggregations</code></td><td>dict | null</td><td>Buckets hiérarchiques, uniquement si <code>include_aggregations=true</code>.</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem"><strong>Champs de SearchHit :</strong> <code>id</code>, <code>title</code>, <code>abstract</code>, <code>text</code> (extrait mis en évidence), <code>meta</code>, <code>hierarchy</code>, <code>collection</code>, <code>date</code> (ISO, optionnel), <code>is_pdf</code>, <code>document_url</code>, <code>original_url</code>, <code>sort</code>.</p>',
    tool_search_entities_params: '<table><thead><tr><th>Paramètre</th><th>Type</th><th>Défaut</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Requête Lucene.</td></tr>'
      + '<tr><td><code>entity_type</code></td><td>enum</td><td><code>any</code></td><td><code>person</code>|<code>institution</code>|<code>farm</code>|<code>any</code>. <code>company</code> reste comme alias obsolète pour <code>farm</code>.</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
      + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
      + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
      + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Curseur de pagination.</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem"><strong>Retour :</strong> <code>SearchResponse</code> (voir <code>search</code>) ; les hits sont restreints aux personnes/institutions/exploitations.</p>',
    tool_search_av_params: '<table><thead><tr><th>Paramètre</th><th>Type</th><th>Défaut</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Requête Lucene.</td></tr>'
      + '<tr><td><code>media_type</code></td><td>enum</td><td>-</td><td><code>photos</code> = uniquement photos, <code>films</code> = uniquement films; sans précision les deux.</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
      + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
      + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
      + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Curseur de pagination.</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem"><strong>Retour :</strong> <code>SearchResponse</code> (voir <code>search</code>) ; les hits sont restreints aux fonds photographiques/filmiques.</p>',
    tool_edition_params: '<table><thead><tr><th>Paramètre</th><th>Type</th><th>Défaut</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Requête Lucene.</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
      + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
      + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
      + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Curseur de pagination.</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem"><strong>Retour :</strong> <code>SearchResponse</code> (voir <code>search</code>) ; les hits sont restreints à l\'édition en question.</p>',
    tool_fetch_params: '<table><thead><tr><th>Paramètre</th><th>Type</th><th>Défaut</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>id</code></td><td>str</td><td>obligatoire</td><td>ID du document, ex. <code>AfA_Personen_001_DB9920</code>. Depuis le champ <code>id</code> d\'une réponse <code>search</code>.</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Langue préférée pour titre/texte.</td></tr>'
      + '</tbody></table>'
      + '<h3 style="margin-top:1rem">Retour (SearchHit, sans texte intégral)</h3>'
      + '<ul>'
      + '<li><strong>Métadonnées :</strong> <code>id</code>, <code>title</code>, <code>abstract</code>, <code>meta</code>, <code>hierarchy</code> (chemin de collection), <code>collection</code> (libellé), <code>date</code> (ISO, optionnel), <code>is_pdf</code>.</li>'
      + '<li><code>document_url</code> : lien vers le fichier PDF ou HTML dans le <strong>portail de recherche</strong> (<code>recherche2.histoirerurale.ch</code>).</li>'
      + '<li><code>original_url</code> : <strong>lien profond vers le portail source</strong>, c\'est-à-dire le site depuis lequel le scraper a récupéré le document (p. ex. <code>histoirerurale.ch</code> ; variable selon le fonds).</li>'
      + '</ul>'
      + '<p><code>null</code> si l\'ID n\'est pas trouvé.</p>',
    tool_list_h_params: '<table><thead><tr><th>Paramètre</th><th>Type</th><th>Défaut</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Requête plein texte optionnelle.</td></tr>'
      + '<tr><td><code>size</code></td><td>int</td><td>200</td><td>Nombre max. d\'entrées hiérarchiques (1–10 000).</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Langue des libellés.</td></tr>'
      + '</tbody></table>'
      + '<h3 style="margin-top:1rem">Retour (HierarchyResponse)</h3>'
      + '<table><thead><tr><th>Champ</th><th>Type</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>entries</code></td><td>list[HierarchyEntry]</td><td>Par entrée : <code>id</code> (ID hiérarchique), <code>count</code> (nombre de résultats), <code>label</code> (libellé lisible).</td></tr>'
      + '</tbody></table>',
    tool_server_info_params: '<p>Aucun paramètre.</p>'
      + '<h3 style="margin-top:1rem">Retour (dict)</h3>'
      + '<table><thead><tr><th>Champ</th><th>Type</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>name</code></td><td>str</td><td>Nom du serveur (<code>afa-mcp</code>).</td></tr>'
      + '<tr><td><code>version</code></td><td>str</td><td>Semver.</td></tr>'
      + '<tr><td><code>elasticsearch_url</code></td><td>str</td><td>URL du backend Elasticsearch.</td></tr>'
      + '<tr><td><code>languages</code></td><td>list[str]</td><td><code>de</code>, <code>fr</code>, <code>it</code>, <code>en</code></td></tr>'
      + '<tr><td><code>sort_orders</code></td><td>list[str]</td><td>Valeurs acceptées pour <code>sort</code>.</td></tr>'
      + '<tr><td><code>hierarchy_constants</code></td><td>dict</td><td>Constantes parlantes (ex. <code>PERSONS</code>, <code>EDITION_BOBBETT</code>) → chaînes d\'ID hiérarchique.</td></tr>'
      + '</tbody></table>',
    tool_ed_hofstetter: "Édition Mina Hofstetter.",
    tool_ed_gr: "Édition Augusta Gillabert-Randin.",
    tool_ed_bobbett: "Édition Elizabeth Bobbett.",
    tool_fetch: "Document individuel avec texte intégral à partir de son identifiant.",
    tool_list_h: "Buckets hiérarchiques avec nombre de résultats.",
    tool_server_info: "Informations sur la version et le point d'accès.",
    tools_note: 'La recherche plein texte et les filtres hiérarchiques se combinent librement, p. ex. <code>search(query="ferme", hierarchy=["AfA_FotoFilm"])</code> pour toutes les images de ferme. Plusieurs identifiants hiérarchiques sont reliés par OR, et par AND avec la recherche plein texte.',
    discovery_h: "Points de découverte",
    disc_mcp: "Manifeste du serveur MCP",
    disc_card: "A2A Agent Card",
    disc_llms: "Description orientée LLM / robots d'indexation",
    footer: 'Portail de recherche : <a href="https://www.recherche2.histoirerurale.ch">recherche2.histoirerurale.ch</a> · Institution porteuse : <a href="https://histoirerurale.ch">Archives d\'histoire rurale</a> · Code source : <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server">GitHub</a>',
    poweredby: 'powered by <a href="https://histoirerurale.ch">AfA</a> et <a href="https://www.pansoft.de/">Pansoft</a>'
  },
  it: {
    nav_intro: 'Introduzione',
    call_intro: 'Per questa richiesta l’assistente richiama questo strumento:',
    more_tools_h: 'Altri strumenti',
    tools_intro: '<p>Ecco come utilizzare il server MCP:<br> per impostazione predefinita su tutti i portali, richieste specifiche qui sotto</p>',
    ex1_h: 'Ricerca di persone',
    ex1_q: '«Cerca sul server MCP AGHIST i membri del Gran Consiglio (Landrat) del Canton Nidvaldo e presentali in una tabella Excel con le colonne cognome, nome, numero AfA, data di nascita, data di morte e anni di carica.»',
    ex1_tool: 'Strumento: Ricerca di persone',
    ex2_h: 'Ricerca di istituzioni',
    ex2_q: '«Cerca sul server MCP AGHIST le associazioni di contadine e di donne rurali in Svizzera. Come sono organizzate oggi a livello nazionale? In che misura è cambiato nel tempo? Rappresentazione in un diagramma adeguato.»',
    ex2_tool: 'Strumento: Ricerca di istituzioni',
    ex3_h: 'Ricerca di foto e film',
    ex3_q: '«Esistono fotografie e film sulla meccanizzazione (ma non motorizzazione) dell’agricoltura nella prima metà del XX secolo? Crea un elenco con titolo e URL live alla voce.»',
    ex3_tool: 'Strumento: Ricerca di foto e film',
    ex4_h: 'Edizioni digitali',
    ex4_q: '«Esplora l’edizione Gillabert-Randin alla ricerca di passaggi sul suffragio femminile e citali.»',
    ex4_tool: 'Strumento: Edizioni digitali',
    ex5_h: 'Consultare il testo integrale delle voci',
    ex5_q: '«Recupera il testo integrale della voce Ineichen, Franz (1887-1953)--DB1734 e indicami i riferimenti alle fonti ivi riportati.»',
    ex5_tool: 'Strumento: Consultare il testo integrale delle voci',
    nav_clients: 'Client',
    nav_examples: 'Strumenti',
    nav_tips: 'Consigli',
    nav_reliability: 'Affidabilità',
    nav_reference: 'Tecnica',
    brand: "Archivio di storia rurale",
    subtitle: "Interfaccia MCP dell'Archivio di storia rurale",
    intro: 'Ricerca a testo pieno predisposta per i modelli nel <a href="https://www.recherche2.histoirerurale.ch">portale di ricerca</a> dell\'<a href="https://histoirerurale.ch">Archivio di storia rurale</a>: persone, istituzioni, aziende, fonti audiovisive, fondi d\'archivio, edizioni digitali e pubblicazioni. Accessibile tramite il Model Context Protocol (Streamable HTTP) direttamente da Claude, ChatGPT, Cursor, Perplexity e tutti gli altri client compatibili con MCP.',
    guide_h: "Come funziona la ricerca",
    guide_p: '<p>Una volta configurato, ponete le vostre domande di ricerca in linguaggio corrente: l\'assistente esplora i fondi per voi, combina le interrogazioni, segue i rinvii e riassume i risultati. Per esempio:</p>'
      + '<blockquote>«Cerca persone con il cognome Ineichen.»</blockquote>'
      + '<p>L\'assistente trova 79 persone, riconosce che molte appartengono alla famiglia del Sentenhof in Argovia e presenta chiaramente la successione delle generazioni. Potete poi approfondire: «Mostrami di più su Franz Ineichen» oppure «Ci sono fotografie?»</p>',
    holdings_h: "Che cosa si può consultare?",
    holdings: '<table><thead><tr><th>Fondo</th><th>Contenuto</th></tr></thead><tbody>'
      + '<tr><td><strong>Persone</strong></td><td>Schede biografiche di attori e attrici della società rurale: date di vita, funzioni, legami di parentela, riferimenti alle fonti</td></tr>'
      + '<tr><td><strong>Istituzioni</strong></td><td>Associazioni, cooperative, autorità e altre organizzazioni</td></tr>'
      + '<tr><td><strong>Aziende</strong></td><td>Aziende agricole e imprese</td></tr>'
      + '<tr><td><strong>Foto &amp; film</strong></td><td>Fonti audiovisive: fotografie e film</td></tr>'
      + '<tr><td><strong>Edizioni digitali</strong></td><td>Tre corpora di fonti edite: Mina Hofstetter, Augusta Gillabert-Randin, Elizabeth Bobbett</td></tr>'
      + '<tr><td><strong>Fondi d\'archivio</strong></td><td>Inventari dei fondi d\'archivio dell\'ASR</td></tr>'
      + '<tr><td><strong>Pubblicazioni &amp; stampa</strong></td><td>Pubblicazioni e copertura mediatica</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem">Tutti i contenuti sono indicizzati in quattro lingue (tedesco, francese, italiano, inglese).</p>',
    setup_h: "Configurazione in tre passi",
    setup_steps: '<ol><li><strong>Scegliere un assistente IA.</strong> Serve un accesso a Claude (claude.ai o app desktop), ChatGPT (Plus/Team/Enterprise), Perplexity Pro oppure un ambiente di sviluppo come Cursor o VS Code.</li><li><strong>Collegare il server (aggiungere un connettore, aggiungere un’app).</strong> Registrate l’indirizzo dell’endpoint <code>https://mcp.histoirerurale.ch/mcp</code> come server MCP. I passaggi esatti variano a seconda della piattaforma, vedi le istruzioni nella sezione successiva.</li><li><strong>Iniziare a chiedere.</strong> Formulate la vostra prima richiesta in linguaggio corrente. Una sintassi di ricerca può essere usata (in aggiunta).</li></ol>',
    examples_h: 'Strumenti del server MCP',
    tips_h: 'Modi di utilizzare l’MCP',
    tips: '<ul><li><strong>Lavorare per iterazioni.</strong> Iniziate con una richiesta formulata in modo ampio e restringete solo in un secondo momento: prima «associazioni di contadine», poi «solo Canton Berna», poi «testo integrale del documento X».</li><li><strong>Chiedere i rinvii.</strong> Le voci, in particolare nel portale «Persone e istituzioni», sono collegate fra loro (parentele, appartenenze, predecessori e successori di funzionari e funzionarie, ecc.). Chiedete: «Quali altre persone sono collegate alla voce Schnyder, Bertha (1887-1968)--DB3219?»</li><li><strong>Cercare in più lingue.</strong> Le risorse online sono plurilingui, i prompt possono essere completati così: «Cerca anche in inglese e in francese».</li><li><strong>Verificare le fonti.</strong> Per le citazioni indicate sempre la voce di origine tramite l’URL live fornito (<code>recherche2.histoirerurale.ch</code>).</li><li><strong>Tenere conto dello scope.</strong> L’assistente trova solo ciò che è depositato nel portale AGHIST.</li><li><strong>Ripercorrere le ricerche effettuate.</strong> La maggior parte degli assistenti IA mostra nella conversazione le interrogazioni realmente eseguite (spesso come blocchi espandibili tipo «Used afa-recherche search»). Dateci un’occhiata: vedrete con quali termini e filtri è stata condotta la ricerca e riconoscerete se era troppo ristretta o troppo ampia. Il riassunto dell’assistente non è la stessa cosa del risultato di ricerca.</li></ul>',
    reliability_h: "Una parola sull'affidabilità",
    reliability: '<p>Gli assistenti IA sono uno strumento di ricerca, non una fonte. Due caratteristiche meritano l\'attenzione dello storico o della storica:</p>'
      + '<p><strong>I risultati non sono riproducibili.</strong> Ponete due volte la stessa domanda e l\'assistente può formulare interrogazioni diverse, selezionare altri risultati e porre accenti diversi nel riassunto. Ciò che trovate oggi, un collega potrebbe non trovarlo domani con la stessa domanda. Annotate quindi ciò che conta: gli identificativi dei documenti, i link alle schede originali e i numeri di dossier. Questi sono stabili e citabili, la conversazione no.</p>'
      + '<p><strong>La riproducibilità ha dei gradi.</strong> Più precisa è l\'immissione, più ripetibile è il risultato. Una domanda in linguaggio corrente lascia all\'assistente molte decisioni (strumento, termini di ricerca, filtri). Un\'interrogazione annotata esplicitamente come <code>search_entities({"entity_type": "person", "query": "Ineichen"})</code> fissa queste decisioni e restituisce gli stessi risultati finché i fondi non cambiano. Raccomandazione: chiedere liberamente per esplorare, ma per i risultati centrali copiare e documentare l\'interrogazione realmente eseguita dalla conversazione. Chi ha bisogno di piena riproducibilità chiama l\'interfaccia direttamente via script (vedi riferimento tecnico). Solo il riassunto dell\'assistente resta in ogni caso variabile.</p>'
      + '<p><strong>I riassunti possono contenere errori.</strong> L\'assistente può abbreviare contenuti, collegare fatti in modo errato o, nel peggiore dei casi, inventare dettagli assenti dalla fonte. Trattate il suo output come la relazione di un assistente di ricerca: utile come punto di partenza e panoramica, ma ogni affermazione destinata a un lavoro va verificata sulla scheda originale.</p>'
      + '<p><strong>Modelli che riducono la dispersione.</strong> Due risposte identiche non sono da attendersi nemmeno con la migliore indicazione. Si può però limitare quanto decide l’assistente da sé: nel codice sorgente si trovano modelli di prompt che fissano chiamate di ricerca, schema di output, data di consultazione e una somma di controllo sugli identificatori trovati, oltre a modelli per la ricerca documentata, per elenchi completi di risultati e per dossier personali a campi fissi, e un modello con cui un’altra persona ricalcola il vostro risultato e nomina lo scostamento. Questo rende le esecuzioni più confrontabili e le omissioni più visibili. Non garantisce l’identità. Vedi <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>'
      + '<p>In breve: l\'assistente sostituisce la maschera di ricerca, non la critica delle fonti.</p>',
    techref_h: "Riferimento tecnico",
    techref_p: 'Questa sezione si rivolge a sviluppatori e sviluppatrici e a chiunque voglia capire con precisione come l\'assistente effettua le ricerche.',
    endpoint_h: "Endpoint MCP",
    endpoint_p: 'Trasporto: <em>Streamable HTTP</em>. Autenticazione: nessuna. Da inserire nei client MCP come server remoto con questo URL.',
    sysprompt_h: 'Prompt di sistema del server',
    sysprompt: '<p>Un server MCP non fornisce al client soltanto strumenti, ma anche un testo di istruzioni (campo <code>instructions</code>) consegnato a ogni connessione. Il client lo anteponde al modello linguistico e influisce quindi sulla cura con cui un assistente lavora, senza che l\'utente debba configurare nulla.</p><p>Oggi il server AfA vi descrive i fondi e gli strumenti. Nel codice sorgente si trova inoltre una proposta articolata di estendere questo testo con regole di lavoro volte a ridurre la dispersione delle risposte: documentare ogni affermazione con identificatore e link, non rispondere partendo dall\'estratto abbreviato ma consultare la voce, ordinare per identificatore invece che per pertinenza per risultati ripetibili, scorrere l\'elenco fino in fondo prima di parlare di «tutti i risultati» e indicare le contraddizioni fra voci con entrambi gli identificatori invece di risolverle. Anche così selezione e formulazione dell\'assistente restano variabili: le regole riducono omissioni e casualità, non le eliminano.</p><p>A complemento, e utilizzabili ricerca per ricerca, ci sono i modelli di prompt citati nella sezione sull\'affidabilità: formato di ricetta con somma di controllo, modelli di lavoro e verifica esterna. Tutto si trova in <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>',
    direct_h: "Accesso diretto senza IA",
    direct_intro: '<p>Per utenti tecnici, il server MCP è utilizzabile anche senza assistente IA, come una normale API. MCP si basa su JSON-RPC via HTTP: ogni strumento può essere richiamato direttamente, per esempio con <code>curl</code> o da uno script (vedi «Client MCP personalizzati»). È la strada verso la piena riproducibilità: stessa chiamata, stessi risultati, senza modello linguistico intermedio.</p>',
    direct_notes: '<p>La risposta contiene l\'elenco dei risultati in formato JSON nel campo <code>result.content[0].text</code>. Due note: l\'intestazione <code>Accept</code> deve indicare entrambi i tipi di contenuto (<code>application/json, text/event-stream</code>), altrimenti il server rifiuta la richiesta. E l\'usuale handshake <code>initialize</code> del protocollo MCP non è necessario, perché il server è privo di stato; le singole chiamate funzionano direttamente. Il server si presta così anche ad analisi quantitative e progetti di digital humanities: confrontare i numeri di risultati tra i fondi, interrogare sistematicamente i corpora o integrare i risultati nei propri strumenti.</p>',
    integration_h: 'Client: integrazione in LLM e altri software',
    integration_p: 'Cliccate qui sotto sul rispettivo client per le istruzioni dettagliate. L’URL dell’endpoint è sempre lo stesso: <code>https://mcp.histoirerurale.ch/mcp</code>.',
    claude_web: '<strong>claude.ai (Web)</strong>: Settings → <em>Connectors</em> → <em>Add custom connector</em> → inserire l\'URL:',
    claude_desktop: '<strong>Claude Desktop</strong>: in <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> (macOS) o <code>%APPDATA%\\Claude\\claude_desktop_config.json</code> (Windows), aggiungere:',
    claude_restart: "Riavviare poi Claude Desktop.",
    chatgpt: 'In ChatGPT → Settings → <em>Connectors</em> → <em>Custom connectors</em> → <em>New connector</em>:',
    chatgpt_use: 'Attivare il connettore nella chat tramite "+ Tools". Anche nei Custom GPTs come Action / server MCP.',
    cursor: 'In <code>~/.cursor/mcp.json</code> (oppure <em>Settings → MCP → Add new MCP server</em>):',
    cursor_loads: "Cursor carica la configurazione immediatamente; gli strumenti appaiono nel pannello Agent.",
    perplexity: 'In Perplexity → Settings → <em>Connectors</em> → <em>Add connector</em> → <em>MCP Server</em>:',
    perplexity_space: "Negli Spaces il connettore può essere attivato per ogni area di lavoro.",
    vscode: 'In <code>.vscode/mcp.json</code> nel workspace o globalmente tramite <em>MCP: Open User Configuration</em>:',
    vscode_use: 'Selezionare la <em>modalità Agent</em> nel pannello Copilot Chat; gli strumenti saranno disponibili.',
    cli_intro: "Comando una tantum in qualsiasi terminale:",
    cli_done: "Successivamente disponibile in ogni sessione Claude Code.",
    custom_clients_h: "Client MCP personalizzati (Python / TypeScript)",
    custom_py: 'Python con l\'SDK ufficiale <code>mcp</code>:',
    custom_ts: 'TypeScript/Node con <code>@modelcontextprotocol/sdk</code> in modo analogo: StreamableHTTPClientTransport con lo stesso URL.',
    tools_h: "Strumenti",
    th_name: "Nome",
    th_function: "Funzione",
    tool_search: "Ricerca a testo pieno su tutti i fondi, filtro gerarchico opzionale.",
    tool_search_entities: 'Persone, istituzioni o aziende (parametro <code>entity_type</code>).',
    tool_search_av: 'Fondi fotografici e cinematografici (limitabili a <code>photos</code> / <code>films</code>).',
    tool_search_params: '<table><thead><tr><th>Parametro</th><th>Tipo</th><th>Default</th><th>Descrizione</th></tr></thead><tbody>'
      + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Query Lucene (frasi tra "…", <code>AND</code>/<code>OR</code>/<code>NOT</code>, jolly <code>*</code> e <code>?</code>).</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Lingua preferita per titolo/estratto: <code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code>. Non è un filtro; ripiega sulle altre lingue.</td></tr>'
      + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
      + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>Risultati per pagina (1–100).</td></tr>'
      + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Cursore da <code>next_cursor</code> della risposta precedente.</td></tr>'
      + '<tr><td><code>hierarchy</code></td><td>list[str]</td><td>-</td><td>ID gerarchici per restringere (via OR, da <code>list_hierarchy</code>).</td></tr>'
      + '<tr><td><code>include_aggregations</code></td><td>bool</td><td>false</td><td>Includere aggregazione gerarchica.</td></tr>'
      + '</tbody></table>'
      + '<h3 style="margin-top:1rem">Risposta (SearchResponse)</h3>'
      + '<table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrizione</th></tr></thead><tbody>'
      + '<tr><td><code>total</code></td><td>int</td><td>Numero totale di risultati (anche oltre <code>size</code>).</td></tr>'
      + '<tr><td><code>hits</code></td><td>list[SearchHit]</td><td>Elenco risultati (max <code>size</code> voci).</td></tr>'
      + '<tr><td><code>next_cursor</code></td><td>list | null</td><td>Passare a <code>search_after</code> della richiesta successiva; <code>null</code> = nessun altro risultato.</td></tr>'
      + '<tr><td><code>aggregations</code></td><td>dict | null</td><td>Bucket gerarchici, solo con <code>include_aggregations=true</code>.</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem"><strong>Campi SearchHit:</strong> <code>id</code>, <code>title</code>, <code>abstract</code>, <code>text</code> (frammento evidenziato), <code>meta</code>, <code>hierarchy</code>, <code>collection</code>, <code>date</code> (ISO, opzionale), <code>is_pdf</code>, <code>document_url</code>, <code>original_url</code>, <code>sort</code>.</p>',
    tool_search_entities_params: '<table><thead><tr><th>Parametro</th><th>Tipo</th><th>Default</th><th>Descrizione</th></tr></thead><tbody>'
      + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Query Lucene.</td></tr>'
      + '<tr><td><code>entity_type</code></td><td>enum</td><td><code>any</code></td><td><code>person</code>|<code>institution</code>|<code>farm</code>|<code>any</code>. <code>company</code> resta come alias deprecato di <code>farm</code>.</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
      + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
      + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
      + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Cursore di paginazione.</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem"><strong>Risposta:</strong> <code>SearchResponse</code> (vedi <code>search</code>); i risultati sono limitati a persone/istituzioni/aziende.</p>',
    tool_search_av_params: '<table><thead><tr><th>Parametro</th><th>Tipo</th><th>Default</th><th>Descrizione</th></tr></thead><tbody>'
      + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Query Lucene.</td></tr>'
      + '<tr><td><code>media_type</code></td><td>enum</td><td>-</td><td><code>photos</code> = solo foto, <code>films</code> = solo film; senza specifica entrambi.</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
      + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
      + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
      + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Cursore di paginazione.</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem"><strong>Risposta:</strong> <code>SearchResponse</code> (vedi <code>search</code>); i risultati sono limitati a fondi fotografici/cinematografici.</p>',
    tool_edition_params: '<table><thead><tr><th>Parametro</th><th>Tipo</th><th>Default</th><th>Descrizione</th></tr></thead><tbody>'
      + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Query Lucene.</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
      + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
      + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
      + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Cursore di paginazione.</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem"><strong>Risposta:</strong> <code>SearchResponse</code> (vedi <code>search</code>); i risultati sono limitati all\'edizione specifica.</p>',
    tool_fetch_params: '<table><thead><tr><th>Parametro</th><th>Tipo</th><th>Default</th><th>Descrizione</th></tr></thead><tbody>'
      + '<tr><td><code>id</code></td><td>str</td><td>obbligatorio</td><td>ID documento, es. <code>AfA_Personen_001_DB9920</code>. Dal campo <code>id</code> di una risposta <code>search</code>.</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Lingua preferita per titolo/testo.</td></tr>'
      + '</tbody></table>'
      + '<h3 style="margin-top:1rem">Risposta (SearchHit, senza testo integrale)</h3>'
      + '<ul>'
      + '<li><strong>Metadati:</strong> <code>id</code>, <code>title</code>, <code>abstract</code>, <code>meta</code>, <code>hierarchy</code> (percorso della collezione), <code>collection</code> (etichetta), <code>date</code> (ISO, opzionale), <code>is_pdf</code>.</li>'
      + '<li><code>document_url</code>: link al file PDF o HTML nel <strong>portale di ricerca</strong> (<code>recherche2.histoirerurale.ch</code>).</li>'
      + '<li><code>original_url</code>: <strong>deep link al portale sorgente</strong>, ovvero il sito da cui lo scraper ha recuperato il documento (es. <code>histoirerurale.ch</code>; varia a seconda del fondo).</li>'
      + '</ul>'
      + '<p><code>null</code> se l\'ID non è trovato.</p>',
    tool_list_h_params: '<table><thead><tr><th>Parametro</th><th>Tipo</th><th>Default</th><th>Descrizione</th></tr></thead><tbody>'
      + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Query full-text opzionale.</td></tr>'
      + '<tr><td><code>size</code></td><td>int</td><td>200</td><td>Numero max. di voci gerarchiche (1–10 000).</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Lingua delle etichette.</td></tr>'
      + '</tbody></table>'
      + '<h3 style="margin-top:1rem">Risposta (HierarchyResponse)</h3>'
      + '<table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrizione</th></tr></thead><tbody>'
      + '<tr><td><code>entries</code></td><td>list[HierarchyEntry]</td><td>Per voce: <code>id</code> (ID gerarchico), <code>count</code> (numero risultati), <code>label</code> (etichetta leggibile).</td></tr>'
      + '</tbody></table>',
    tool_server_info_params: '<p>Nessun parametro.</p>'
      + '<h3 style="margin-top:1rem">Risposta (dict)</h3>'
      + '<table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrizione</th></tr></thead><tbody>'
      + '<tr><td><code>name</code></td><td>str</td><td>Nome del server (<code>afa-mcp</code>).</td></tr>'
      + '<tr><td><code>version</code></td><td>str</td><td>Semver.</td></tr>'
      + '<tr><td><code>elasticsearch_url</code></td><td>str</td><td>URL del backend Elasticsearch.</td></tr>'
      + '<tr><td><code>languages</code></td><td>list[str]</td><td><code>de</code>, <code>fr</code>, <code>it</code>, <code>en</code></td></tr>'
      + '<tr><td><code>sort_orders</code></td><td>list[str]</td><td>Valori accettati per <code>sort</code>.</td></tr>'
      + '<tr><td><code>hierarchy_constants</code></td><td>dict</td><td>Costanti parlanti (es. <code>PERSONS</code>, <code>EDITION_BOBBETT</code>) → stringhe ID di gerarchia.</td></tr>'
      + '</tbody></table>',
    tool_ed_hofstetter: "Edizione Mina Hofstetter.",
    tool_ed_gr: "Edizione Augusta Gillabert-Randin.",
    tool_ed_bobbett: "Edizione Elizabeth Bobbett.",
    tool_fetch: "Singolo documento con testo integrale tramite il suo ID.",
    tool_list_h: "Bucket gerarchici con numero di risultati.",
    tool_server_info: "Informazioni su versione ed endpoint.",
    tools_note: 'Ricerca a testo pieno e filtri gerarchici sono liberamente combinabili, p. es. <code>search(query="fattoria", hierarchy=["AfA_FotoFilm"])</code> per tutte le immagini di fattoria. Più ID gerarchici sono uniti con OR, con la ricerca testuale con AND.',
    discovery_h: "Endpoint di discovery",
    disc_mcp: "Manifest del server MCP",
    disc_card: "A2A Agent Card",
    disc_llms: "Descrizione orientata a LLM / crawler",
    footer: 'Portale di ricerca: <a href="https://www.recherche2.histoirerurale.ch">recherche2.histoirerurale.ch</a> · Istituzione promotrice: <a href="https://histoirerurale.ch">Archivio di storia rurale</a> · Codice sorgente: <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server">GitHub</a>',
    poweredby: 'powered by <a href="https://histoirerurale.ch">AfA</a> e <a href="https://www.pansoft.de/">Pansoft</a>'
  },
  en: {
    nav_intro: 'Introduction',
    call_intro: 'For this request the assistant calls this tool:',
    more_tools_h: 'Further tools',
    tools_intro: '<p>This is how you can use the MCP server:<br> across all portals by default, specific queries below</p>',
    ex1_h: 'Person research',
    ex1_q: '"Search the AGHIST MCP server for members of the cantonal parliament (Landrat) of Nidwalden and present them in an Excel table with the columns surname, first name, AfA number, date of birth, date of death and years in office."',
    ex1_tool: 'Person research tool',
    ex2_h: 'Institution search',
    ex2_q: '"Search the AGHIST MCP server for farm women\'s and countrywomen\'s associations in Switzerland. How are they organised at national level today? How did that change over time? Present it in a suitable diagram."',
    ex2_tool: 'Institution search tool',
    ex3_h: 'Photo and film search',
    ex3_q: '"Are there photographs and films on the mechanisation (but not motorisation) of agriculture in the first half of the 20th century? Compile a list with title and live URL to the entry."',
    ex3_tool: 'Photo and film search tool',
    ex4_h: 'Digital editions',
    ex4_q: '"Search the Gillabert-Randin edition for passages on women\'s suffrage and quote them."',
    ex4_tool: 'Digital editions tool',
    ex5_h: 'Consulting the full text of entries',
    ex5_q: '"Fetch the full text of the entry Ineichen, Franz (1887-1953)--DB1734 and give me the source references stated there."',
    ex5_tool: 'Consulting the full text of entries tool',
    nav_clients: 'Clients',
    nav_examples: 'Tools',
    nav_tips: 'Tips',
    nav_reliability: 'Reliability',
    nav_reference: 'Technical',
    brand: "Archives of Rural History",
    subtitle: "MCP interface to the Archives of Rural History",
    intro: 'Model-ready full-text search across the <a href="https://www.recherche2.histoirerurale.ch">research portal</a> of the <a href="https://histoirerurale.ch">Archives of Rural History</a>: persons, institutions, farms, audiovisual sources, archive holdings, digital editions and publications. Accessible via the Model Context Protocol (Streamable HTTP) directly from Claude, ChatGPT, Cursor, Perplexity and any other MCP-capable client.',
    guide_h: "How research works",
    guide_p: '<p>Once connected, you ask your research questions in plain language: the assistant searches the holdings for you, combines queries, follows cross-references and summarises the results. For example:</p>'
      + '<blockquote>"Search for persons named Ineichen."</blockquote>'
      + '<p>The assistant finds 79 persons, recognises that many of them belong to the Sentenhof family in Aargau, and lays out the succession of generations clearly. You can then follow up: "Show me more about Franz Ineichen" or "Are there any photos?"</p>',
    holdings_h: "What can be searched?",
    holdings: '<table><thead><tr><th>Holding</th><th>Content</th></tr></thead><tbody>'
      + '<tr><td><strong>Persons</strong></td><td>Biographical entries on actors of rural society: life dates, functions, family relations, source references</td></tr>'
      + '<tr><td><strong>Institutions</strong></td><td>Associations, cooperatives, authorities and other organisations</td></tr>'
      + '<tr><td><strong>Farms</strong></td><td>Agricultural holdings and enterprises</td></tr>'
      + '<tr><td><strong>Photo &amp; film</strong></td><td>Audiovisual sources: photographs and films</td></tr>'
      + '<tr><td><strong>Digital editions</strong></td><td>Three edited source corpora: Mina Hofstetter, Augusta Gillabert-Randin, Elizabeth Bobbett</td></tr>'
      + '<tr><td><strong>Archive holdings</strong></td><td>Inventories of the ARH archive holdings</td></tr>'
      + '<tr><td><strong>Publications &amp; media</strong></td><td>Publications and media coverage</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem">All content is indexed in four languages (German, French, Italian, English).</p>',
    setup_h: "Set up in three steps",
    setup_steps: '<ol><li><strong>Choose an AI assistant.</strong> You need access to Claude (claude.ai or the desktop app), ChatGPT (Plus/Team/Enterprise), Perplexity Pro, or a development environment such as Cursor or VS Code.</li><li><strong>Connect the server (add connector, add app).</strong> Register the endpoint address <code>https://mcp.histoirerurale.ch/mcp</code> as an MCP server. The exact steps differ per platform, see the instructions in the next section.</li><li><strong>Start asking.</strong> Pose your first research question in plain language. A search syntax can be used (in addition).</li></ol>',
    examples_h: 'Tools of the MCP server',
    tips_h: 'Ways to use the MCP',
    tips: '<ul><li><strong>Work iteratively.</strong> Start with a broadly framed query and narrow it down only in a second step: first "farm women\'s associations", then "canton of Bern only", then "full text of document X".</li><li><strong>Ask for cross-references.</strong> The entries, especially in the "Persons and institutions" portal, are interlinked (kinship, memberships, predecessors and successors in office, and so on). Ask: "Which other persons are linked to the entry Schnyder, Bertha (1887-1968)--DB3219?"</li><li><strong>Search in several languages.</strong> The online resources are multilingual; prompts can be extended like this: "Search in English and French as well".</li><li><strong>Verify sources.</strong> For quotations, always give the source entry via the live URL provided (<code>recherche2.histoirerurale.ch</code>).</li><li><strong>Mind the scope.</strong> The assistant only finds what is held in the AGHIST portal.</li><li><strong>Retrace the searches.</strong> Most AI assistants show in the conversation which queries they actually executed (usually as expandable blocks such as "Used afa-recherche search"). Take a look inside: you will see which terms and filters were used and can tell whether a search was too narrow or too broad. The assistant\'s summary is not the same as the search result.</li></ul>',
    reliability_h: "A word on reliability",
    reliability: '<p>AI assistants are a research tool, not a source. As a historian, keep two properties in mind:</p>'
      + '<p><strong>Results are not reproducible.</strong> Ask the same question twice and the assistant may formulate different queries, select different hits and set different emphases in its summary. What you find today, a fellow student may not find tomorrow with the same question. Therefore record what matters: the document IDs, the links to the original entries and the dossier numbers. These are stable and citable, the chat transcript is not.</p>'
      + '<p><strong>Reproducibility comes in degrees.</strong> The more precise the input, the more repeatable the result. A question in plain language leaves many decisions to the assistant (tool, search terms, filters). An explicitly noted query such as <code>search_entities({"entity_type": "person", "query": "Ineichen"})</code> pins these decisions down and returns the same hits as long as the holdings are unchanged. Recommendation: ask freely while exploring, but for key findings copy the actually executed query from the conversation and document it. If you need full reproducibility, call the interface directly via script (see the technical reference). Only the assistant\'s summary remains variable in every case.</p>'
      + '<p><strong>Summaries can contain errors.</strong> The assistant may shorten content, connect facts incorrectly or, at worst, invent details that are not in the source. Treat its output like a research assistant\'s briefing: useful as an entry point and overview, but every statement that goes into a paper must be verified against the original entry.</p>'
      + '<p><strong>Templates that narrow the spread.</strong> Two identical answers are not to be expected, not even with the best instructions. What can be limited is how much the assistant decides on its own: the source code holds prompt templates that pin down search calls, output schema, retrieval date and a checksum over the identifiers found, plus templates for sourced research, for complete result lists and for person dossiers with fixed fields, and one with which someone else redoes your result and names the deviation. That makes runs more comparable and omissions more visible. It does not guarantee sameness. See <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>'
      + '<p>In short: the assistant replaces the search form, not source criticism.</p>',
    techref_h: "Technical reference",
    techref_p: 'This section is aimed at developers and at anyone who wants to understand precisely how the assistant searches.',
    endpoint_h: "MCP endpoint",
    endpoint_p: 'Transport: <em>Streamable HTTP</em>. Authentication: none. Add it to MCP-capable clients as a remote server with this URL.',
    sysprompt_h: 'System prompt of the server',
    sysprompt: '<p>An MCP server hands the client not only tools but also a text of instructions (field <code>instructions</code>) on every connection. The client places it in front of the language model, so it shapes how carefully an assistant works without anyone having to configure a thing.</p><p>Today the AfA server uses it to describe the holdings and the tools. The source code additionally holds a worked-out proposal to extend that text with working rules that narrow the spread of answers: back every statement with a document ID and link, do not answer from the shortened result snippet but fetch the record, sort by ID rather than relevance when results must be repeatable, page to the end of the result list before saying "all hits", and report contradictions between records with both identifiers instead of resolving them. Even then the assistant\'s selection and phrasing stay variable: the rules reduce omissions and chance, they do not remove them.</p><p>Alongside it, usable per search, are the prompt templates mentioned in the reliability section: recipe format with checksum, working templates and a third party check. Both live in <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>',
    direct_h: "Direct access without AI",
    direct_intro: '<p>For technical users, the MCP server can also be used without an AI assistant, much like an ordinary API. MCP is built on JSON-RPC over HTTP: every tool can be called directly, for example with <code>curl</code> or from a script (see "Custom MCP clients"). This is the path to full reproducibility: same call, same hits, no language model in between.</p>',
    direct_notes: '<p>The response contains the hit list as JSON in the <code>result.content[0].text</code> field. Two notes: the <code>Accept</code> header must name both content types (<code>application/json, text/event-stream</code>), otherwise the server rejects the request. And the usual MCP <code>initialize</code> handshake is not required, because the server runs statelessly; single calls work directly. This makes the server suitable for quantitative analysis and digital-humanities projects too: comparing hit counts across holdings, querying corpora systematically, or integrating results into your own tools.</p>',
    integration_h: 'Clients: integration into LLMs and other software',
    integration_p: 'Click the respective client below for the detailed instructions. The endpoint URL is always the same: <code>https://mcp.histoirerurale.ch/mcp</code>.',
    claude_web: '<strong>claude.ai (Web)</strong>: Settings → <em>Connectors</em> → <em>Add custom connector</em> → enter the URL:',
    claude_desktop: '<strong>Claude Desktop</strong>: in <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> (macOS) or <code>%APPDATA%\\Claude\\claude_desktop_config.json</code> (Windows), add:',
    claude_restart: "Then restart Claude Desktop.",
    chatgpt: 'In ChatGPT → Settings → <em>Connectors</em> → <em>Custom connectors</em> → <em>New connector</em>:',
    chatgpt_use: 'Enable the connector in chat via "+ Tools". Also usable in Custom GPTs as Action / MCP server.',
    cursor: 'In <code>~/.cursor/mcp.json</code> (or <em>Settings → MCP → Add new MCP server</em>):',
    cursor_loads: "Cursor loads the configuration immediately; tools appear in the Agent panel.",
    perplexity: 'In Perplexity → Settings → <em>Connectors</em> → <em>Add connector</em> → <em>MCP Server</em>:',
    perplexity_space: "In Spaces, the connector can be enabled per workspace.",
    vscode: 'In <code>.vscode/mcp.json</code> at the workspace level, or globally via <em>MCP: Open User Configuration</em>:',
    vscode_use: 'Select <em>Agent mode</em> in the Copilot Chat panel; the tools are then available.',
    cli_intro: "One-off invocation in any terminal:",
    cli_done: "Available in every Claude Code session afterwards.",
    custom_clients_h: "Custom MCP clients (Python / TypeScript)",
    custom_py: 'Python with the official <code>mcp</code> SDK:',
    custom_ts: 'TypeScript/Node with <code>@modelcontextprotocol/sdk</code> in the same fashion: StreamableHTTPClientTransport with the same URL.',
    tools_h: "Tools",
    th_name: "Name",
    th_function: "Function",
    tool_search: "Full-text search across all holdings, optionally with a hierarchy filter.",
    tool_search_entities: 'Persons, institutions or farms (parameter <code>entity_type</code>).',
    tool_search_av: 'Photographic and film holdings (optionally narrowed to <code>photos</code> / <code>films</code>).',
    tool_search_params: '<table><thead><tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene query string (phrases in "…", <code>AND</code>/<code>OR</code>/<code>NOT</code>, wildcards <code>*</code> and <code>?</code>).</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Preferred language for title/highlight: <code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code>. Not a filter; falls back to other languages.</td></tr>'
      + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
      + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>Hits per page (1–100).</td></tr>'
      + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Cursor from <code>next_cursor</code> of the previous response.</td></tr>'
      + '<tr><td><code>hierarchy</code></td><td>list[str]</td><td>-</td><td>Hierarchy IDs to restrict (OR-combined, from <code>list_hierarchy</code>).</td></tr>'
      + '<tr><td><code>include_aggregations</code></td><td>bool</td><td>false</td><td>Include hierarchy aggregation in the response.</td></tr>'
      + '</tbody></table>'
      + '<h3 style="margin-top:1rem">Response (SearchResponse)</h3>'
      + '<table><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>total</code></td><td>int</td><td>Total number of hits (also beyond <code>size</code>).</td></tr>'
      + '<tr><td><code>hits</code></td><td>list[SearchHit]</td><td>Hit list (max. <code>size</code> entries).</td></tr>'
      + '<tr><td><code>next_cursor</code></td><td>list | null</td><td>Pass to <code>search_after</code> of the next request; <code>null</code> = no more hits.</td></tr>'
      + '<tr><td><code>aggregations</code></td><td>dict | null</td><td>Hierarchy buckets, only when <code>include_aggregations=true</code>.</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem"><strong>SearchHit fields:</strong> <code>id</code>, <code>title</code>, <code>abstract</code>, <code>text</code> (highlight snippet), <code>meta</code>, <code>hierarchy</code>, <code>collection</code>, <code>date</code> (ISO, optional), <code>is_pdf</code>, <code>document_url</code>, <code>original_url</code>, <code>sort</code>.</p>',
    tool_search_entities_params: '<table><thead><tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene query string.</td></tr>'
      + '<tr><td><code>entity_type</code></td><td>enum</td><td><code>any</code></td><td><code>person</code>|<code>institution</code>|<code>farm</code>|<code>any</code>. <code>company</code> remains as a deprecated alias for <code>farm</code>.</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
      + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
      + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
      + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Pagination cursor.</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem"><strong>Response:</strong> <code>SearchResponse</code> (see <code>search</code>); hits are restricted to persons/institutions/farms.</p>',
    tool_search_av_params: '<table><thead><tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene query string.</td></tr>'
      + '<tr><td><code>media_type</code></td><td>enum</td><td>-</td><td><code>photos</code> = photos only, <code>films</code> = films only; unset = both.</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
      + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
      + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
      + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Pagination cursor.</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem"><strong>Response:</strong> <code>SearchResponse</code> (see <code>search</code>); hits are restricted to photo/film holdings.</p>',
    tool_edition_params: '<table><thead><tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Lucene query string.</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td><code>de</code>|<code>fr</code>|<code>it</code>|<code>en</code></td></tr>'
      + '<tr><td><code>sort</code></td><td>enum</td><td><code>relevance</code></td><td><code>relevance</code>|<code>date</code>|<code>id</code></td></tr>'
      + '<tr><td><code>size</code></td><td>int</td><td>20</td><td>1–100.</td></tr>'
      + '<tr><td><code>search_after</code></td><td>list</td><td>-</td><td>Pagination cursor.</td></tr>'
      + '</tbody></table>'
      + '<p style="margin-top:.6rem"><strong>Response:</strong> <code>SearchResponse</code> (see <code>search</code>); hits are restricted to the specific edition.</p>',
    tool_fetch_params: '<table><thead><tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>id</code></td><td>str</td><td>required</td><td>Document ID, e.g. <code>AfA_Personen_001_DB9920</code>. From the <code>id</code> field of a <code>search</code> response.</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Preferred language for title/text.</td></tr>'
      + '</tbody></table>'
      + '<h3 style="margin-top:1rem">Response (SearchHit, without full text)</h3>'
      + '<ul>'
      + '<li><strong>Metadata:</strong> <code>id</code>, <code>title</code>, <code>abstract</code>, <code>meta</code>, <code>hierarchy</code> (collection path), <code>collection</code> (label), <code>date</code> (ISO, optional), <code>is_pdf</code>.</li>'
      + '<li><code>document_url</code>: link to the PDF or HTML file in the <strong>research portal</strong> (<code>recherche2.histoirerurale.ch</code>).</li>'
      + '<li><code>original_url</code>: <strong>deep link into the source portal</strong>, i.e. the website the scraper fetched the document from (e.g. <code>histoirerurale.ch</code>; varies by holding).</li>'
      + '</ul>'
      + '<p><code>null</code> if the ID is not found.</p>',
    tool_list_h_params: '<table><thead><tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>query</code></td><td>str</td><td><code>*</code></td><td>Optional full-text query.</td></tr>'
      + '<tr><td><code>size</code></td><td>int</td><td>200</td><td>Max. number of hierarchy entries (1–10 000).</td></tr>'
      + '<tr><td><code>language</code></td><td>enum</td><td>-</td><td>Label language.</td></tr>'
      + '</tbody></table>'
      + '<h3 style="margin-top:1rem">Response (HierarchyResponse)</h3>'
      + '<table><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>entries</code></td><td>list[HierarchyEntry]</td><td>Per entry: <code>id</code> (hierarchy ID), <code>count</code> (hit count), <code>label</code> (human-readable label).</td></tr>'
      + '</tbody></table>',
    tool_server_info_params: '<p>No parameters.</p>'
      + '<h3 style="margin-top:1rem">Response (dict)</h3>'
      + '<table><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody>'
      + '<tr><td><code>name</code></td><td>str</td><td>Server name (<code>afa-mcp</code>).</td></tr>'
      + '<tr><td><code>version</code></td><td>str</td><td>Semver.</td></tr>'
      + '<tr><td><code>elasticsearch_url</code></td><td>str</td><td>Elasticsearch backend URL.</td></tr>'
      + '<tr><td><code>languages</code></td><td>list[str]</td><td><code>de</code>, <code>fr</code>, <code>it</code>, <code>en</code></td></tr>'
      + '<tr><td><code>sort_orders</code></td><td>list[str]</td><td>Accepted values for <code>sort</code>.</td></tr>'
      + '<tr><td><code>hierarchy_constants</code></td><td>dict</td><td>Speaking constants (e.g. <code>PERSONS</code>, <code>EDITION_BOBBETT</code>) → hierarchy ID strings.</td></tr>'
      + '</tbody></table>',
    tool_ed_hofstetter: "Mina Hofstetter Edition.",
    tool_ed_gr: "Augusta Gillabert-Randin Edition.",
    tool_ed_bobbett: "Elizabeth Bobbett Edition.",
    tool_fetch: "Single document including full text via its ID.",
    tool_list_h: "Hierarchy buckets with document counts.",
    tool_server_info: "Version and endpoint information.",
    tools_note: 'Full-text search and hierarchy filters can be combined freely, e.g. <code>search(query="farmhouse", hierarchy=["AfA_FotoFilm"])</code> for all farmhouse pictures. Multiple hierarchy IDs are combined with OR, and with the full-text query via AND.',
    discovery_h: "Discovery endpoints",
    disc_mcp: "MCP server manifest",
    disc_card: "A2A agent card",
    disc_llms: "LLM-/crawler-friendly description",
    footer: 'Research portal: <a href="https://www.recherche2.histoirerurale.ch">recherche2.histoirerurale.ch</a> · Hosting institution: <a href="https://histoirerurale.ch">Archives of Rural History</a> · Source code: <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server">GitHub</a>',
    poweredby: 'powered by <a href="https://histoirerurale.ch">AfA</a> and <a href="https://www.pansoft.de/">Pansoft</a>'
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
