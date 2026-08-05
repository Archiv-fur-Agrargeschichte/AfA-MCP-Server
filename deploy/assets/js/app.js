const SUPPORTED = ["de", "fr", "it", "en"];

function detectLang() {
  // 1) Manual override stored in localStorage
  try {
    const saved = localStorage.getItem("afa-mcp-lang");
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch (_) {}
  // 2) Browser language list
  const cands = (navigator.languages || [navigator.language || "en"]);
  for (const c of cands) {
    if (!c) continue;
    const base = c.toLowerCase().split("-")[0];
    if (SUPPORTED.includes(base)) return base;
  }
  // 3) Fallback
  return "en";
}

function applyLang(lang) {
  const dict = I18N[lang] || I18N.en;
  document.documentElement.lang = lang;
  document.title = dict.brand_bar || dict.brand || "Archiv für Agrargeschichte";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] != null) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.dataset.i18nHtml;
    if (dict[key] != null) el.innerHTML = dict[key];
  });
  document.querySelectorAll(".lang-switch button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

document.querySelectorAll(".lang-switch button").forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    try { localStorage.setItem("afa-mcp-lang", lang); } catch (_) {}
    applyLang(lang);
  });
});

applyLang(detectLang());
