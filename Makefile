.PHONY: default lint test test-watch build

BIN = ./node_modules/.bin
TESTS = $(shell find test/ -name '*.js')

default: test build

lint:
	$(BIN)/standard

test: lint
	$(BIN)/babel-tape-runner $(TESTS) | $(BIN)/faucet

test-watch:
	$(BIN)/nodemon --exec "npm test"

build:
	$(BIN)/babel src -d lib
