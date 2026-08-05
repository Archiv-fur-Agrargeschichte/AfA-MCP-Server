const I18N = {
  de: {
    brand: "Archiv für Agrargeschichte",
    brand_bar: "Archiv für Agrargeschichte · MCP-Server",
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
    setup_steps: '<ol>'
      + '<li><strong>KI-Assistent wählen.</strong> Sie brauchen einen Zugang zu Claude (claude.ai oder Desktop-App), ChatGPT (Plus/Team/Enterprise), Perplexity Pro oder einer Entwicklungsumgebung wie Cursor oder VS Code.</li>'
      + '<li><strong>Server verbinden.</strong> Tragen Sie die Adresse <code>https://mcp.histoirerurale.ch/mcp</code> als MCP-Server ein. Die genauen Schritte unterscheiden sich je nach Plattform, siehe die Anleitungen im nächsten Abschnitt.</li>'
      + '<li><strong>Losfragen.</strong> Stellen Sie Ihre erste Rechercheanfrage in normaler Sprache. Keine Suchsyntax nötig.</li>'
      + '</ol>',
    examples_h: "Beispiel-Recherchen",
    examples: '<p>Die folgenden Prompts können Sie direkt übernehmen und anpassen:</p>'
      + '<p><strong>Personenrecherche</strong></p><blockquote>«Suche im Agrararchiv nach Personen mit dem Namen Moser und fasse zusammen, in welchen Organisationen sie aktiv waren.»</blockquote>'
      + '<p><strong>Institutionengeschichte</strong></p><blockquote>«Was findet sich im Archiv zum Schweizerischen Bäuerinnen- und Landfrauenverband? Liste die wichtigsten Dokumente und verknüpften Personen auf.»</blockquote>'
      + '<p><strong>Bildquellen</strong></p><blockquote>«Gibt es Fotografien zur Mechanisierung der Landwirtschaft in den 1950er Jahren?»</blockquote>'
      + '<p><strong>Digitale Editionen</strong></p><blockquote>«Durchsuche die Edition Gillabert-Randin nach Einträgen zum Ersten Weltkrieg und zitiere die relevanten Stellen.»</blockquote>'
      + '<p><strong>Quellenkritische Vertiefung</strong></p><blockquote>«Hol den Volltext des Dokuments zu Franz Ineichen und nenne mir die dort angegebenen Quellen und Dossier-Nummern.»</blockquote>'
      + '<p><strong>Themenübergreifend</strong></p><blockquote>«Ich schreibe eine Seminararbeit zur Rolle der Landfrauenverbände in der Zwischenkriegszeit. Welche Bestände im AfA sind dafür relevant? Suche in Personen, Institutionen und Publikationen.»</blockquote>',
    tips_h: "Tipps für gute Ergebnisse",
    tips: '<ul>'
      + '<li><strong>Iterativ arbeiten.</strong> Beginnen Sie breit, verengen Sie dann: erst «Landfrauenverbände», dann «nur Kanton Bern», dann «Volltext von Dokument X».</li>'
      + '<li><strong>Nach Querverweisen fragen.</strong> Die Einträge sind stark vernetzt (Verwandtschaft, Mitgliedschaften). Fragen Sie: «Welche Personen sind mit diesem Eintrag verknüpft?»</li>'
      + '<li><strong>Sprache angeben, wenn nötig.</strong> Die Bestände sind mehrsprachig; bei französischen Quellen hilft: «Suche auf Französisch nach…»</li>'
      + '<li><strong>Quellen verifizieren.</strong> Der Assistent fasst zusammen; für Zitate in wissenschaftlichen Arbeiten immer den Original-Eintrag über den mitgelieferten Link (<code>recherche2.histoirerurale.ch</code>) prüfen. Dossier-Nummern (z.B. «AfA Personendossier Nr. 396») verweisen auf die physischen Bestände.</li>'
      + '<li><strong>Grenzen kennen.</strong> Der Assistent findet nur, was digital erschlossen ist. Nicht-digitalisierte Bestände erreichen Sie über die Dossier-Nummern und eine Anfrage beim AfA.</li>'
      + '<li><strong>Suchwege nachvollziehen.</strong> Die meisten KI-Assistenten zeigen im Chatverlauf an, welche Suchanfragen sie tatsächlich ausgeführt haben (meist als aufklappbare Blöcke wie «Used afa-recherche search»). Werfen Sie einen Blick hinein: So sehen Sie, mit welchen Begriffen und Filtern gesucht wurde, und erkennen, ob eine Recherche zu eng oder zu breit angelegt war. Die Zusammenfassung des Assistenten ist nicht dasselbe wie das Suchergebnis.</li>'
      + '</ul>',
    semantic_h: "Wie sucht der Assistent eigentlich?",
    semantic: '<p>Der MCP-Server selbst sucht rein lexikalisch, also nach Zeichenketten: Terme, Phrasen, Wildcards, Wortstämme (die Suchtechnik dahinter ist Elasticsearch). Er kennt keine Bedeutungen. «Bäuerin» findet nicht von allein «Landfrau».</p>'
      + '<p>Die scheinbare inhaltliche Suche entsteht durch das Sprachmodell davor. Das ist der eigentliche Kniff der Architektur, und er zeigt sich in mehreren Handgriffen:</p>'
      + '<ul>'
      + '<li><strong>Begriffe erweitern:</strong> Sie fragen «Frauen in der Landwirtschaft», das Modell sucht zusätzlich nach «Bäuerin», «Landfrau», «Landfrauenverband», «bäuerliche Hauswirtschaft» und kombiniert die Ergebnisse.</li>'
      + '<li><strong>Übersetzen:</strong> Frage auf Deutsch, das Modell sucht in französischen Beständen auch nach «paysanne».</li>'
      + '<li><strong>Umformulieren bei null Treffern:</strong> Findet eine Suche nichts, probiert das Modell Synonyme, andere Schreibweisen oder Wildcards (<code>Ineich*</code>).</li>'
      + '<li><strong>Nachträglich ordnen:</strong> Aus 79 Treffern erkennt das Modell inhaltlich, dass viele zur selben Familie gehören, und gruppiert entsprechend.</li>'
      + '<li><strong>Konzeptfragen auf Quellen:</strong> «Wie beschreibt Hofstetter die Mechanisierung?» wird zu mehreren Wortsuchen (Maschine, Traktor, Motor…) plus einer inhaltlichen Zusammenfassung der Fundstellen.</li>'
      + '</ul>'
      + '<p>Als Merksatz: Die Suchmaschine findet Zeichenketten, das Sprachmodell versteht Konzepte und übersetzt zwischen beidem. Der MCP-Server ist die Verbindung dazwischen. Eine echte Bedeutungssuche (per Vektor-Index) wäre ein denkbares künftiges Server-Feature, würde dem Modell aber nur Arbeit abnehmen, nichts grundsätzlich Neues ermöglichen.</p>',
    reliability_h: "Ein Wort zur Verlässlichkeit",
    reliability: '<p>KI-Assistenten sind ein Recherchewerkzeug, keine Quelle. Zwei Eigenschaften sollten Sie als Historikerin oder Historiker im Blick behalten:</p>'
      + '<p><strong>Ergebnisse sind nicht reproduzierbar.</strong> Stellen Sie dieselbe Frage zweimal, kann der Assistent unterschiedliche Suchanfragen formulieren, andere Treffer auswählen und zu anderen Schwerpunkten in der Zusammenfassung kommen. Was Sie heute finden, findet eine Kommilitonin morgen mit derselben Frage vielleicht nicht. Halten Sie deshalb fest, was zählt: die Dokument-IDs, die Links zu den Originaleinträgen und die Dossier-Nummern. Diese sind stabil und zitierfähig, der Chatverlauf ist es nicht.</p>'
      + '<p><strong>Reproduzierbarkeit hat Stufen.</strong> Je genauer die Eingabe, desto wiederholbarer das Ergebnis. Eine Frage in natürlicher Sprache lässt dem Assistenten viele Entscheidungen offen (Werkzeug, Suchbegriffe, Filter). Ein explizit notierter Suchaufruf wie <code>search_entities({"entity_type": "person", "query": "Ineichen"})</code> legt diese Entscheidungen fest und liefert bei unverändertem Bestand dieselben Treffer. Empfehlung: beim Explorieren frei fragen, für zentrale Befunde aber den tatsächlich ausgeführten Suchaufruf aus dem Chatverlauf kopieren und dokumentieren. Wer volle Reproduzierbarkeit braucht, ruft die Schnittstelle direkt per Skript auf (siehe technische Referenz). Nur die Zusammenfassung des Assistenten bleibt in jedem Fall variabel.</p>'
      + '<p><strong>Zusammenfassungen können Fehler enthalten.</strong> Der Assistent kann Inhalte verkürzen, Zusammenhänge falsch verknüpfen oder im schlechtesten Fall Details erfinden, die so nicht in der Quelle stehen. Behandeln Sie seine Ausgabe wie das Referat einer Hilfskraft: nützlich als Einstieg und Überblick, aber jede Aussage, die in eine Arbeit einfliesst, gehört am Original-Eintrag verifiziert.</p>'
      + '<p><strong>Vorlagen für nachvollziehbare Recherchen.</strong> Wer ein Ergebnis so festhalten will, dass eine andere Person es in einem anderen Chat wiederholen kann, findet im Quellcode fertige Prompt-Vorlagen: ein Rezept-Format, das Suchaufrufe, Ausgabeschema, Abrufdatum und eine Prüfsumme über die gefundenen Kennungen zusammenhält, Vorlagen für belegte Recherche, vollständige Trefferlisten und Personendossiers mit festen Feldern, sowie eine Vorlage zur Fremdprüfung. Siehe <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>'
      + '<p>Kurz: Der Assistent ersetzt die Suchmaske, nicht die Quellenkritik.</p>',
    techref_h: "Technische Referenz",
    techref_p: 'Dieser Abschnitt richtet sich an Entwicklerinnen und Entwickler sowie an alle, die genauer wissen wollen, wie der Assistent sucht.',
    endpoint_h: "MCP-Endpoint",
    endpoint_p: 'Transport: <em>Streamable HTTP</em>. Authentifizierung: keine. In MCP-fähigen Clients als Remote-Server mit dieser URL eintragen.',
    sysprompt_h: 'Systemprompt des Servers',
    sysprompt: '<p>Ein MCP-Server liefert dem Client bei jeder Verbindung nicht nur Werkzeuge, sondern auch einen Text mit Anweisungen (Feld <code>instructions</code>). Der Client stellt ihn dem Sprachmodell voran. Er entscheidet damit mit, wie sorgfältig ein Assistent arbeitet, ohne dass Nutzende etwas einrichten müssen.</p><p>Der AfA-Server beschreibt darin heute die Bestände und die Werkzeuge. Im Quellcode liegt zusätzlich ein ausgearbeiteter Vorschlag, diesen Text um Arbeitsregeln zu erweitern, die auf Nachvollziehbarkeit zielen: jede Aussage mit Dokument-ID und Link belegen, nicht aus dem gekürzten Trefferausschnitt antworten sondern den Eintrag abrufen, für wiederholbare Ergebnisse nach ID sortieren statt nach Relevanz, vor der Aussage «alle Treffer» bis zum Ende der Trefferliste blättern, und Widersprüche zwischen Einträgen mit beiden Kennungen nennen statt sie aufzulösen.</p><p>Ergänzend dazu, und für Recherchen einzeln einsetzbar, gibt es die Prompt-Vorlagen aus dem Abschnitt zur Verlässlichkeit: Rezept-Format mit Prüfsumme, Arbeitsvorlagen und Fremdprüfung. Beides liegt zusammen in <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>',
    direct_h: "Direktzugriff ohne KI",
    direct_intro: '<p>Für technisch versierte Nutzerinnen und Nutzer ist der MCP-Server auch ohne KI-Assistent nutzbar, ähnlich einer gewöhnlichen API. MCP basiert auf JSON-RPC über HTTP: Jedes Werkzeug lässt sich direkt aufrufen, etwa per <code>curl</code> oder aus einem Skript (siehe «Eigene MCP-Clients»). Das ist der Weg zu voller Reproduzierbarkeit: gleicher Aufruf, gleiche Treffer, kein Sprachmodell dazwischen.</p>',
    direct_notes: '<p>Die Antwort enthält die Trefferliste als JSON im Feld <code>result.content[0].text</code>. Zwei Hinweise: Der <code>Accept</code>-Header muss beide Inhaltstypen nennen (<code>application/json, text/event-stream</code>), sonst lehnt der Server die Anfrage ab. Und der sonst übliche <code>initialize</code>-Handshake des MCP-Protokolls entfällt, weil der Server zustandslos betrieben wird; einzelne Aufrufe funktionieren direkt. Damit eignet sich der Server auch für quantitative Auswertungen und Digital-Humanities-Projekte: Trefferzahlen über Bestände vergleichen, Korpora systematisch abfragen oder Ergebnisse in eigene Werkzeuge einbinden.</p>',
    integration_h: "Integration in KI-Systeme",
    integration_p: 'Klick auf den jeweiligen Client für die genaue Anleitung. Die URL ist immer dieselbe: <code>https://mcp.histoirerurale.ch/mcp</code>.',
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
    brand: "Archives d'histoire rurale",
    brand_bar: "Archives d'histoire rurale · Serveur MCP",
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
    setup_steps: '<ol>'
      + '<li><strong>Choisir un assistant IA.</strong> Il vous faut un accès à Claude (claude.ai ou application de bureau), ChatGPT (Plus/Team/Enterprise), Perplexity Pro ou un environnement de développement comme Cursor ou VS Code.</li>'
      + '<li><strong>Connecter le serveur.</strong> Enregistrez l\'adresse <code>https://mcp.histoirerurale.ch/mcp</code> comme serveur MCP. Les étapes exactes varient selon la plateforme, voir les instructions dans la section suivante.</li>'
      + '<li><strong>Poser vos questions.</strong> Formulez votre première requête en langage courant. Aucune syntaxe de recherche n\'est nécessaire.</li>'
      + '</ol>',
    examples_h: "Exemples de recherches",
    examples: '<p>Les requêtes suivantes peuvent être reprises et adaptées directement :</p>'
      + '<p><strong>Recherche de personnes</strong></p><blockquote>« Cherche dans les archives agraires des personnes portant le nom Moser et résume dans quelles organisations elles étaient actives. »</blockquote>'
      + '<p><strong>Histoire des institutions</strong></p><blockquote>« Que trouve-t-on dans les archives sur l\'Union suisse des paysannes et des femmes rurales ? Liste les documents les plus importants et les personnes associées. »</blockquote>'
      + '<p><strong>Sources iconographiques</strong></p><blockquote>« Existe-t-il des photographies sur la mécanisation de l\'agriculture dans les années 1950 ? »</blockquote>'
      + '<p><strong>Éditions numériques</strong></p><blockquote>« Parcours l\'édition Gillabert-Randin à la recherche d\'entrées sur la Première Guerre mondiale et cite les passages pertinents. »</blockquote>'
      + '<p><strong>Approfondissement critique</strong></p><blockquote>« Récupère le texte intégral du document sur Franz Ineichen et indique-moi les sources et numéros de dossier qui y figurent. »</blockquote>'
      + '<p><strong>Recherche transversale</strong></p><blockquote>« Je rédige un travail de séminaire sur le rôle des associations de paysannes dans l\'entre-deux-guerres. Quels fonds des AHR sont pertinents ? Cherche dans les personnes, les institutions et les publications. »</blockquote>',
    tips_h: "Conseils pour de bons résultats",
    tips: '<ul>'
      + '<li><strong>Travailler par itérations.</strong> Commencez large, puis affinez : d\'abord « associations de paysannes », puis « seulement canton de Berne », puis « texte intégral du document X ».</li>'
      + '<li><strong>Demander les renvois.</strong> Les notices sont fortement reliées entre elles (parenté, adhésions). Demandez : « Quelles personnes sont liées à cette notice ? »</li>'
      + '<li><strong>Préciser la langue si nécessaire.</strong> Les fonds sont multilingues ; pour des sources allemandes, il est utile de préciser : « Cherche en allemand… »</li>'
      + '<li><strong>Vérifier les sources.</strong> L\'assistant résume ; pour toute citation dans un travail scientifique, vérifiez toujours la notice originale via le lien fourni (<code>recherche2.histoirerurale.ch</code>). Les numéros de dossier (p. ex. « AfA Personendossier Nr. 396 ») renvoient aux fonds physiques.</li>'
      + '<li><strong>Connaître les limites.</strong> L\'assistant ne trouve que ce qui est indexé numériquement. Les fonds non numérisés restent accessibles via les numéros de dossier et une demande auprès des AHR.</li>'
      + '<li><strong>Retracer les recherches effectuées.</strong> La plupart des assistants IA affichent dans la conversation les requêtes réellement exécutées (souvent sous forme de blocs dépliables comme « Used afa-recherche search »). Jetez-y un œil : vous verrez avec quels termes et filtres la recherche a été menée et reconnaîtrez si elle était trop étroite ou trop large. Le résumé de l\'assistant n\'est pas la même chose que le résultat de recherche.</li>'
      + '</ul>',
    semantic_h: "Comment l'assistant cherche-t-il vraiment ?",
    semantic: '<p>Le serveur MCP lui-même effectue une recherche purement lexicale, c\'est-à-dire sur des chaînes de caractères : termes, expressions, jokers, racines de mots (la technologie sous-jacente est Elasticsearch). Il ne connaît pas les significations. « Bäuerin » (paysanne) ne trouve pas de lui-même « Landfrau » (femme rurale).</p>'
      + '<p>La recherche apparemment sémantique vient du modèle de langage placé en amont. C\'est là le vrai ressort de l\'architecture, visible dans plusieurs gestes :</p>'
      + '<ul>'
      + '<li><strong>Élargir les termes :</strong> vous demandez « les femmes dans l\'agriculture », le modèle cherche aussi « paysanne », « femme rurale », « association de paysannes », « économie domestique rurale » et combine les résultats.</li>'
      + '<li><strong>Traduire :</strong> question en français, le modèle cherche aussi « Bäuerin » dans les fonds germanophones.</li>'
      + '<li><strong>Reformuler en cas de zéro résultat :</strong> si une recherche ne donne rien, le modèle essaie des synonymes, d\'autres orthographes ou des jokers (<code>Ineich*</code>).</li>'
      + '<li><strong>Ordonner après coup :</strong> sur 79 résultats, le modèle reconnaît que beaucoup relèvent de la même famille et les regroupe.</li>'
      + '<li><strong>Questions conceptuelles sur les sources :</strong> « Comment Hofstetter décrit-elle la mécanisation ? » devient plusieurs recherches de mots (machine, tracteur, moteur…) suivies d\'une synthèse des passages trouvés.</li>'
      + '</ul>'
      + '<p>À retenir : le moteur de recherche trouve des chaînes de caractères, le modèle de langage comprend des concepts et fait la traduction entre les deux. Le serveur MCP est le lien entre eux. Une véritable recherche par le sens (via un index vectoriel) serait une évolution possible du serveur, mais elle ne ferait qu\'épargner du travail au modèle, sans rien permettre de fondamentalement nouveau.</p>',
    reliability_h: "Un mot sur la fiabilité",
    reliability: '<p>Les assistants IA sont un outil de recherche, pas une source. Deux caractéristiques méritent l\'attention de l\'historien ou de l\'historienne :</p>'
      + '<p><strong>Les résultats ne sont pas reproductibles.</strong> Posez deux fois la même question et l\'assistant peut formuler d\'autres requêtes, sélectionner d\'autres résultats et mettre d\'autres accents dans son résumé. Ce que vous trouvez aujourd\'hui, un collègue ne le trouvera peut-être pas demain avec la même question. Notez donc ce qui compte : les identifiants de documents, les liens vers les notices originales et les numéros de dossier. Ceux-ci sont stables et citables, la conversation ne l\'est pas.</p>'
      + '<p><strong>La reproductibilité connaît des degrés.</strong> Plus la saisie est précise, plus le résultat est répétable. Une question en langage courant laisse à l\'assistant de nombreuses décisions (outil, termes de recherche, filtres). Une requête notée explicitement comme <code>search_entities({"entity_type": "person", "query": "Ineichen"})</code> fixe ces décisions et livre les mêmes résultats tant que les fonds n\'ont pas changé. Recommandation : questionner librement pour explorer, mais copier et documenter la requête réellement exécutée depuis la conversation pour les résultats centraux. Pour une reproductibilité totale, appelez l\'interface directement par script (voir la référence technique). Seul le résumé de l\'assistant reste variable dans tous les cas.</p>'
      + '<p><strong>Les résumés peuvent contenir des erreurs.</strong> L\'assistant peut raccourcir des contenus, relier des faits de manière erronée ou, dans le pire des cas, inventer des détails absents de la source. Traitez sa production comme l\'exposé d\'un assistant de recherche : utile comme point d\'entrée et vue d\'ensemble, mais toute affirmation destinée à un travail doit être vérifiée sur la notice originale.</p>'
      + '<p><strong>Modèles pour des recherches vérifiables.</strong> Si vous voulez fixer un résultat de sorte qu\\\'une autre personne puisse le répéter dans une autre conversation, le code source contient des modèles de prompts prêts à l\\\'emploi : un format de recette réunissant les appels de recherche, le schéma de sortie, la date de consultation et une somme de contrôle sur les identifiants trouvés, des modèles pour la recherche sourcée, les listes de résultats complètes et les dossiers de personnes à champs fixes, ainsi qu\\\'un modèle de vérification par un tiers. Voir <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>'
      + '<p>En bref : l\'assistant remplace le masque de recherche, pas la critique des sources.</p>',
    techref_h: "Référence technique",
    techref_p: 'Cette section s\'adresse aux développeurs et développeuses ainsi qu\'à toute personne souhaitant comprendre précisément comment l\'assistant effectue ses recherches.',
    endpoint_h: "Point d'accès MCP",
    endpoint_p: 'Transport : <em>Streamable HTTP</em>. Authentification : aucune. À ajouter dans les clients MCP comme serveur distant avec cette URL.',
    sysprompt_h: 'Prompt système du serveur',
    sysprompt: '<p>Un serveur MCP ne fournit pas seulement des outils au client, mais aussi un texte d\'instructions (champ <code>instructions</code>) transmis à chaque connexion. Le client le place devant le modèle de langue. Il influence donc le soin avec lequel un assistant travaille, sans que l\'utilisateur ait à configurer quoi que ce soit.</p><p>Aujourd\'hui, le serveur AfA y décrit les fonds et les outils. Le code source contient en plus une proposition détaillée d\'étendre ce texte par des règles de travail visant la traçabilité : étayer chaque affirmation par un identifiant de document et un lien, ne pas répondre à partir de l\'extrait abrégé mais consulter la notice, trier par identifiant plutôt que par pertinence pour des résultats répétables, parcourir la liste jusqu\'au bout avant de parler de « tous les résultats », et signaler les contradictions entre notices avec les deux identifiants au lieu de les trancher.</p><p>En complément, et utilisables recherche par recherche, il y a les modèles de prompts mentionnés dans la section sur la fiabilité : format de recette avec somme de contrôle, modèles de travail et vérification par un tiers. Le tout se trouve dans <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>',
    direct_h: "Accès direct sans IA",
    direct_intro: '<p>Pour les utilisateurs et utilisatrices techniques, le serveur MCP s\'utilise aussi sans assistant IA, comme une API ordinaire. MCP repose sur JSON-RPC via HTTP : chaque outil peut être appelé directement, par exemple avec <code>curl</code> ou depuis un script (voir « Clients MCP personnalisés »). C\'est la voie vers une reproductibilité totale : même requête, mêmes résultats, sans modèle de langage intermédiaire.</p>',
    direct_notes: '<p>La réponse contient la liste des résultats au format JSON dans le champ <code>result.content[0].text</code>. Deux remarques : l\'en-tête <code>Accept</code> doit mentionner les deux types de contenu (<code>application/json, text/event-stream</code>), sinon le serveur refuse la requête. Et le handshake <code>initialize</code> habituel du protocole MCP n\'est pas requis, car le serveur fonctionne sans état ; les appels isolés fonctionnent directement. Le serveur convient ainsi aussi aux analyses quantitatives et aux projets d\'humanités numériques : comparer les nombres de résultats entre fonds, interroger systématiquement des corpus ou intégrer les résultats dans ses propres outils.</p>',
    integration_h: "Intégration dans les systèmes d'IA",
    integration_p: 'Cliquez sur le client concerné pour les instructions détaillées. L\'URL est toujours la même : <code>https://mcp.histoirerurale.ch/mcp</code>.',
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
    brand: "Archivio di storia rurale",
    brand_bar: "Archivio di storia rurale · Server MCP",
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
    setup_steps: '<ol>'
      + '<li><strong>Scegliere un assistente IA.</strong> Serve un accesso a Claude (claude.ai o app desktop), ChatGPT (Plus/Team/Enterprise), Perplexity Pro oppure un ambiente di sviluppo come Cursor o VS Code.</li>'
      + '<li><strong>Collegare il server.</strong> Registrate l\'indirizzo <code>https://mcp.histoirerurale.ch/mcp</code> come server MCP. I passaggi esatti variano a seconda della piattaforma, vedi le istruzioni nella sezione successiva.</li>'
      + '<li><strong>Iniziare a chiedere.</strong> Formulate la vostra prima richiesta in linguaggio corrente. Nessuna sintassi di ricerca necessaria.</li>'
      + '</ol>',
    examples_h: "Esempi di ricerca",
    examples: '<p>Le richieste seguenti possono essere riprese e adattate direttamente:</p>'
      + '<p><strong>Ricerca di persone</strong></p><blockquote>«Cerca nell\'archivio agrario persone con il cognome Moser e riassumi in quali organizzazioni erano attive.»</blockquote>'
      + '<p><strong>Storia delle istituzioni</strong></p><blockquote>«Che cosa si trova nell\'archivio sull\'Unione svizzera delle contadine e delle donne rurali? Elenca i documenti più importanti e le persone collegate.»</blockquote>'
      + '<p><strong>Fonti iconografiche</strong></p><blockquote>«Esistono fotografie sulla meccanizzazione dell\'agricoltura negli anni Cinquanta?»</blockquote>'
      + '<p><strong>Edizioni digitali</strong></p><blockquote>«Esplora l\'edizione Gillabert-Randin alla ricerca di voci sulla Prima guerra mondiale e cita i passaggi rilevanti.»</blockquote>'
      + '<p><strong>Approfondimento critico</strong></p><blockquote>«Recupera il testo integrale del documento su Franz Ineichen e indicami le fonti e i numeri di dossier ivi riportati.»</blockquote>'
      + '<p><strong>Ricerca trasversale</strong></p><blockquote>«Sto scrivendo un lavoro di seminario sul ruolo delle associazioni di contadine nel periodo tra le due guerre. Quali fondi dell\'ASR sono rilevanti? Cerca tra persone, istituzioni e pubblicazioni.»</blockquote>',
    tips_h: "Consigli per buoni risultati",
    tips: '<ul>'
      + '<li><strong>Lavorare per iterazioni.</strong> Iniziate in modo ampio, poi restringete: prima «associazioni di contadine», poi «solo Canton Berna», poi «testo integrale del documento X».</li>'
      + '<li><strong>Chiedere i rinvii.</strong> Le schede sono fortemente collegate tra loro (parentele, appartenenze). Chiedete: «Quali persone sono collegate a questa scheda?»</li>'
      + '<li><strong>Indicare la lingua se necessario.</strong> I fondi sono plurilingui; per fonti tedesche è utile precisare: «Cerca in tedesco…»</li>'
      + '<li><strong>Verificare le fonti.</strong> L\'assistente riassume; per le citazioni in lavori scientifici verificate sempre la scheda originale tramite il link fornito (<code>recherche2.histoirerurale.ch</code>). I numeri di dossier (p. es. «AfA Personendossier Nr. 396») rimandano ai fondi fisici.</li>'
      + '<li><strong>Conoscere i limiti.</strong> L\'assistente trova solo ciò che è indicizzato digitalmente. I fondi non digitalizzati restano accessibili tramite i numeri di dossier e una richiesta all\'ASR.</li>'
      + '<li><strong>Ripercorrere le ricerche effettuate.</strong> La maggior parte degli assistenti IA mostra nella conversazione le interrogazioni realmente eseguite (spesso come blocchi espandibili tipo «Used afa-recherche search»). Dateci un\'occhiata: vedrete con quali termini e filtri è stata condotta la ricerca e riconoscerete se era troppo ristretta o troppo ampia. Il riassunto dell\'assistente non è la stessa cosa del risultato di ricerca.</li>'
      + '</ul>',
    semantic_h: "Come cerca davvero l'assistente?",
    semantic: '<p>Il server MCP stesso effettua una ricerca puramente lessicale, cioè su stringhe di caratteri: termini, frasi, jolly, radici delle parole (la tecnologia sottostante è Elasticsearch). Non conosce i significati. «Bäuerin» (contadina) non trova da solo «Landfrau» (donna rurale).</p>'
      + '<p>La ricerca apparentemente semantica nasce dal modello linguistico a monte. È questo il vero trucco dell\'architettura, e si vede in diversi passaggi:</p>'
      + '<ul>'
      + '<li><strong>Ampliare i termini:</strong> chiedete «le donne in agricoltura», il modello cerca anche «contadina», «donna rurale», «associazione di contadine», «economia domestica rurale» e combina i risultati.</li>'
      + '<li><strong>Tradurre:</strong> domanda in italiano, il modello cerca anche «Bäuerin» nei fondi in tedesco.</li>'
      + '<li><strong>Riformulare in caso di zero risultati:</strong> se una ricerca non dà nulla, il modello prova sinonimi, altre grafie o jolly (<code>Ineich*</code>).</li>'
      + '<li><strong>Ordinare a posteriori:</strong> su 79 risultati, il modello riconosce che molti appartengono alla stessa famiglia e li raggruppa.</li>'
      + '<li><strong>Domande concettuali sulle fonti:</strong> «Come descrive Hofstetter la meccanizzazione?» diventa più ricerche di parole (macchina, trattore, motore…) seguite da una sintesi dei passaggi trovati.</li>'
      + '</ul>'
      + '<p>Da ricordare: il motore di ricerca trova stringhe di caratteri, il modello linguistico comprende i concetti e traduce tra i due. Il server MCP è il collegamento tra loro. Una vera ricerca per significato (tramite un indice vettoriale) sarebbe una possibile evoluzione futura del server, ma toglierebbe soltanto lavoro al modello, senza consentire nulla di fondamentalmente nuovo.</p>',
    reliability_h: "Una parola sull'affidabilità",
    reliability: '<p>Gli assistenti IA sono uno strumento di ricerca, non una fonte. Due caratteristiche meritano l\'attenzione dello storico o della storica:</p>'
      + '<p><strong>I risultati non sono riproducibili.</strong> Ponete due volte la stessa domanda e l\'assistente può formulare interrogazioni diverse, selezionare altri risultati e porre accenti diversi nel riassunto. Ciò che trovate oggi, un collega potrebbe non trovarlo domani con la stessa domanda. Annotate quindi ciò che conta: gli identificativi dei documenti, i link alle schede originali e i numeri di dossier. Questi sono stabili e citabili, la conversazione no.</p>'
      + '<p><strong>La riproducibilità ha dei gradi.</strong> Più precisa è l\'immissione, più ripetibile è il risultato. Una domanda in linguaggio corrente lascia all\'assistente molte decisioni (strumento, termini di ricerca, filtri). Un\'interrogazione annotata esplicitamente come <code>search_entities({"entity_type": "person", "query": "Ineichen"})</code> fissa queste decisioni e restituisce gli stessi risultati finché i fondi non cambiano. Raccomandazione: chiedere liberamente per esplorare, ma per i risultati centrali copiare e documentare l\'interrogazione realmente eseguita dalla conversazione. Chi ha bisogno di piena riproducibilità chiama l\'interfaccia direttamente via script (vedi riferimento tecnico). Solo il riassunto dell\'assistente resta in ogni caso variabile.</p>'
      + '<p><strong>I riassunti possono contenere errori.</strong> L\'assistente può abbreviare contenuti, collegare fatti in modo errato o, nel peggiore dei casi, inventare dettagli assenti dalla fonte. Trattate il suo output come la relazione di un assistente di ricerca: utile come punto di partenza e panoramica, ma ogni affermazione destinata a un lavoro va verificata sulla scheda originale.</p>'
      + '<p><strong>Modelli per ricerche verificabili.</strong> Chi vuole fissare un risultato in modo che un\\\'altra persona possa ripeterlo in un\\\'altra conversazione trova nel codice sorgente modelli di prompt pronti: un formato di ricetta che tiene insieme chiamate di ricerca, schema di output, data di consultazione e una somma di controllo sugli identificatori trovati, modelli per la ricerca documentata, elenchi completi di risultati e dossier personali a campi fissi, oltre a un modello per la verifica esterna. Vedi <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>'
      + '<p>In breve: l\'assistente sostituisce la maschera di ricerca, non la critica delle fonti.</p>',
    techref_h: "Riferimento tecnico",
    techref_p: 'Questa sezione si rivolge a sviluppatori e sviluppatrici e a chiunque voglia capire con precisione come l\'assistente effettua le ricerche.',
    endpoint_h: "Endpoint MCP",
    endpoint_p: 'Trasporto: <em>Streamable HTTP</em>. Autenticazione: nessuna. Da inserire nei client MCP come server remoto con questo URL.',
    sysprompt_h: 'Prompt di sistema del server',
    sysprompt: '<p>Un server MCP non fornisce al client soltanto strumenti, ma anche un testo di istruzioni (campo <code>instructions</code>) consegnato a ogni connessione. Il client lo anteponde al modello linguistico e influisce quindi sulla cura con cui un assistente lavora, senza che l\'utente debba configurare nulla.</p><p>Oggi il server AfA vi descrive i fondi e gli strumenti. Nel codice sorgente si trova inoltre una proposta articolata di estendere questo testo con regole di lavoro orientate alla tracciabilità: documentare ogni affermazione con identificatore e link, non rispondere partendo dall\'estratto abbreviato ma consultare la voce, ordinare per identificatore invece che per pertinenza per risultati ripetibili, scorrere l\'elenco fino in fondo prima di parlare di «tutti i risultati» e indicare le contraddizioni fra voci con entrambi gli identificatori invece di risolverle.</p><p>A complemento, e utilizzabili ricerca per ricerca, ci sono i modelli di prompt citati nella sezione sull\'affidabilità: formato di ricetta con somma di controllo, modelli di lavoro e verifica esterna. Tutto si trova in <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>',
    direct_h: "Accesso diretto senza IA",
    direct_intro: '<p>Per utenti tecnici, il server MCP è utilizzabile anche senza assistente IA, come una normale API. MCP si basa su JSON-RPC via HTTP: ogni strumento può essere richiamato direttamente, per esempio con <code>curl</code> o da uno script (vedi «Client MCP personalizzati»). È la strada verso la piena riproducibilità: stessa chiamata, stessi risultati, senza modello linguistico intermedio.</p>',
    direct_notes: '<p>La risposta contiene l\'elenco dei risultati in formato JSON nel campo <code>result.content[0].text</code>. Due note: l\'intestazione <code>Accept</code> deve indicare entrambi i tipi di contenuto (<code>application/json, text/event-stream</code>), altrimenti il server rifiuta la richiesta. E l\'usuale handshake <code>initialize</code> del protocollo MCP non è necessario, perché il server è privo di stato; le singole chiamate funzionano direttamente. Il server si presta così anche ad analisi quantitative e progetti di digital humanities: confrontare i numeri di risultati tra i fondi, interrogare sistematicamente i corpora o integrare i risultati nei propri strumenti.</p>',
    integration_h: "Integrazione nei sistemi di IA",
    integration_p: 'Clicca sul rispettivo client per le istruzioni dettagliate. L\'URL è sempre lo stesso: <code>https://mcp.histoirerurale.ch/mcp</code>.',
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
    brand: "Archives of Rural History",
    brand_bar: "Archives of Rural History · MCP server",
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
    setup_steps: '<ol>'
      + '<li><strong>Choose an AI assistant.</strong> You need access to Claude (claude.ai or the desktop app), ChatGPT (Plus/Team/Enterprise), Perplexity Pro, or a development environment such as Cursor or VS Code.</li>'
      + '<li><strong>Connect the server.</strong> Register the address <code>https://mcp.histoirerurale.ch/mcp</code> as an MCP server. The exact steps differ per platform, see the instructions in the next section.</li>'
      + '<li><strong>Start asking.</strong> Pose your first research question in plain language. No search syntax required.</li>'
      + '</ol>',
    examples_h: "Example research questions",
    examples: '<p>The following prompts can be copied and adapted directly:</p>'
      + '<p><strong>Person research</strong></p><blockquote>"Search the agrarian archive for persons named Moser and summarise which organisations they were active in."</blockquote>'
      + '<p><strong>Institutional history</strong></p><blockquote>"What does the archive hold on the Swiss Farm Women\'s Association? List the most important documents and linked persons."</blockquote>'
      + '<p><strong>Visual sources</strong></p><blockquote>"Are there photographs of the mechanisation of agriculture in the 1950s?"</blockquote>'
      + '<p><strong>Digital editions</strong></p><blockquote>"Search the Gillabert-Randin edition for entries on the First World War and quote the relevant passages."</blockquote>'
      + '<p><strong>Source-critical deep dive</strong></p><blockquote>"Fetch the full text of the document on Franz Ineichen and give me the sources and dossier numbers stated there."</blockquote>'
      + '<p><strong>Cross-holding research</strong></p><blockquote>"I am writing a seminar paper on the role of farm women\'s associations in the interwar period. Which ARH holdings are relevant? Search persons, institutions and publications."</blockquote>',
    tips_h: "Tips for good results",
    tips: '<ul>'
      + '<li><strong>Work iteratively.</strong> Start broad, then narrow down: first "farm women\'s associations", then "canton of Bern only", then "full text of document X".</li>'
      + '<li><strong>Ask for cross-references.</strong> The entries are densely interlinked (kinship, memberships). Ask: "Which persons are linked to this entry?"</li>'
      + '<li><strong>Specify the language when needed.</strong> The holdings are multilingual; for German sources it helps to say: "Search in German for…"</li>'
      + '<li><strong>Verify sources.</strong> The assistant summarises; for quotations in academic work, always check the original entry via the provided link (<code>recherche2.histoirerurale.ch</code>). Dossier numbers (e.g. "AfA Personendossier Nr. 396") point to the physical holdings.</li>'
      + '<li><strong>Know the limits.</strong> The assistant only finds what has been digitally indexed. Non-digitised holdings remain accessible via the dossier numbers and an enquiry to the ARH.</li>'
      + '<li><strong>Retrace the searches.</strong> Most AI assistants show in the conversation which queries they actually executed (usually as expandable blocks such as "Used afa-recherche search"). Take a look inside: you will see which terms and filters were used and can tell whether a search was too narrow or too broad. The assistant\'s summary is not the same as the search result.</li>'
      + '</ul>',
    semantic_h: "How does the assistant actually search?",
    semantic: '<p>The MCP server itself searches purely lexically, that is, over character strings: terms, phrases, wildcards, word stems (the underlying technology is Elasticsearch). It knows no meanings. "Bäuerin" (woman farmer) does not on its own find "Landfrau" (rural woman).</p>'
      + '<p>The seemingly meaning-based search comes from the language model in front of it. That is the real trick of the architecture, and it shows in several moves:</p>'
      + '<ul>'
      + '<li><strong>Expanding terms:</strong> you ask "women in agriculture", and the model also searches for "woman farmer", "rural woman", "farm women\'s association", "rural home economics" and combines the results.</li>'
      + '<li><strong>Translating:</strong> a question in English, and the model also searches French holdings for "paysanne".</li>'
      + '<li><strong>Reformulating on zero hits:</strong> if a search returns nothing, the model tries synonyms, alternative spellings or wildcards (<code>Ineich*</code>).</li>'
      + '<li><strong>Ordering afterwards:</strong> from 79 hits the model recognises by content that many belong to the same family and groups them accordingly.</li>'
      + '<li><strong>Concept questions over sources:</strong> "How does Hofstetter describe mechanisation?" becomes several word searches (machine, tractor, engine…) plus a synthesis of the passages found.</li>'
      + '</ul>'
      + '<p>As a rule of thumb: the search engine finds character strings, the language model understands concepts and translates between the two. The MCP server is the link between them. A true meaning-based search (via a vector index) would be a possible future server feature, but it would only take work off the model, not enable anything fundamentally new.</p>',
    reliability_h: "A word on reliability",
    reliability: '<p>AI assistants are a research tool, not a source. As a historian, keep two properties in mind:</p>'
      + '<p><strong>Results are not reproducible.</strong> Ask the same question twice and the assistant may formulate different queries, select different hits and set different emphases in its summary. What you find today, a fellow student may not find tomorrow with the same question. Therefore record what matters: the document IDs, the links to the original entries and the dossier numbers. These are stable and citable, the chat transcript is not.</p>'
      + '<p><strong>Reproducibility comes in degrees.</strong> The more precise the input, the more repeatable the result. A question in plain language leaves many decisions to the assistant (tool, search terms, filters). An explicitly noted query such as <code>search_entities({"entity_type": "person", "query": "Ineichen"})</code> pins these decisions down and returns the same hits as long as the holdings are unchanged. Recommendation: ask freely while exploring, but for key findings copy the actually executed query from the conversation and document it. If you need full reproducibility, call the interface directly via script (see the technical reference). Only the assistant\'s summary remains variable in every case.</p>'
      + '<p><strong>Summaries can contain errors.</strong> The assistant may shorten content, connect facts incorrectly or, at worst, invent details that are not in the source. Treat its output like a research assistant\'s briefing: useful as an entry point and overview, but every statement that goes into a paper must be verified against the original entry.</p>'
      + '<p><strong>Templates for traceable research.</strong> To pin a result down so that another person can repeat it in another chat, the source code ships ready-made prompt templates: a recipe format holding search calls, output schema, retrieval date and a checksum over the identifiers found, templates for sourced research, complete result lists and person dossiers with fixed fields, plus a template for a third party check. See <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>'
      + '<p>In short: the assistant replaces the search form, not source criticism.</p>',
    techref_h: "Technical reference",
    techref_p: 'This section is aimed at developers and at anyone who wants to understand precisely how the assistant searches.',
    endpoint_h: "MCP endpoint",
    endpoint_p: 'Transport: <em>Streamable HTTP</em>. Authentication: none. Add it to MCP-capable clients as a remote server with this URL.',
    sysprompt_h: 'System prompt of the server',
    sysprompt: '<p>An MCP server hands the client not only tools but also a text of instructions (field <code>instructions</code>) on every connection. The client places it in front of the language model, so it shapes how carefully an assistant works without anyone having to configure a thing.</p><p>Today the AfA server uses it to describe the holdings and the tools. The source code additionally holds a worked-out proposal to extend that text with working rules aimed at traceability: back every statement with a document ID and link, do not answer from the shortened result snippet but fetch the record, sort by ID rather than relevance when results must be repeatable, page to the end of the result list before saying "all hits", and report contradictions between records with both identifiers instead of resolving them.</p><p>Alongside it, usable per search, are the prompt templates mentioned in the reliability section: recipe format with checksum, working templates and a third party check. Both live in <a href="https://github.com/Archiv-fur-Agrargeschichte/AfA-MCP-Server/tree/main/docs/prompts">docs/prompts</a>.</p>',
    direct_h: "Direct access without AI",
    direct_intro: '<p>For technical users, the MCP server can also be used without an AI assistant, much like an ordinary API. MCP is built on JSON-RPC over HTTP: every tool can be called directly, for example with <code>curl</code> or from a script (see "Custom MCP clients"). This is the path to full reproducibility: same call, same hits, no language model in between.</p>',
    direct_notes: '<p>The response contains the hit list as JSON in the <code>result.content[0].text</code> field. Two notes: the <code>Accept</code> header must name both content types (<code>application/json, text/event-stream</code>), otherwise the server rejects the request. And the usual MCP <code>initialize</code> handshake is not required, because the server runs statelessly; single calls work directly. This makes the server suitable for quantitative analysis and digital-humanities projects too: comparing hit counts across holdings, querying corpora systematically, or integrating results into your own tools.</p>',
    integration_h: "Integration into AI systems",
    integration_p: 'Click the respective client for detailed instructions. The URL is always the same: <code>https://mcp.histoirerurale.ch/mcp</code>.',
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
