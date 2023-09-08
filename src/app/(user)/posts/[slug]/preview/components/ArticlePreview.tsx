'use client'

import { useLiveQuery } from 'next-sanity/preview'

import { type Post } from '@/lib/sanity.queries'
import { postBySlugQuery } from '@/lib/sanity.queries'

import { LoadingModal } from '@/app/(user)/components/Modal'
import ArticlePreviewBody from './ArticlePreviewBody'


export default function PostMainPreview({ post }: { post: Post }) {
  
  const [livePost, loadingLivePost] = useLiveQuery<Post>(
    post, 
    postBySlugQuery.query, 
    {slug: post.slug.current}
  )
  
  return (
    <>
      {loadingLivePost && 
        <LoadingModal />
      }
      { livePost.bio && 
        <ArticlePreviewBody source={livePost.bio} />
      }
    </>
  )
}