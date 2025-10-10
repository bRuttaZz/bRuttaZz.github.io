import json
import logging
import yaml
from pathlib import Path
from typing import cast, TypedDict

from .. import settings

__dir__ = Path(__file__).parent
logger = logging.getLogger("builder")


class Contacts(TypedDict):
    email: str
    matrix: str
    mastodon: str
    github: str
    linkedin: str
    instagram: str


class AboutConf(TypedDict):
    pgpKeySign: str
    pgpRelPath: str
    bornBC: str
    jobTitle: str
    jobFirm: str
    jobFirmUrl: str
    spotifyProfile: str
    description: str
    keywords: list[str]
    contacts: Contacts


def load_about_conf():
    with open(settings.writings_conf_dir.joinpath("about.yml"), "r") as file:
        conf = cast(AboutConf, yaml.load(file, Loader=yaml.CLoader))
    share_img = (
        f"{settings.og_base_url}{settings.render_confs['asset_dir']}/imgs/avatar.jpg"
    )
    return {
        "aboutConf": conf,
        "title": "bRuttaZz",
        "description": conf["description"],
        "keywords": ", ".join(conf["keywords"]),
        "url": settings.og_base_url,
        "shareImage": share_img,
        "ldJson": json.dumps(
            {
                "@context": "https://schema.org",
                "@id": settings.og_base_url,
                "@type": "WebPage",
                "name": "bRuttaZz",
                "url": settings.og_base_url,
                "description": conf["description"],
                "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": share_img,
                },
                "sameAs": [
                    "https://github.com/bruttazz",
                    "https://instagram.com/bruttazz",
                    "https://fosstodon.org/@bRUttaZz",
                ],
                "author": {
                    "@type": "Person",
                    "name": "Agraj P Das",
                    "url": settings.og_base_url,
                },
            },
            indent=2,
        ),
    }
