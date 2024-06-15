import { bindAvatarSwitch, bindThemeSwitch } from "./lib/ui.js"

window.onload = () => {
    if (window.pageIdentifier === "about")
        bindAvatarSwitch();
}
bindThemeSwitch();
