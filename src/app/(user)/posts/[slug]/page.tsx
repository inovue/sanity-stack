import Container from '@/components/Container'
import PostMain from '@/components/features/PostMain/PostMain'
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
    <Container>
      <div className='main-wrapper w-full max-w-[1280px] mx-auto flex gap-4 md:p-4'>
        <PostMain post={post} />
        
        <aside className='sidebar-right hidden md:block w-[30%]'>
          <div className='bg-white'></div>
        </aside>
      </div>
    </Container>
  )
}
