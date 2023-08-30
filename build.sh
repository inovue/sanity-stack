#!/bin/bash

npx --yes playwright install --with-deps chromium

rm -rf public/shiki && mkdir -p public/shiki && cp -r node_modules/shiki/{dist,languages,samples,themes} public/shiki/