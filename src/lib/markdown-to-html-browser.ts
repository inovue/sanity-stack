import rehypeKatex from "rehype-katex";
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from "rehype-stringify";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

import { setCDN, setWasm, BUNDLED_LANGUAGES, getHighlighter, Lang } from "shiki";
import remarkRehype from "remark-rehype";
import rehypeEscapeMermaid from "./rehypeEscapeMermaid";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";


export const getLangTypesFromMarkdown = (markdownContent: string) => {
  return Array.from(new Set(Array.from(
    markdownContent.matchAll(/^```(?<lang>\w+)\s?.*$/gm), 
    (v=>v.groups?.lang)
  ).filter((v):v is Lang => !!v )));
}
  

export const markdownToHtmlBrowser = async (markdownContent: string) => {
  const langs = getLangTypesFromMarkdown(markdownContent);
  
  // setWasm("/shiki/dist/onig.wasm");
  setCDN("/shiki/");

  const processor = unified()
    .use(remarkParse)
    .use(remarkGemoji)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeEscapeMermaid)
    .use(rehypePrettyCode, {
      getHighlighter: (options) => getHighlighter({
        ...options,
        theme:'github-dark-dimmed', 
        langs: [...langs]
      })
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify);
    
  const result = await processor.process(markdownContent);
  return result.toString();
}