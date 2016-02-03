.PHONY: default lint test

bin = ./node_modules/.bin

default: test build

lint:
	$(bin)/standard

test: lint
	$(bin)/babel-tape-runner test/**/*.js | $(bin)/faucet

test-watch:
	$(bin)/nodemon --exec "make test"

build:
	$(bin)/babel src -d lib
