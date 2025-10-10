import shutil
import logging
from . import settings

logger = logging.getLogger("builder")


def setup_assets():
    logger.info("Copying static assets..")
    _ = shutil.copytree(
        settings.assets_dir, settings.dist_path.joinpath("assets"), dirs_exist_ok=True
    )
    _ = shutil.copy(
        settings.assets_dir.joinpath("favicon.ico"),
        settings.dist_path.joinpath("favicon.ico"),
    )
