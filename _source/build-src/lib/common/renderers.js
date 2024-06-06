const ejs = require("ejs")
const { renderFromFile } = require("./render")
const { TEMPLATE_DIR } = require("../settings")

/**
 * Render project card html from projects and keylist
 * @param {Object} projects - projects object 
 * @param {Array[String]} keyList - array of projectnames to be rendered
 * @returns 
 */
function renderProjectCards(projects, keyList=[]) {
    let cards = ""
    if (!keyList.length)
        keyList = Object.keys(projects)
    for (let obj of keyList) {
        const pro = projects[obj]
        cards += renderFromFile(`${TEMPLATE_DIR}/partials/project-card.ejs`, {
            projectName: pro.name,
            projectUrl: pro.link,
            imageSrc: pro.coverimage,
            shortInfo: pro.shortInfo,
            source: pro.source,
            license: pro.license,
        })
    }
    return cards;
}

module.exports = { renderProjectCards }