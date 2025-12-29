import json
import logging
import subprocess
from datetime import datetime
from pathlib import Path
from typing import NotRequired, TypedDict, cast, get_origin

import yaml

from .. import settings

__dir__ = Path(__file__).parent
logger = logging.getLogger("builder")


class BlogYmlConf(TypedDict):
    title: str
    tag: str
    shortDescription: str
    longDescription: str
    keyWords: list[str]
    shareImage: str

    # optional params
    lastEdit: NotRequired[datetime]


class BlogConf(BlogYmlConf):
    dirName: str
    dirPath: Path
    route: str


# Exceptions
class ParseError(Exception):
    """Config parsetime error"""


def _get_last_commit_date(file_path: Path) -> datetime:
    file_path = file_path.resolve()
    try:
        result = subprocess.run(
            [
                "git",
                "-C",
                str(file_path.parent),
                "log",
                "-1",
                "--format=%cd",
                "--date=iso",
                "--",
                str(file_path),
            ],
            capture_output=True,
            text=True,
            check=True,
        )
        date = result.stdout.strip().split(" ")[0]
        return datetime.strptime(date, "%Y-%m-%d") if date else datetime.now()
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"[BUIDER] Git error: {e.stderr.strip()}") from e


def _pars_blog_conf(yml_path: Path) -> BlogYmlConf:
    with open(yml_path, "r") as file:
        conf = cast(BlogYmlConf, yaml.load(file, Loader=yaml.CLoader))

    annotations = BlogYmlConf.__annotations__
    for key in annotations:
        if get_origin(cast(type, annotations[key])) is NotRequired:
            continue
        elif key not in conf:
            raise ParseError(f"Field required! '{key}' not found in '{yml_path}'.")

    if "lastEdit" in conf:
        conf["lastEdit"] = datetime.strptime(conf["lastEdit"], "%Y/%m/%d")  # type:ignore[reportArgumentType]
    else:
        conf["lastEdit"] = _get_last_commit_date(yml_path.parent.joinpath("main.md"))
    return conf


def list_blogs() -> list[BlogConf]:
    blogs: dict[str, BlogConf] = {}
    for dir in settings.writings_blogs_dir.glob("[0-9]*.*"):
        if dir.joinpath("meta.yml").is_file() and dir.joinpath("main.md").is_file():
            logger.info(f"identified blog setup: {dir.name}")
            conf = _pars_blog_conf(dir.joinpath("meta.yml"))
            blogs[dir.name] = BlogConf(
                **conf,
                dirName=dir.name,
                dirPath=dir,
                route=".".join(dir.name.split(".")[1:]),
            )

    return [blogs[name] for name in sorted(blogs.keys())]


def load_blogs_conf():
    og_url = f"{settings.og_base_url}/blogs"
    share_img = (
        f"{settings.og_base_url}{settings.render_confs['asset_dir']}/imgs/avatar.jpg"
    )
    blogs = list_blogs()
    tags = [*{blg["tag"] for blg in blogs}]
    tags.sort()
    return {
        "blogs": blogs,
        "tags": tags,
        "title": "Blogs | bRuttaZz",
        "description": "Blogs of bRuttaZz (Agraj P Das)! List of some of my blog posts..",
        "keywords": "blogs, allblogs, writings, docs, agraj, agrajpdas, bruttazz, brutt, bruttsite, brutt.site",
        "url": og_url,
        "shareImage": share_img,
        "ldJson": json.dumps(
            {
                "@context": "https://schema.org",
                "@id": og_url,
                "@type": "WebPage",
                "name": "Blogs | bRuttaZz",
                "url": og_url,
                "description": "Blogs of bRuttaZz (Agraj P Das)! List of some of my blog posts..",
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
