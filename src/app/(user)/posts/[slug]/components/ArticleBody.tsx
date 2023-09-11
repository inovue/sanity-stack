import classNames from "classnames"
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import remarkGemoji from "remark-gemoji"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeMermaid from "rehype-mermaidjs"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import {img} from "@/app/(user)/components/MDX"
import rehypeRaw from 'rehype-raw'

const components = {
  img: img()
}

export type ArticleBodyProps = {
  source: string;
  className?: string;
}

export default function ArticleBody({source, className}: ArticleBodyProps) {

  const mdxRemoteProps:MDXRemoteProps = {
    source,
    options:{
      // made available to the arguments of any custom mdx component
      scope: {},
      mdxOptions: {
        development: process.env.NODE_ENV === 'development',
        remarkRehypeOptions:{
          allowDangerousHtml: true,
        },
        remarkPlugins: [
          remarkGemoji, 
          remarkGfm, 
          remarkMath
        ],
        rehypePlugins: [
          rehypeKatex, 
          rehypeMermaid, 
          rehypePrettyCode, 
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
    <section className={classNames(['prose', 'dark:prose-invert'], className)}>
      <MDXRemote {...mdxRemoteProps} components={components} />
    </section>
  )
}
