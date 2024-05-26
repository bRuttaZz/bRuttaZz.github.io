/**
 * bind avatar switch option
 */
export function bindAvatarSwitch() {
    const avatar = document.createElement("img")
    avatar.classList.add("avatar")
    avatar.src = "./assets/images/avatar.jpg"
    
    const profileImageContainer = document.querySelector(".profile-img")
    const realtar = document.querySelector(".realtar")
    let avatarFlag = true;
    profileImageContainer.addEventListener("click", () => {
        if (avatarFlag) {
            profileImageContainer.removeChild(realtar);
            profileImageContainer.append(avatar);
        } else {
            const currentChild = document.querySelector(".avatar")
            profileImageContainer.removeChild(currentChild);
            profileImageContainer.append(realtar);
        }
        avatarFlag = !avatarFlag
    });    
}


/**
 * Bind theming switching and ..you knw..!
 */
export function bindThemeSwitch() {
    document.querySelector(".theme-swticher").classList.remove("d-none");
    const systemMode = window.matchMedia("(prefers-color-scheme: dark)");
    const setSysTheme = () => {
        if (systemMode.matches) {
            document.documentElement.classList.add("dark")
            sessionStorage.setItem("theme-selection", "dark");
        } else {
            document.documentElement.classList.remove("dark")
            sessionStorage.setItem("theme-selection", "light");
        }
    }

    // set sys theme
    const cachedState = sessionStorage.getItem("theme-selection")
    if (cachedState === "dark")
        document.documentElement.classList.add("dark")
    else if (!cachedState)
        setSysTheme()


    systemMode.addEventListener("change", setSysTheme)

    // add custom button functionality
    document.querySelector(".theme-switcher-btn")?.addEventListener("click", (e) => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            sessionStorage.setItem("theme-selection", "light");
        } else {
            document.documentElement.classList.add("dark")
            sessionStorage.setItem("theme-selection", "dark");
        }
    })
};
