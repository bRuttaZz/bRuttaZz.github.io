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


def load_projects_conf():
    with open(settings.writings_conf_dir.joinpath("projects.yml"), "r") as file:
        conf = cast(ProjectsConf, yaml.load(file, Loader=yaml.CLoader))
    return {"projects": conf["projects"]}
