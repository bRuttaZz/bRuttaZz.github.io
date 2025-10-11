import logging
import yaml
from datetime import datetime
from pathlib import Path
from typing import cast, TypedDict, NotRequired, get_origin

from . import settings

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


class BlogYmlConf(TypedDict):
    title: str
    shortDescription: str
    longDescription: str
    keyWords: list[str]
    shareImage: str

    # optional params
    lastEdit: NotRequired[datetime]


class BlogConf(BlogYmlConf):
    dirName: str
    dirPath: Path


# Exceptions
class ParseError(Exception):
    """Config parsetime error"""

def _get_last_commit()

def _pars_blog_conf(yml_path: str | Path) -> BlogYmlConf:
    with open(yml_path, "r") as file:
        conf = cast(BlogYmlConf, yaml.load(file, Loader=yaml.CLoader))

    annotations = BlogYmlConf.__annotations__
    for key in annotations:
        if key not in conf:
            raise ParseError(f"Field required! '{key}' not found in '{yml_path}'.")
        elif get_origin(cast(type, annotations[key])) is NotRequired:
            continue

    if "lastEdit" in conf:
        conf["lastEdit"] = datetime.strptime(conf["lastEdit"], "YYYY/MM/DD")  # type:ignore[reportArgumentType]

    return conf


def _list_blogs() -> list[BlogConf]:
    blogs: dict[str, BlogConf] = {}
    for dir in settings.writings_blogs_dir.glob("[0-9]*.*"):
        if dir.joinpath("meta.yml").is_file() and dir.joinpath("main.md").is_file():
            logger.info(f"identified blog setup: {dir.name}")
            conf = _pars_blog_conf(dir.joinpath("meta.yml"))
            blogs[dir.name] = BlogConf(**conf, dirName=dir.name, dirPath=dir)

    return [blogs[name] for name in sorted(blogs.keys())]


def load_projects_conf() -> dict[str, object]:
    with open(settings.writings_conf_dir.joinpath("projects.yml"), "r") as file:
        conf = cast(ProjectsConf, yaml.load(file, Loader=yaml.CLoader))
    return {"projects": conf["projects"]}
