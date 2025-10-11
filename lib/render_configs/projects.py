import json
import logging
import yaml
from pathlib import Path
from typing import cast, TypedDict

from .. import settings

__dir__ = Path(__file__).parent
logger = logging.getLogger("builder")


class ProjectConf(TypedDict):
    name: str
    shortInfo: str
    detailedInfo: str
    source: str
    license: str
    link: str
    coverimage: str


class ProjectsConf(TypedDict):
    projects: list[ProjectConf]
    description: str
    keywords: list[str]


def load_projects_conf():
    with open(settings.writings_conf_dir.joinpath("projects.yml"), "r") as file:
        conf = cast(ProjectsConf, yaml.load(file, Loader=yaml.CLoader))
    og_url = f"{settings.og_base_url}/projects"
    share_img = (
        f"{settings.og_base_url}{settings.render_confs['asset_dir']}/imgs/avatar.jpg"
    )
    return {
        "projects": conf["projects"],
        "title": "Projects | bRuttaZz",
        "description": conf["description"],
        "keywords": ", ".join(conf["keywords"]),
        "url": og_url,
        "shareImage": share_img,
        "ldJson": json.dumps(
            {
                "@context": "https://schema.org",
                "@id": og_url,
                "@type": "WebPage",
                "name": "Projects | bRuttaZz",
                "url": og_url,
                "description": conf["description"],
                "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": share_img,
                },
                "author": {
                    "@type": "Person",
                    "name": "Agraj P Das",
                    "url": settings.og_base_url,
                },
            },
            indent=2,
        ),
    }
