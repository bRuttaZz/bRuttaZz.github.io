// domain configs
const DOMAIN = "brutt.site";
const PROTOCOL = "https";

const TEMPLATE_DIR = "./templates";
const BLOGS_SRC_DIR = "./writings/blogs";

const OUT_DIR = "./dist";

const BLOG_META_KEYS = [
  "title",
  "shortDescription",
  "longDescription",
  "keyWords",
];

module.exports = {
  TEMPLATE_DIR,
  BLOGS_SRC_DIR,
  BLOG_META_KEYS,
  DOMAIN,
  PROTOCOL,
  OUT_DIR,
};
