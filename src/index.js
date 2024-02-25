
import { renderBio, renderAbout, renderProjectCards } from "./lib/render.js";
import { avatarFliper } from "./lib/listeners.js";

window.onload = () => {
    renderBio();
    renderAbout();
    renderProjectCards();

    avatarFliper();
}