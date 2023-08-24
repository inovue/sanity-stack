# Sanity.io + Next.js

## Start the project
[![Open in Dev Containers](https://img.shields.io/static/v1?label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/inovue/sanity-stack)



## References

* [onig.wasm 404 (Not Found) when using React / Next.js "client component](https://github.com/atomiks/rehype-pretty-code/issues/95#issuecomment-1664463512)

*[How to access Tailwind breakpoints/screens from React](https://github.com/tailwindlabs/tailwindcss/discussions/3822?sort=top)

## Bug References
*[Server.edge not defined Error on nextJS SSR functions cause site to return 500 Errors](https://answers.netlify.com/t/server-edge-not-defined-error-on-nextjs-ssr-functions-cause-site-to-return-500-errors/91793/114)

## How to deploy

```bash
# netlifyのアプリケーションを作成
netlify init

# 環境変数をアプリケーションにインポート
netlify env:import .env.local

```