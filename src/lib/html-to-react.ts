// [Markdownのサイト内リンクをNext.jsの<Link>にしたい](https://zenn.dev/thiragi/articles/ce13a4be4110c0)


import { unified } from "unified";
import rehypeParse from "rehype-parse"
import rehypeReact from "rehype-react";
import PostImage from "@/app/(user)/components/PostImage";
import { createElement } from "react";

export const htmlToReact = async (htmlContent: string) => {
  
  const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeReact, {
    createElement: createElement,
    components: { 
      img: PostImage()
    },
  });

  return processor.processSync(htmlContent).result
}