import { bindAvatarSwitch, bindThemeSwitch } from "./lib/ui.js"

window.onload = () => {
    bindThemeSwitch();
    bindAvatarSwitch();
}