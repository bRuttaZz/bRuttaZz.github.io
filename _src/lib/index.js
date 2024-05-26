const { build } = require("./render")
const { renderAbout, renderBio, renderProjectCards } = require("./render-about")

const renderData = {
    about: {
        bioDat: renderBio(),
        contactPortion: renderAbout(),
        projectCards: renderProjectCards(),
    }
}

function buildAll() {
    build("./_src/templates/about.ejs", "index.html", renderData.about);
    build("./_src/templates/projects.ejs", "projects.html", );
}

module.exports = {buildAll}