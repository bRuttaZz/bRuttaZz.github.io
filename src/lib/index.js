const fs = require("fs");
const { DOMAIN, PROTOCOL, OUT_DIR } = require("./settings");
const { build } = require("./common/render");
const { TEMPLATE_DIR } = require("./settings");
const aboutPage = require("./render-about");
const projectsPage = require("./render-projects");
const blogs = require("./render-blogs");
const blog = require("./render-blog");

let renderData;

async function updateRenderData() {
  renderData = {
    about: {
      bioDat: aboutPage.renderBio(),
      contactPortion: aboutPage.renderAbout(),
      baseUrl: "",
    },
    projects: {
      projects: projectsPage.renderProjectCards(),
      baseUrl: "",
    },
    blogs: {
      blogs: await blogs.renderBlogCards(),
      baseUrl: "../",
    },
  };
}

async function buildAll(devMode = false) {
  console.debug(`DEBUG MODE  : ${devMode}`);

  const urls = [];
  if (!devMode) fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log("Preparing the assets...");
  fs.cpSync("assets", `${OUT_DIR}/assets`, { recursive: true });
  fs.cpSync("assets/favicon.ico", `${OUT_DIR}/favicon.ico`);

  console.log("Building basics...");
  await updateRenderData();
  urls.push(
    build(
      `${TEMPLATE_DIR}/about.ejs`,
      `${OUT_DIR}/index.html`,
      renderData.about,
    ),
  );
  urls.push(
    build(
      `${TEMPLATE_DIR}/projects.ejs`,
      `${OUT_DIR}/projects.html`,
      renderData.projects,
    ),
  );
  fs.mkdirSync(`${OUT_DIR}/blogs`, { recursive: true });
  urls.push(
    build(
      `${TEMPLATE_DIR}/blogs.ejs`,
      `${OUT_DIR}/blogs/index.html`,
      renderData.blogs,
    ),
  );
  console.log("Building blog files..");
  urls.push(
    ...blog.buildAllBlogs(
      `${TEMPLATE_DIR}/blog.ejs`,
      `${OUT_DIR}/blogs`,
      await blog.prepareBlogData(),
    ),
  );

  // create sitemap
  console.log("Generating sitemap..");
  let sitemap = "";
  for (let route of urls) {
    if (route.slice(-1) === "/") route = route.slice(0, -1);
    route = route.slice(OUT_DIR.length + 1);
    sitemap += `${PROTOCOL}://${DOMAIN}${route.length ? "/" + route : ""}\n`;
  }
  fs.writeFileSync(`${OUT_DIR}/sitemap.txt`, sitemap, { encoding: "utf-8" });
  fs.writeFileSync(`${OUT_DIR}/CNAME`, DOMAIN), { encoding: "utf-8" };

  console.log("BUILD COMPLETE!");
}

module.exports = { buildAll };
