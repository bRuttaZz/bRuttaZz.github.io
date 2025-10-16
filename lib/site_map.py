from urllib.parse import urljoin
from . import settings


def generate_sitemap():
    with open(
        settings.dist_path.joinpath("sitemap.txt"), "w", encoding=settings.encoding
    ) as sitemap:
        for file in settings.dist_path.rglob("*.html"):
            file = file.relative_to(settings.dist_path)
            if file.name == "index.html":
                file = file.parent
            if file.suffix == ".html":
                file = file.with_suffix("")

            url = urljoin(settings.og_base_url, str(file))
            _ = sitemap.write(url + "\n")
