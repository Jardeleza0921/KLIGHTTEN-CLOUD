(function () {
  "use strict";

  const root = document.documentElement;
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const themeButtons = Array.from(document.querySelectorAll("[data-theme-choice]"));
  const themeColors = {
    "dark-mint": "#0b251e",
    "neon-arcade": "#121832",
    "black-white": "#1c1f25",
    "crimson-red": "#351119",
    "cream-coffee": "#3a2d25"
  };

  function setTheme(theme) {
    if (!Object.prototype.hasOwnProperty.call(themeColors, theme)) return;
    root.dataset.theme = theme;
    themeButtons.forEach(function (button) {
      const selected = button.dataset.themeChoice === theme;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    if (themeMeta) themeMeta.setAttribute("content", themeColors[theme]);
    try {
      window.localStorage.setItem("klightten-public-theme", theme);
    } catch (_) {
      // The current page still changes theme without storage.
    }
  }

  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setTheme(button.dataset.themeChoice);
    });
  });

  try {
    const savedTheme = window.localStorage.getItem("klightten-public-theme");
    if (savedTheme) setTheme(savedTheme);
  } catch (_) {
    // Keep Dark Mint when browser storage is unavailable.
  }

  document.querySelectorAll("[data-password-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      const input = document.getElementById(button.dataset.passwordToggle);
      if (!input) return;
      const revealing = input.type === "password";
      input.type = revealing ? "text" : "password";
      button.textContent = revealing ? "Hide" : "Show";
      button.setAttribute("aria-pressed", String(revealing));
    });
  });

  const loginForm = document.querySelector("#preview-login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = String(new FormData(loginForm).get("username") || "").trim().toLowerCase();
      const password = String(new FormData(loginForm).get("password") || "");
      const message = document.querySelector("#login-message");
      const role = username === "admin" && password === "admin1"
        ? "admin"
        : username === "user" && password === "user1"
          ? "client"
          : "";

      if (!role) {
        message.textContent = "Use one of the preview accounts shown below.";
        return;
      }

      message.classList.add("is-success");
      message.textContent = "Opening the static " + role + " preview…";
      window.setTimeout(function () {
        window.location.assign("dashboard.html?role=" + role);
      }, 350);
    });
  }

  const signupForm = document.querySelector("#preview-signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const values = new FormData(signupForm);
      const username = String(values.get("username") || "").trim();
      const displayName = String(values.get("display_name") || "").trim();
      const password = String(values.get("password") || "");
      const confirmation = String(values.get("confirmation") || "");
      const acknowledged = values.get("acknowledgement") === "yes";
      const message = document.querySelector("#signup-message");

      if (!/^[a-z0-9._-]{3,32}$/.test(username)) {
        message.textContent = "Use 3–32 lowercase letters, numbers, dots, underscores, or hyphens.";
        return;
      }
      if (displayName.length < 2 || displayName.length > 50) {
        message.textContent = "Enter a display name between 2 and 50 characters.";
        return;
      }
      if (password.length < 8) {
        message.textContent = "Use at least 8 characters for this demonstration.";
        return;
      }
      if (password !== confirmation) {
        message.textContent = "The preview passwords do not match.";
        return;
      }
      if (!acknowledged) {
        message.textContent = "Confirm that this is a non-persistent demonstration.";
        return;
      }

      document.querySelector("#signup-form-wrap").classList.add("is-hidden");
      document.querySelector("#signup-success").classList.add("is-visible");
    });
  }

  const dashboard = document.querySelector("#preview-dashboard");
  if (dashboard) {
    const params = new URLSearchParams(window.location.search);
    const role = params.get("role") === "admin" ? "admin" : "client";
    document.body.dataset.dashboardRole = role;

    document.querySelectorAll("[data-role-label]").forEach(function (element) {
      element.textContent = role === "admin" ? "Administrator preview" : "Client preview";
    });
    document.querySelectorAll("[data-display-name]").forEach(function (element) {
      element.textContent = role === "admin" ? "Klightten Admin" : "Klightten User";
    });

    document.querySelectorAll("[data-preview-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        const row = button.closest(".request-row");
        if (!row) return;
        const action = button.dataset.previewAction;
        row.querySelector(".request-actions").innerHTML = "<span>" + (action === "approve" ? "Approved" : "Denied") + " · preview only</span>";
      });
    });
  }
})();
