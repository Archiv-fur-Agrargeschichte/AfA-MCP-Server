"""Die Vorlagen sind ausgelieferte Schnittstelle, nicht Beiwerk.

Ein Client listet sie namentlich auf, Nutzende waehlen sie aus. Namen und
Argumente sind damit so bindend wie Werkzeugnamen: aendern heisst brechen.
"""

import anyio
import pytest

from afa_mcp import prompts as P
from afa_mcp.server import build_server

EXPECTED = {
    "recherche_belegt": {"frage"},
    "trefferliste_vollstaendig": {"query"},
    "entity_dossier": {"name"},
    "av_quellenliste": {"thema"},
    "widerspruchspruefung": {"sachverhalt"},
    "fremdpruefung": {"rezept"},
}


def _list_prompts():
    return anyio.run(build_server().list_prompts)


def test_server_offers_every_template():
    names = {p.name for p in _list_prompts()}
    assert names == set(EXPECTED)


def test_server_card_announces_the_prompts_capability():
    from afa_mcp.server import _server_card_payload

    assert _server_card_payload()["capabilities"]["prompts"] is True


def test_required_arguments_match_the_use_case():
    for prompt in _list_prompts():
        required = {a.name for a in (prompt.arguments or []) if a.required}
        assert required == EXPECTED[prompt.name], prompt.name


def test_language_is_optional_everywhere():
    for prompt in _list_prompts():
        optional = {a.name for a in (prompt.arguments or []) if not a.required}
        assert "language" in optional, prompt.name


def test_titles_and_descriptions_are_bilingual():
    for prompt in _list_prompts():
        assert "·" in (prompt.title or ""), prompt.name
        assert " / " in (prompt.description or ""), prompt.name


def test_rendering_inserts_the_argument():
    text = anyio.run(
        lambda: build_server().get_prompt("recherche_belegt", {"frage": "Wer war Franz Ineichen?"})
    )
    body = text.messages[0].content.text
    assert "Wer war Franz Ineichen?" in body
    assert 'sort="id"' in body


@pytest.mark.parametrize(
    "func,kwargs,de_marker,en_marker",
    [
        (P.recherche_belegt, {"frage": "x"}, "Ablauf:", "Procedure:"),
        (P.trefferliste_vollstaendig, {"query": "x"}, "Regeln:", "Rules:"),
        (P.entity_dossier, {"name": "x"}, "Formular", "Form"),
        (P.av_quellenliste, {"thema": "x"}, "Ablauf:", "Procedure:"),
        (P.widerspruchspruefung, {"sachverhalt": "x"}, "Ausgabe:", "Output:"),
        (P.fremdpruefung, {"rezept": "x"}, "Ablauf:", "Procedure:"),
    ],
)
def test_both_languages_are_available(func, kwargs, de_marker, en_marker):
    assert de_marker in func(**kwargs)  # Default ist Deutsch
    assert de_marker in func(**kwargs, language="de")
    assert en_marker in func(**kwargs, language="en")


def test_language_argument_is_lenient():
    # Clients schicken auch 'EN', 'en-GB' oder nichts.
    for value in ("en", "EN", "en-GB", "english"):
        assert "Procedure:" in P.recherche_belegt("x", language=value)
    for value in (None, "", "de", "de-CH", "  DE  "):
        assert "Ablauf:" in P.recherche_belegt("x", language=value)


def test_optional_arguments_have_sensible_defaults():
    assert "alle" in P.trefferliste_vollstaendig("Milch")
    assert "all" in P.trefferliste_vollstaendig("Milch", language="en")
    assert "any" in P.entity_dossier("Ineichen")
    assert "ermitteln" in P.widerspruchspruefung("Verkauf des Hofs")


def test_templates_keep_the_rules_that_prevent_omissions():
    dossier = P.entity_dossier("Ineichen")
    assert "ALLE" in dossier
    assert "nicht im Bestand" in dossier

    liste = P.trefferliste_vollstaendig("Traktor")
    assert "Keine Auswahl" in liste
    assert "next_cursor" in liste

    widerspruch = P.widerspruchspruefung("Verkauf")
    assert "nicht auf" in widerspruch  # nicht aufloesen
