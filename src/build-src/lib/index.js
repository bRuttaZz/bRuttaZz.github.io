const fs = require("fs")
const { DOMAIN, PROTOCOL } = require("./settings")
const { build } = require("./common/render")
const { TEMPLATE_DIR } = require("./settings")
const aboutPage = require("./render-about")
const projectsPage = require("./render-projects")
const blogs = require("./render-blogs")
const blog = require("./render-blog")


let renderData

async function updateRenderData() {
    renderData = {
        about: {
            bioDat: aboutPage.renderBio(),
            contactPortion: aboutPage.renderAbout(),
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
    const urls = []

    await updateRenderData()
    urls.push(build(`${TEMPLATE_DIR}/about.ejs`, "index.html", renderData.about));
    urls.push(build(`${TEMPLATE_DIR}/projects.ejs`, "projects.html", renderData.projects));
    fs.rmSync('blogs', {recursive:true, force:true})
    fs.mkdirSync('blogs')
    urls.push(build(`${TEMPLATE_DIR}/blogs.ejs`, "blogs/index.html", renderData.blogs));
    console.log("Building blog files..")
    urls.push(...blog.buildAllBlogs(`${TEMPLATE_DIR}/blog.ejs`, 'blogs', await blog.prepareBlogData()))

    // create sitemap
    console.log("Generating sitemap..")
    let sitemap = ""
    for (let route of urls){
        if (route.slice(-1)==="/")
            route = route.slice(0, -1)
        sitemap += `${PROTOCOL}://${DOMAIN}${route.length?'/'+route : ''}\n`
    }
    fs.writeFileSync("sitemap.txt", sitemap, {encoding: 'utf-8'})
    console.log("BUILD COMPLETE!")
}

module.exports = { buildAll }