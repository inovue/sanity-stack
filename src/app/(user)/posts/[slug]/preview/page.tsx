import { draftMode } from 'next/headers'

import { readToken } from '@/lib/sanity.api'
import { redirect } from 'next/navigation'
import PostMainPreview from '@/components/features/PostMain/PostMainPreview'
import { getClient } from '@/lib/sanity.client'
import { getPost } from '@/lib/sanity.queries'

export default async function PostPreviewLayout({params}: { params: {slug: string}}) {
  //const preview = draftMode().isEnabled ? {token: readToken} : undefined
  const preview = {token: readToken}
  
  console.log('preview', preview)
  if (!preview) redirect(`/posts/${params.slug}`);

  const client = getClient()
  const post = await getPost(client, params.slug)
  
  return (
    <>
      {preview && 
        <PostMainPreview token={preview.token} slug={params.slug} initialPost={post}/>
      }
    </>
  )
}
