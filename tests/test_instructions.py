"""Der Systemprompt (`instructions`) ist Teil des Verhaltens, nicht Doku.

Er wird an jeden Client geliefert und steuert, wie sorgfaeltig ein Assistent
arbeitet. Deshalb wird er hier festgenagelt: Regeln, die versehentlich
verschwinden, faellt sonst niemand auf.
"""

from afa_mcp.server import SERVER_INSTRUCTIONS, build_server


def test_instructions_are_passed_to_the_server():
    assert build_server().instructions == SERVER_INSTRUCTIONS


def test_instructions_describe_the_holdings():
    for expected in ("Archiv für Agrargeschichte", "Hofstetter", "Gillabert-Randin", "Bobbett"):
        assert expected in SERVER_INSTRUCTIONS


def test_instructions_do_not_promise_full_text_from_fetch_document():
    # get_document laeuft mit include_content=False; ein Volltextversprechen
    # hier wuerde das Modell dazu verleiten, Inhalte zu erfinden.
    assert "keinen Volltext" in SERVER_INSTRUCTIONS
    assert "Abruf einzelner Dokumente" in SERVER_INSTRUCTIONS


def test_instructions_carry_the_working_rules():
    rules = [
        "nicht im Bestand",        # Belegpflicht statt Vorwissen
        "document_url",            # Nachweis je Aussage
        "Highlight-Snippet",       # Snippet ist nicht der Eintrag
        "sort='id'",               # wiederholbare Reihenfolge
        "next_cursor",             # vollstaendig blaettern
        "wörtlich",                # Namen und Daten nicht paraphrasieren
        "ohne Auswahl nach",       # keine Auslassung bei Aemtern
        "beiden IDs",              # Widersprueche nicht aufloesen
    ]
    for rule in rules:
        assert rule in SERVER_INSTRUCTIONS, rule


def test_instructions_are_numbered_consecutively():
    numbers = [f"\n{i}." for i in range(1, 11)]
    for marker in numbers:
        assert marker in SERVER_INSTRUCTIONS, marker
    assert "\n11." not in SERVER_INSTRUCTIONS
