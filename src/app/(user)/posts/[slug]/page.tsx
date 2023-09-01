import Article from './components/Article'
import { getClient } from '@/lib/sanity.client'
import { getPost, getPostSlugs } from '@/lib/sanity.queries'
import { markdownToHtml } from '@/lib/markdown-to-html'


export async function generateStaticParams() {
  const client = getClient()
  const slugs = await getPostSlugs(client)

  return slugs.map((slug) =>({slug}))
}


export default async function PostPage({params}: {params: {slug: string}}) {
  
  const client = getClient()
  let post = await getPost(client, params.slug)
  
  const bio = await markdownToHtml(post.bio)
  post = {...post , bio}
  
  return (
    <Article post={post} />
  )
}
