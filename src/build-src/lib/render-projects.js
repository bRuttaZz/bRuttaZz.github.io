const renderers = require("./common/renderers")
const projects = require("../../writings/configs/projects.json")

function renderProjectCards() {
    return renderers.renderProjectCards(projects.projects)
}

module.exports = {renderProjectCards}