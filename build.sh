npx --yes playwright install --with-deps chromium

rm -rf public/dist public/languages public/themes && 
mkdir -p public/dist && 
cp -r node_modules/shiki/dist/onig.wasm public/dist/onig.wasm && 
cp -r node_modules/shiki/languages public && 
cp -r node_modules/shiki/themes public
