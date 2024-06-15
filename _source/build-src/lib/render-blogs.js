const fs = require("node:fs")
const { BLOGS_SRC_DIR, BLOG_META_KEYS } = require("./settings")
const renderers = require("./common/renderers")
const { getGitLastUpdateTime } = require("./common/utils")


/**
 * List blogs 
 * @returns {Promise<Object>}
 */
async function listBlogs() {
    const blogs = {pinned:[]}
    for (let file of fs.readdirSync(BLOGS_SRC_DIR, { withFileTypes: true })) {
        if (file.isDirectory()) {
            // 
            const files = fs.readdirSync(`${BLOGS_SRC_DIR}/${file.name}`, {withFileTypes:true})
            const fileNames = files.filter(f=>f.isFile()).map(f=>f.name)
            const blog_rank = parseInt(file.name.split(".")[0])
            if (blog_rank && fileNames.includes("main.md") &&  fileNames.includes("meta.json") ) {
                const meta = JSON.parse(fs.readFileSync(`${BLOGS_SRC_DIR}/${file.name}/meta.json`, 'utf-8'))
                if (BLOG_META_KEYS
                    .filter(el=>el in meta).length !== BLOG_META_KEYS.length) {
                        console.error(`SUFFICIENT META KEYS NOT FOUND : ${file.name}`)
                        continue    
                    } 
                
                blogs[blog_rank] = {
                    name: file.name.split(".").splice(1).join(),
                    base: `${BLOGS_SRC_DIR}/${file.name}`, 
                    meta: meta,
                    main: `${BLOGS_SRC_DIR}/${file.name}/main.md`,
                    mdate: await getGitLastUpdateTime(`${BLOGS_SRC_DIR}/${file.name}`),
                } 
                if ("1" === file.name[0]) {
                    blogs.pinned.push(blog_rank)
                }
            }
        }
    }
    return blogs
}

async function renderBlogCards() {
    return renderers.renderBlogCards(await listBlogs())
}

module.exports = {
    listBlogs,
    renderBlogCards,
}