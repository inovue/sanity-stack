import 'katex/dist/katex.min.css'

//import Image from 'next/image'
import { type Post } from '@/lib/sanity.queries'
import ArticleHeader from './ArticleHeader'
import ArticleBody from './ArticleBody'

export default function Article({ children, post }: { children?:React.ReactNode , post: Post }) {
  return (
    <article className='bg-stone-50 max-w-3xl flex-1 px-3 md:px-6 mx-auto'>
      <ArticleHeader post={post} />
      {children}
      
    </article>
  )
}
