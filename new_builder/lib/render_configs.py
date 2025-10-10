import yaml
from pathlib import Path
from typing import cast, TypedDict

__dir__ = Path(__file__).parent


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


def load_projects_conf() -> dict[str, object]:
    with open(Path(__dir__, "..", "writings", "configs", "projects.yml"), "r") as file:
        conf = cast(ProjectsConf, yaml.load(file, Loader=yaml.CLoader))
    return {"projects": conf["projects"]}
