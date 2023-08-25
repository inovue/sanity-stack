import rehypeKatex from "rehype-katex";
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from "rehype-stringify";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

import { setCDN, setWasm } from "shiki";
import remarkRehype from "remark-rehype";
import rehypeEscapeMermaid from "./rehypeEscapeMermaid";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export const markdownToHtmlBrowser = async (markdownContent: string) => {
  
  setWasm("/shiki/dist/onig.wasm");
  setCDN("/shiki/");

  const processor = unified()
    .use(remarkParse)
    .use(remarkGemoji)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeEscapeMermaid)
    .use(rehypePrettyCode)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify);
    
  const result = await processor.process(markdownContent);
  return result.toString();
}