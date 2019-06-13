#!/usr/bin/env bash

rm -rf ./dist

export ANALYZER=true
export NODE_ENV=production

./node_modules/.bin/webpack
