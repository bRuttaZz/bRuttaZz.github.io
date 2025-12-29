import sys

from lib.asset_man import setup_assets
from lib.dev_server import dev_server
from lib.render import render_all

if __name__ == "__main__":
    if len(sys.argv) > 1:
        match sys.argv[1]:
            case "build-dev":
                sys.exit(render_all())
            case "build-prod":
                if render_all():
                    sys.exit(2)
                setup_assets()
            case "dev-run":
                dev_server()
            case _:
                print(f"Unknown command:'{sys.argv[1]}'. Expected: build/dev")
                sys.exit(1)
    else:
        print("Command expected: build/dev")
        sys.exit(1)
