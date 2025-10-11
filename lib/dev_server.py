import logging
import http.server
import socketserver
import os
from typing import override
from urllib.parse import unquote
from . import settings

logger = logging.getLogger("server")


class CustomHandler(http.server.SimpleHTTPRequestHandler):
    @override
    def translate_path(self, path: str):
        path = unquote(path)
        for mount_url, dir_path in settings.dev_server_rout_table.items():
            if path.startswith(mount_url):
                relative_path = path[len(mount_url) :]
                return os.path.join(os.getcwd(), dir_path, relative_path.lstrip("/"))
        return super().translate_path(path)

    @override
    def log_message(self, format: str, *args: list[object]):
        logger.debug(f"{self.address_string()} - {format % args}")


class TCPServer(socketserver.TCPServer):
    allow_reuse_address: bool = True


def dev_server():
    with TCPServer(("", settings.dev_server_port), CustomHandler) as httpd:
        logger.info(
            f"Serving at \033[1;32mhttp://localhost:{settings.dev_server_port}\033[0m"
        )
        logger.info("Mounted directories:")
        for url, path in settings.dev_server_rout_table.items():
            logger.info(f"  {url} → {path}")
        try:
            httpd.serve_forever()
        except BaseException:
            logger.error("Stoping server..")
            httpd.shutdown()
