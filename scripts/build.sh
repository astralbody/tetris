#!/usr/bin/env bash

rm -rf ./dist

export NODE_ENV=production

./node_modules/.bin/webpack
cp -a ./public/. ./dist/
