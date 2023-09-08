'use client'

import classNames from "classnames"
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import remarkGemoji from "remark-gemoji"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
//import remarkMermaid from 'remark-mermaidjs'
import rehypePrettyCode from "rehype-pretty-code"
import {Options} from 'rehype-pretty-code'
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import PostImage from "@/app/(user)/components/PostImage"
import rehypeRaw from 'rehype-raw'
import { setCDN, setWasm, getHighlighter } from "shiki";
import getLangTypesFromMarkdown from "@/lib/getLangTypesFromMarkdown"
import theme from 'shiki/themes/github-dark-dimmed.json'

const components = {
  img: PostImage()
}

export type ArticleBodyProps = {
  source: string;
  className?: string;
}

export default function ArticleBodyPreview({source, className}: ArticleBodyProps) {

  setCDN("/shiki/");

  const mdxRemoteProps:MDXRemoteProps = {
    source,
    options:{
      // made available to the arguments of any custom mdx component
      scope: {},
      mdxOptions: {
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
  }

  return (
    <section className={classNames(['prose','dark:prose-invert'], className)}>
      <MDXRemote {...mdxRemoteProps} components={components} />
    </section>
  )
}
