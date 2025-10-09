/**
 * Bind theming switching and ..you knw..!
 */
function bindThemeToggle() {
  const body = document.body;
  const cachedState = sessionStorage.getItem("theme-selection");
  const systemMode = window.matchMedia("(prefers-color-scheme: dark)");

  const setDarkTheme = () => {
    body.classList.add("dark-mode");
    sessionStorage.setItem("theme-selection", "dark");
  };

  const setLightTheme = () => {
    body.classList.remove("dark-mode");
    sessionStorage.setItem("theme-selection", "light");
  };

  const setSysTheme = () => {
    if (systemMode.matches) setDarkTheme();
    else setLightTheme();
  };

  // set sys theme
  if (cachedState === "dark") setDarkTheme();
  else if (cachedState === "light") setLightTheme();
  else setSysTheme();

  systemMode.addEventListener("change", setSysTheme);

  // add custom button functionality
  window.addEventListener("load", () => {
    document.querySelector(".theme-switcher").classList.remove("d-none");
    document
      .querySelector(".theme-switcher")
      ?.addEventListener("click", (e) => {
        if (body.classList.contains("dark-mode")) setLightTheme();
        else setDarkTheme();
      });
  });
}

// Entrypoints
bindThemeToggle();
