'use client'

import PreviewBar from '@/components/PreviewBar'
import PostMainPreview from '@/components/features/PostMain/PostMainPreview'
import { getClient } from '@/lib/sanity.client'
import { Post, getPost } from '@/lib/sanity.queries'
import { useState } from 'react'

export default function PostPreviewPage({params}: {params: {slug: string}}) {
  
  //const post = useContext(DataContext)
  const [post, setPost] = useState<Post>()
  const client = getClient()
  getPost(client, params.slug).then((post) => setPost(post))
  
  return (
    <>
      <PreviewBar />
      {post && 
        <PostMainPreview post={post} />
      }
    </>
  )
}
