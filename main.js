const THEMES = { light: "light", dark: "dark" };

const getLabel = (theme) =>
  theme === THEMES.dark ? "☀️ Light" : "🌙 Dark";

const getAriaLabel = (theme) =>
  theme === THEMES.dark ? "Switch to light mode" : "Switch to dark mode";

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  const btn = document.getElementById("theme-switcher");
  if (btn) {
    btn.textContent = getLabel(theme);
    btn.setAttribute("aria-label", getAriaLabel(theme));
  }
};

const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved === THEMES.light || saved === THEMES.dark) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEMES.dark
    : THEMES.light;
};

const switchTheme = () => {
  const current = document.documentElement.dataset.theme ?? getInitialTheme();
  const next = current === THEMES.dark ? THEMES.light : THEMES.dark;
  applyTheme(next);
  localStorage.setItem("theme", next);
};

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getInitialTheme());

  // Sync with OS preference when no explicit user choice is stored
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? THEMES.dark : THEMES.light);
      }
    });

  // Hidden content reveal via URL parameter (?q=1)
  const params = new URLSearchParams(window.location.search);
  if (params.has("q") && params.get("q") === "1") {
    sessionStorage.setItem("hidden", "0");
  }

  if (sessionStorage.getItem("hidden") === "0") {
    document.querySelectorAll(".hidden").forEach((el) => {
      el.classList.remove("hidden");
      el.classList.add("show");
    });
  }
});
