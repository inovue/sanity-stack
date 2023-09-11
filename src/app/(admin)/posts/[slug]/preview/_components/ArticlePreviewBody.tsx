'use client'

import classNames from "classnames"
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import remarkGemoji from "remark-gemoji"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
//import remarkMermaid from 'remark-mermaidjs'
import rehypePrettyCode from "rehype-pretty-code"
import {Options} from 'rehype-pretty-code'
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import {img} from "@/app/(user)/components/MDX"
import rehypeRaw from 'rehype-raw'
import { setCDN, setWasm, getHighlighter } from "shiki";
import getLangTypesFromMarkdown from "@/lib/getLangTypesFromMarkdown"
import theme from 'shiki/themes/github-dark-dimmed.json'
import { useEffect, useState } from "react"
import mermaid from "mermaid"

const components = {
  img: img()
}

export type ArticleBodyProps = {
  source: string;
  className?: string;
}

export default function ArticleBodyPreview({source, className}: ArticleBodyProps) {
  
  const [serializeResult, setSerializeResult] = useState<Awaited<ReturnType<typeof serialize>>>()
  
  setCDN("/shiki/");

  useEffect(() => {
    (async () => {
      
      const serializeOptions :Parameters<typeof serialize>[1] = {
        scope: {},
        mdxOptions: {
          development: process.env.NODE_ENV === 'development',
          remarkRehypeOptions:{
            allowDangerousHtml: true,
          },
          remarkPlugins: [
            remarkGemoji, 
            remarkGfm, 
            remarkMath,
            //remarkMermaid 
          ],
          rehypePlugins: [
            rehypeKatex, 
            [rehypePrettyCode, {
              getHighlighter: (options:Pick<Options, 'theme'>) => getHighlighter({
                ...options,
                theme: theme as any, 
                langs: [...getLangTypesFromMarkdown(source)]
              })
            }], 
            rehypeSlug, 
            [rehypeAutolinkHeadings, {behavior: 'wrap'}],
            // @ts-expect-error
            rehypeRaw
          ],
          format: 'md',
        },
        parseFrontmatter: false,
      }

      const result = await serialize(source, serializeOptions)

      setSerializeResult(result)
    })()
  }, [source])

  useEffect(() => {
    if(serializeResult){
      try {
        mermaid.initialize({ startOnLoad: false });
        mermaid.run({nodes: document.querySelectorAll('pre[data-language="mermaid"]')});
      } catch (error) {
        console.error(error);
      }
    }
  }, [serializeResult]);


  return (
    <section className={classNames(['prose','dark:prose-invert'], className)}>
      {serializeResult && <MDXRemote {...serializeResult} components={components} />}
    </section>
  )
}
