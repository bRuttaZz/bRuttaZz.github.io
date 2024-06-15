const fs = require("node:fs")
const markdownIt = require("markdown-it")
const jsdom = require("jsdom")
const hljs = require("highlight.js")
const { listBlogs } = require("./render-blogs")
const { build } = require("./common/render")
const { TEMPLATE_DIR } = require("./settings")

const md = markdownIt({
    html: true,
    xhtmlOut: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre><code class="hljs">' +
                   hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                   '</code></pre>';
          } catch (__) {}
        }
        return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
      }
})

/**
 * Render Html content from markdown content
 * @param {String} mdFile - path to markdown file 
 */
function renderHtmlFromMd(mdFile) {
    const html = md.render(fs.readFileSync(mdFile, { encoding: 'utf-8' }))
    const { window } = new jsdom.JSDOM(html)
    for (let img of window.document.querySelectorAll("img")) {
        if (img.src[0] === ".")
            img.src = "/" + mdFile.split("/").slice(0, -1).join("/") + "/" + img.src
    }
    return window.document.documentElement.outerHTML;
}

async function prepareBlogData() {
    const blogs = []
    const blogsData = await listBlogs()
    sortedBlogRankList = Object.keys(blogsData).filter(el => el !== "pinned").sort()
    for (let blogRank of sortedBlogRankList) {
        const blog = blogsData[blogRank]
        blogs.push({
            name: blog.name,
            title: blog.meta.title,
            description: blog.meta.longDescription,
            url: `/blogs/${blog.name}`,
            keywords: blog.meta.keyWords?.join(", "),
            baseUrl: '../',
            lastUpdateDate: blog.mdate,
            content: renderHtmlFromMd(blog.main),
            shareImage: blog.meta.shareImage,
        })
    }
    return blogs
}

/**
 * Build all blogs
 * @param {String} template - template path 
 * @param {String} dumpDir - destination directory 
 * @param {Object} blogData - array of blog data objects
 */
function buildAllBlogs(template, dumpDir, blogData = []) {
    for (let blog of blogData) {
        build(template, `${dumpDir}/${blog.name}.html`, blog, [TEMPLATE_DIR], false)
    }
}


module.exports = { buildAllBlogs, prepareBlogData }