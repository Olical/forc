.PHONY: default lint test

bin = ./node_modules/.bin

default: test build

lint:
	$(bin)/standard

test: lint
	$(bin)/babel-tape-runner test/**/*.js | $(bin)/faucet

build:
	$(bin)/babel src -d lib
