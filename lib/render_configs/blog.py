import json
import os
import logging
import shutil
from pathlib import Path

import markdown
from pygments.formatters import HtmlFormatter
from lxml import html as lxml

from .. import settings
from .blogs import BlogConf
from .about import load_about_conf

logger = logging.getLogger("builder")


def _correct_url(html_str: str, prefix: str) -> str:
    doc = lxml.fromstring(html_str)

    for el in doc.xpath("//*[@src or @href]"):
        attr = "src" if el.get("src") else "href"
        url = el.get(attr)
        if url and not url.startswith(("http://", "https://", "//")):
            el.set(attr, os.path.join(prefix, url))

    return lxml.tostring(doc, pretty_print=True, encoding="unicode")


def _copy_assets(dir_path: Path, dir_name: str):
    for file in dir_path.glob("*"):
        if file.name in ("main.md", "meta.yml"):
            continue

        new_loc = os.path.join(
            settings.dist_path, settings.blog_asset_uri.strip("/"), dir_name, file.name
        )
        logger.debug(f"copying asset: '{file}' -> '{new_loc}'")

        os.makedirs(os.path.dirname(new_loc), exist_ok=True)
        _ = shutil.copy(file, new_loc)


def render_blog(md_path: Path, asset_url_prefix: str) -> str:
    with open(md_path, "r") as md_file:
        md = md_file.read()
    html = markdown.markdown(md, extensions=["fenced_code", "codehilite"])
    return f"""
    {_correct_url(html, os.path.join(settings.blog_asset_uri, asset_url_prefix))}

    <style>
        {HtmlFormatter(style="solarized-dark").get_style_defs(".codehilite")}
    </style>
    """


def load_blog_conf(conf: BlogConf):
    _copy_assets(conf["dirPath"], conf["dirName"])
    og_url = f"{settings.og_base_url}/blogs/{conf['route']}"
    return {
        "title": conf["title"],
        "last_edited": conf.get("lastEdit"),
        "generated_content": render_blog(
            conf["dirPath"].joinpath("main.md"),
            os.path.join(settings.blog_asset_uri, conf["dirName"]),
        ),
        "contacts": load_about_conf()["aboutConf"]["contacts"],
        "description": conf["longDescription"],
        "keywords": ", ".join(conf["keyWords"]),
        "url": og_url,
        "shareImage": conf["shareImage"],
        "ldJson": json.dumps(
            {
                "@context": "https://schema.org",
                "@id": og_url,
                "@type": "BlogPosting",
                "headline": conf["title"],
                "url": og_url,
                "description": conf["longDescription"],
                "image": {
                    "@type": "ImageObject",
                    "url": conf["shareImage"],
                },
                "author": {
                    "@type": "Person",
                    "name": "Agraj P Das",
                    "url": settings.og_base_url,
                },
                "mainEntityOfPage": {"@type": "WebPage", "@id": og_url},
            },
            indent=2,
        ),
    }
