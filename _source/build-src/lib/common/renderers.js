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

/**
 * Render blog card html from bloglist object
 * @param {Object} blogs - object of blogs
 * @param {Array} blogList - array of keynames of the blogs to be included
 * @param {Boolean} shortInfo - If true, will render the shortdescription instead of longdescription 
 * @returns 
 */
function renderBlogCards(blogs, blogList=[], shortInfo=false) {
    let blogs_html = ""
    if (!blogList.length) {
        blogList = Object.keys(blogs).filter(key=>key!=="pinned")
    }
    for (let blogn of blogList) {
        const blog = blogs[blogn]
        blogs_html += renderFromFile(`${TEMPLATE_DIR}/partials/blog-card.ejs`, {
            url: `blogs/${blog.name}`,
            title: blog.meta.title,
            longDescription: shortInfo? blog.meta.shortDescription: blog.meta.longDescription,
            mdate: blog.mdate,
        })
    }
    return blogs_html
}

module.exports = { renderProjectCards, renderBlogCards }