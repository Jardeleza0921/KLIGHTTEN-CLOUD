(function () {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const themeButtons = Array.from(document.querySelectorAll("[data-theme-choice]"));
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const navToggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".primary-nav");
  const pageName = body.dataset.page;

  const themes = {
    "dark-mint": "#0b251e",
    "neon-arcade": "#121832",
    "black-white": "#1c1f25",
    "crimson-red": "#351119",
    "cream-coffee": "#3a2d25"
  };

  function applyTheme(theme) {
    if (!Object.prototype.hasOwnProperty.call(themes, theme)) return;

    root.dataset.theme = theme;
    themeButtons.forEach(function (button) {
      const selected = button.dataset.themeChoice === theme;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    if (themeMeta) themeMeta.setAttribute("content", themes[theme]);

    try {
      window.localStorage.setItem("klightten-public-theme", theme);
    } catch (_) {
      // The theme still works when browser storage is unavailable.
    }
  }

  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyTheme(button.dataset.themeChoice);
    });
  });

  try {
    const savedTheme = window.localStorage.getItem("klightten-public-theme");
    if (savedTheme) applyTheme(savedTheme);
  } catch (_) {
    // Keep the default theme when browser storage is unavailable.
  }

  document.querySelectorAll("[data-nav]").forEach(function (link) {
    if (link.dataset.nav === pageName) link.setAttribute("aria-current", "page");
  });

  if (navToggle && navigation) {
    navToggle.addEventListener("click", function () {
      const open = navToggle.getAttribute("aria-expanded") !== "true";
      navToggle.setAttribute("aria-expanded", String(open));
      navigation.classList.toggle("is-open", open);
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        navigation.classList.remove("is-open");
      });
    });
  }

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
