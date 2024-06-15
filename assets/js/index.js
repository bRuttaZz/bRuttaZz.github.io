import { bindAvatarSwitch } from "./lib/ui.js"

window.onload = () => {
    if (window.pageIdentifier === "about")
        bindAvatarSwitch();
}
