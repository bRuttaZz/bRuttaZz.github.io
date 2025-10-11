/**
 * Bind theming switching and ..you knw..!
 */
function bindThemeToggle() {
  const darkThemeStyleSheet = document.getElementById("dark-theme-style");
  const cachedState = sessionStorage.getItem("theme-selection");
  const systemMode = window.matchMedia("(prefers-color-scheme: dark)");

  const setDarkTheme = () => {
    darkThemeStyleSheet.disabled = false;
    sessionStorage.setItem("theme-selection", "dark");
  };

  const setLightTheme = () => {
    darkThemeStyleSheet.disabled = true;
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
        if (darkThemeStyleSheet.disabled) setDarkTheme();
        else setLightTheme();
      });
  });
}

// Entrypoints
bindThemeToggle();
