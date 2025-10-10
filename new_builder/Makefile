DEBUG ?= false

help:	## Show all Makefile targets.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[33m%-30s\033[0m %s\n", $$1, $$2}'

build:	## Build application
	DEBUG=$(DEBUG) python main.py build

dev:	## Run development server
	DEBUG=$(DEBUG) python main.py dev
