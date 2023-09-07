import classNames from "classnames"
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import remarkGemoji from "remark-gemoji"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeMermaid from "rehype-mermaidjs"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import PostImage from "@/app/(user)/components/PostImage"
import rehypeSanitize from 'rehype-sanitize'

const components = {
  img: PostImage()
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
        remarkPlugins: [
          remarkGemoji, 
          remarkGfm, 
          remarkMath
        ],
        rehypePlugins: [
          rehypeSanitize,
          rehypeKatex, 
          rehypeMermaid, 
          rehypePrettyCode, 
          rehypeSlug, 
          [rehypeAutolinkHeadings, {behavior: 'wrap'}],
          
        ],
        format: 'mdx',
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
