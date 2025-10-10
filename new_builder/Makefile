DEBUG ?= false

PYTHON := .venv/bin/python
WATCH_DIR := ./writings

help:	## Show all Makefile targets.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[33m%-30s\033[0m %s\n", $$1, $$2}'

build: .venv	## Build application
	@DEBUG=$(DEBUG) $(PYTHON) main.py build

run: .venv	## Run development server
	@DEBUG=$(DEBUG) $(PYTHON) main.py dev

dev: 	## Development mode run server + inotifywait
	@$(MAKE) -j 2 watch-build run

watch-build:
	@pid=nil; inotifywait -m -r -e modify,delete,create $(WATCH_DIR) |  \
	    while read file; \
		do \
		    kill -9 $$pid 2>/dev/null; \
			$(MAKE) build & \
			pid=$$!; \
		done

.venv: requirements.txt
	@python3 -m venv .venv
	@$(PYTHON) -m pip install -r requirements.txt
