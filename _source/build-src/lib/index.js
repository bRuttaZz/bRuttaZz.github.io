const { build } = require("./common/render")
const { TEMPLATE_DIR } = require("./settings")
const aboutPage = require("./render-about")
const projectsPage = require("./render-projects")


const renderData = {
    about: {
        bioDat: aboutPage.renderBio(),
        contactPortion: aboutPage.renderAbout(),
        projectCards: aboutPage.renderProjectCards(),
    },
    projects: {
        projects: projectsPage.renderProjectCards(),
    }
}

function buildAll() {
    build(`${TEMPLATE_DIR}/about.ejs`, "index.html", renderData.about);
    build(`${TEMPLATE_DIR}/projects.ejs`, "projects.html", renderData.projects);
}

module.exports = {buildAll}