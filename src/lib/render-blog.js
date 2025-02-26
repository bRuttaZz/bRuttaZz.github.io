const fs = require("node:fs");
const markdownIt = require("markdown-it");
const jsdom = require("jsdom");
const hljs = require("highlight.js");
const { listBlogs } = require("./render-blogs");
const { build } = require("./common/render");
const { TEMPLATE_DIR, OUT_DIR } = require("./settings");

const md = markdownIt({
  html: true,
  xhtmlOut: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre><code class="hljs">' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (__) {}
    }
    return (
      '<pre><code class="hljs">' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});

/**
 * Move blog assets
 */
function prepareBlogAssets(mdFile) {
  const dir = mdFile.split("/").slice(0, -1).join("/");
  const blogDir = dir.split("/").slice(-1)[0];
  fs.mkdirSync(`${OUT_DIR}/assets/blog/${blogDir}`, { recursive: true });
  const matches = [
    ...fs.globSync(`${dir}/*.png`),
    ...fs.globSync(`${dir}/*.jpg`),
    ...fs.globSync(`${dir}/*.jpeg`),
  ];
  matches.forEach((filePath) => {
    const fileName = filePath.split("/").slice(-1)[0];
    fs.copyFileSync(filePath, `${OUT_DIR}/assets/blog/${blogDir}/${fileName}`);
  });
}

/**
 * Render Html content from markdown content
 * @param {String} mdFile - path to markdown file
 */
function renderHtmlFromMd(mdFile) {
  prepareBlogAssets(mdFile);
  const html = md.render(fs.readFileSync(mdFile, { encoding: "utf-8" }));
  const { window } = new jsdom.JSDOM(html);
  for (let img of window.document.querySelectorAll("img")) {
    if (img.src[0] === ".")
      img.src =
        "/assets/blog/" +
        mdFile.split("/").slice(-2, -1)[0] +
        "/" +
        img.src.slice(2);
  }
  return window.document.documentElement.outerHTML;
}

async function prepareBlogData() {
  const blogs = [];
  const blogsData = await listBlogs();
  sortedBlogRankList = Object.keys(blogsData)
    .filter((el) => el !== "pinned")
    .sort();
  for (let blogRank of sortedBlogRankList) {
    const blog = blogsData[blogRank];
    blogs.push({
      name: blog.name,
      title: blog.meta.title,
      description: blog.meta.longDescription,
      url: `/blogs/${blog.name}`,
      keywords: blog.meta.keyWords?.join(", "),
      baseUrl: "../",
      lastUpdateDate: blog.mdate,
      content: renderHtmlFromMd(blog.main),
      shareImage: blog.meta.shareImage,
    });
  }
  return blogs;
}

/**
 * Build all blogs
 * @param {String} template - template path
 * @param {String} dumpDir - destination directory
 * @param {Object} blogData - array of blog data objects
 */
function buildAllBlogs(template, dumpDir, blogData = []) {
  const urls = [];
  for (let blog of blogData) {
    urls.push(
      build(
        template,
        `${dumpDir}/${blog.name}.html`,
        blog,
        [TEMPLATE_DIR],
        false,
      ),
    );
  }
  return urls;
}

module.exports = { buildAllBlogs, prepareBlogData };
