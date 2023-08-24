#!/bin/sh
# postCreateCommand.sh

echo "START Install"

sudo chown -R vscode:vscode .


echo "First of all, please execute the following command"
echo "-----------------------------------------------"
echo "git config --global user.name \"Your Name\""
echo "git config --global user.email \"Your Email\""
echo "-----------------------------------------------"

cp .env.local.example .env.local
npm ci
npx --yes playwright install --with-deps chromium

rm -rf public/dist public/languages public/themes && 
mkdir -p public/dist && 
cp -r node_modules/shiki/dist/onig.wasm public/dist/onig.wasm && 
cp -r node_modules/shiki/languages public && 
cp -r node_modules/shiki/themes public

echo "FINISH Install"