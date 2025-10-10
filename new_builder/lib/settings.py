import os
import sys
import logging
from pathlib import Path

logger = logging.getLogger()
lhandler = logging.StreamHandler(sys.stdout)
lhandler.setFormatter(
    logging.Formatter("[{levelname:^8}] {name}: {message}", style="{")
)
logger.addHandler(lhandler)
logger.setLevel(logging.DEBUG if os.getenv("DEBUG") == "true" else logging.INFO)


template_dir = Path.joinpath(Path(__file__).parent.parent, "templates")
render_confs = {"asset_dir": "/assets"}

dist_path = Path("dist")
encoding = "utf-8"

# Dev server setups
dev_server_rout_table = {
    "/favicon.ico": "assets",
    "/assets": "assets",
    "/": "dist",
}
dev_server_port: int = int(os.getenv("PORT", 8000))
