import { bindAvatarSwitch, bindThemeSwitch } from "./lib/ui.js"

window.onload = () => {
    bindThemeSwitch();
    if (window.pageIdentifier === "about")
        bindAvatarSwitch();
}