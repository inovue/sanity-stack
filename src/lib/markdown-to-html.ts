import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from 'rehype-mermaidjs'
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";


export const markdownToHtml = async (markdownContent: string) => {
  
  const processor = unified()
    .use(remarkParse)
    .use(remarkGemoji)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeMermaid)
    .use(rehypePrettyCode)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {behavior: 'wrap'})
    .use(rehypeStringify);

  const result = await processor.process(markdownContent);
  return result.toString();
}