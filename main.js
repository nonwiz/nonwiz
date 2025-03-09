const loadDarkMode = () => {
  const themeSwitcherBtn = document.getElementById("theme-switcher");
  themeSwitcherBtn.innerHTML = "☀️";
  document.documentElement.style.setProperty("--background", "#1e1e1e");
  document.documentElement.style.setProperty("--text", "white");
  document.documentElement.style.setProperty("--color", "255, 255, 255");
};

const loadLightMode = () => {
  const themeSwitcherBtn = document.getElementById("theme-switcher");
  themeSwitcherBtn.innerHTML = "🌙";
  document.documentElement.style.setProperty("--background", "white");
  document.documentElement.style.setProperty("--text", "#4a4a4a");
  document.documentElement.style.setProperty("--color", "76, 99, 119");
};

const switchTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    loadLightMode();
    localStorage.setItem("theme", "light");
  } else {
    loadDarkMode();
    localStorage.setItem("theme", "dark");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const isDarkMode = localStorage.getItem("theme") === "dark";

  if (isDarkMode) {
    loadDarkMode();
  }

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
