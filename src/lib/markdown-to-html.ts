import rehypeKatex from "rehype-katex";
import rehypeMermaid from 'rehype-mermaidjs'
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from "rehype-stringify";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { setCDN } from "shiki";


export const markdownToHtml = async (markdownContent: string, preview:boolean=false) => {
  
  if(preview) setCDN("/");

  const processor = unified()
  processor.use(remarkParse)
  processor.use(remarkGemoji)
  processor.use(remarkGfm)
  processor.use(remarkMath)
  
  processor.use(remarkRehype)
  
  processor.use(rehypeKatex)
  //processor.use(rehypeMermaid)
  processor.use(rehypePrettyCode)

  processor.use(rehypeStringify)
    
  const result = await processor.process(markdownContent)
  return result.toString()
};