/**
 * Bind theming switching and ..you knw..!
 */
function bindThemeSetup() {
  const darkThemeStyleSheet = document.getElementById("dark-theme-style");
  const systemMode = window.matchMedia("(prefers-color-scheme: dark)");

  const setDarkTheme = () => {
    darkThemeStyleSheet.disabled = false;
    localStorage.setItem("theme-selection", "dark");
  };

  const setLightTheme = () => {
    darkThemeStyleSheet.disabled = true;
    localStorage.setItem("theme-selection", "light");
  };

  const setSysTheme = () => {
    if (systemMode.matches) setDarkTheme();
    else setLightTheme();
  };

  // set initial theme
  function setInitialTheme() {
    const cachedState = localStorage.getItem("theme-selection");

    if (cachedState === "dark") setDarkTheme();
    else if (cachedState === "light") setLightTheme();
    else setSysTheme();
  }

  // bind toggle button
  document.querySelector(".theme-switcher").classList.remove("d-none");
  document.querySelector(".theme-switcher")?.addEventListener("click", (e) => {
    if (darkThemeStyleSheet.disabled) setDarkTheme();
    else setLightTheme();
  });
  systemMode.addEventListener("change", setSysTheme);
  window.addEventListener("pageshow", setInitialTheme);
  setInitialTheme();
}

window.addEventListener("load", bindThemeSetup);
