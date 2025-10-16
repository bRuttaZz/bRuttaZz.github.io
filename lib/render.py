import logging
from typing import TypedDict, Any
from jinja2 import FileSystemLoader, Environment, select_autoescape

from . import settings
from .render_configs.about import load_about_conf
from .render_configs.projects import load_projects_conf
from .render_configs.blogs import load_blogs_conf, list_blogs
from .render_configs.blog import load_blog_conf
from .site_map import generate_sitemap

logger = logging.getLogger("builder")


class RenderConf(TypedDict):
    file: str
    confs: dict[str, Any]


render_confs: dict[str, RenderConf] = {
    "index.html": {
        "file": "about.html",
        "confs": load_about_conf(),
    },
    "blogs/index.html": {
        "file": "blogs.html",
        "confs": load_blogs_conf(),
    },
    "projects/index.html": {
        "file": "projects.html",
        "confs": load_projects_conf(),
    },
    **{
        f"blogs/{blog['route']}.html": {
            "file": "blog.html",
            "confs": load_blog_conf(blog),
        }
        for blog in list_blogs()
    },
}


def render_all() -> int:
    env = Environment(
        loader=FileSystemLoader(settings.template_dir), autoescape=select_autoescape()
    )
    settings.dist_path.mkdir(parents=True, exist_ok=True)

    for name, confs in render_confs.items():
        logger.info(f"rendering '{name}'..")
        file_name = settings.dist_path.joinpath(name)
        file_name.parent.mkdir(exist_ok=True, parents=True)
        try:
            tmplt = env.get_template(confs["file"])
        except Exception as exp:
            logger.error(f"Error loading template '{confs['file']}': {exp}")
            return 2

        with open(file_name, "w", encoding=settings.encoding) as file:
            _ = file.write(
                tmplt.render(
                    **settings.render_confs,
                    **confs["confs"],
                )
            )
            file.flush()

    logger.info("generating sitemap..")
    generate_sitemap()

    return 0
