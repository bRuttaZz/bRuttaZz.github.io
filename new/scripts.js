/**
 * Bind theming switching and ..you knw..!
 */
function bindThemeToggle() {
  const body = document.body;
  const cachedState = sessionStorage.getItem("theme-selection");
  const systemMode = window.matchMedia("(prefers-color-scheme: dark)");

  const setSysTheme = () => {
    if (systemMode.matches) {
      body.classList.add("dark-mode");
      sessionStorage.setItem("theme-selection", "dark");
    } else {
      body.classList.remove("dark-mode");
      sessionStorage.setItem("theme-selection", "light");
    }
  };

  // set sys theme
  if (cachedState === "dark") body.classList.add("dark-mode");
  else if (!cachedState) setSysTheme();

  systemMode.addEventListener("change", setSysTheme);

  // add custom button functionality
  window.addEventListener("load", () => {
    document.querySelector(".theme-switcher").classList.remove("d-none");
    document
      .querySelector(".theme-switcher")
      ?.addEventListener("click", (e) => {
        if (body.classList.contains("dark-mode")) {
          body.classList.remove("dark-mode");
          sessionStorage.setItem("theme-selection", "light");
        } else {
          body.classList.add("dark-mode");
          sessionStorage.setItem("theme-selection", "dark");
        }
      });
  });
}

// Entrypoints
bindThemeToggle();
