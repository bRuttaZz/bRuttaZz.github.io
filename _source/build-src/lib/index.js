const { build } = require("./common/render")
const { TEMPLATE_DIR } = require("./settings")
const aboutPage = require("./render-about")
const projectsPage = require("./render-projects")
const blogs = require("./render-blogs")


let renderData

async function updateRenderData() {
    renderData = {
        about: {
            bioDat: aboutPage.renderBio(),
            contactPortion: aboutPage.renderAbout(),
            projectCards: aboutPage.renderProjectCards(),
            blogCards: await aboutPage.renderBlogCards(),
            baseUrl: ""
        },
        projects: {
            projects: projectsPage.renderProjectCards(),
            baseUrl: ""
        },
        blogs: {
            blogs: await blogs.renderBlogCards(),
            baseUrl: "../"
        }
    }
}

async function buildAll() {
    await updateRenderData()
    build(`${TEMPLATE_DIR}/about.ejs`, "index.html", renderData.about);
    build(`${TEMPLATE_DIR}/projects.ejs`, "projects.html", renderData.projects);
    build(`${TEMPLATE_DIR}/blogs.ejs`, "blogs/index.html", renderData.blogs);
}

module.exports = { buildAll }