import sys
from lib.render import render_all
from lib.dev_server import dev_server

if __name__ == "__main__":
    if len(sys.argv) > 1:
        match sys.argv[1]:
            case "build":
                sys.exit(render_all())
            case "dev":
                if render_all():
                    sys.exit(2)
                dev_server()
            case _:
                print(f"Unknown command:'{sys.argv[1]}'. Expected: build/dev")
                sys.exit(1)
    else:
        print("Command expected: build/dev")
        sys.exit(1)
