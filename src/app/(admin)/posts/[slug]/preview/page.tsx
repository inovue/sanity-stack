import { draftMode } from 'next/headers'

import Container from '@/components/Container'
//import PostMainPreview from '@/components/features/PostMain/PostMainPreview'
//import PreviewProvider from '@/components/PreviewProvider'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getPost } from '@/lib/sanity.queries'
import { redirect } from 'next/navigation'

import dynamic from 'next/dynamic';

const PostMainPreview = dynamic(() => import('@/components/features/PostMain/PostMainPreview'), { ssr: false });
const PreviewProvider = dynamic(() => import('@/components/PreviewProvider'), { ssr: false });

export default async function PostPage({params}: {params: {slug: string}}) {
  const preview = draftMode().isEnabled ? {token: readToken} : undefined
  
  if (!preview) redirect(`/posts/${params.slug}`);

  const client = getClient(preview)
  let post = await getPost(client, params.slug)
  
  return (
    <Container>
      <div className='main-wrapper w-full max-w-[1280px] mx-auto flex gap-4 md:p-4'>
        <PreviewProvider token={preview.token}>
          <PostMainPreview post={post} />
        </PreviewProvider>
        
        <aside className='sidebar-right hidden md:block w-[30%]'>
          <div className='bg-white'></div>
        </aside>
      </div>
    </Container>
  )
}
