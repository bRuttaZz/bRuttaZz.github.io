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
    contacts: Contacts


def load_about_conf():
    with open(settings.writings_conf_dir.joinpath("about.yml"), "r") as file:
        conf = cast(AboutConf, yaml.load(file, Loader=yaml.CLoader))
    return {"aboutConf": conf}
