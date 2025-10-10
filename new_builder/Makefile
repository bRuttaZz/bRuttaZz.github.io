DEBUG ?= false

PYTHON := .venv/bin/python
WATCH_DIR := ./writings

build_dir = ./dist

help:	## Show all Makefile targets.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[33m%-30s\033[0m %s\n", $$1, $$2}'

build-dev: .venv	## Build application (dev mode)
	@DEBUG=$(DEBUG) $(PYTHON) main.py build-dev

build-prod: clean .venv	## Create production build
	@DEBUG=$(DEBUG) $(PYTHON) main.py build-prod

prod-run: build-prod ## Build and run from prod build
	@DEBUG=$(DEBUG) $(PYTHON) -m http.server -d $(build_dir) 8080

dev: clean build-dev	## Development mode run server + inotifywait
	@$(MAKE) -j 2 watch-build dev-run

dev-run:
	@DEBUG=$(DEBUG) $(PYTHON) main.py dev-run

watch-build:
	@pid=nil; inotifywait -m -r -e modify,delete,create $(WATCH_DIR) |  \
	    while read file; \
		do \
		    kill -9 $$pid 2>/dev/null; \
			$(MAKE) build-dev & \
			pid=$$!; \
		done

.venv: requirements.txt
	@python3 -m venv .venv
	@$(PYTHON) -m pip install -r requirements.txt

clean:	## Clean all build
	@$(RM) -rf $(build_dir)
