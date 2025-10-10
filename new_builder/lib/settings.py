import os
import sys
import logging
import datetime
from pathlib import Path

logger = logging.getLogger()
lhandler = logging.StreamHandler(sys.stdout)
lhandler.setFormatter(
    logging.Formatter("[{levelname:^4}] \033[1;31m{name}\033[0m: {message}", style="{")
)
logger.addHandler(lhandler)
logger.setLevel(logging.DEBUG if os.getenv("DEBUG") == "true" else logging.INFO)


template_dir = Path.joinpath(Path(__file__).parent.parent, "templates")
writings_conf_dir = Path.joinpath(Path(__file__).parent.parent, "writings", "configs")
writings_blogs_dir = Path.joinpath(Path(__file__).parent.parent, "writings", "blogs")
assets_dir = Path.joinpath(Path(__file__).parent.parent, "assets")

blog_asset_uri = "/assets/blogs"

# common redner confs
render_confs = {
    "asset_dir": "/assets",
    "build_year": datetime.datetime.now(datetime.timezone.utc).year,
}

dist_path = Path("dist")
encoding = "utf-8"

# Dev server setups
dev_server_rout_table = {
    "/favicon.ico": assets_dir,
    "/assets/blogs": dist_path.joinpath("assets", "blogs"),
    "/assets": assets_dir,
    "/": dist_path,
}
dev_server_port: int = int(os.getenv("PORT", 8000))
