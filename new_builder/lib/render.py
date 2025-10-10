from typing import TypedDict
from jinja2 import FileSystemLoader, Environment, select_autoescape

from . import settings
from .settings import logger
from .render_configs import load_projects_conf


class RenderConf(TypedDict):
    file: str
    confs: dict[str, object]


render_confs: dict[str, RenderConf] = {
    "index.html": {
        "file": "about.html",
        "confs": {},
    },
    "blogs.html": {
        "file": "blogs.html",
        "confs": {"blogs": []},
    },
    "projects.html": {
        "file": "projects.html",
        "confs": load_projects_conf(),
    },
}


def render_all() -> int:
    env = Environment(
        loader=FileSystemLoader(settings.template_dir), autoescape=select_autoescape()
    )
    settings.dist_path.mkdir(parents=True, exist_ok=True)

    for name, confs in render_confs.items():
        logger.info(f"rendering '{name}'..")
        try:
            tmplt = env.get_template(confs["file"])
        except Exception as exp:
            logger.error(f"Error loading template '{confs['file']}': {exp}")
            return 2

        with open(
            settings.dist_path.joinpath(name), "w", encoding=settings.encoding
        ) as file:
            _ = file.write(
                tmplt.render(
                    **settings.render_confs,
                    **confs["confs"],
                )
            )
            file.flush()
        logger.info(f"rendering competed :'{name}'!")

    return 0
