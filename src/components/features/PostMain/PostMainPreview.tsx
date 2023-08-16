'use client'

//import mermaid from 'mermaid'
import { useLiveQuery } from 'next-sanity/preview'

import { type Post } from '@/lib/sanity.queries'
import { postBySlugQuery } from '@/lib/sanity.queries'

import PostMain from './PostMain'
import { markdownToHtml } from '@/lib/markdown-to-html'
import { useEffect, useMemo, useState } from 'react'



export default function PostMainPreview({ post:initialPost }: { post: Post }) {
  const [post , setPost] = useState<Post>(initialPost)
  const [livePost] = useLiveQuery<Post>(
    initialPost, 
    postBySlugQuery.query, 
    {slug: initialPost.slug.current}
  )
  
  useEffect(() => {
    if(livePost){
      try {
        markdownToHtml(livePost.bio).then((bio)=>{
          setPost({...livePost, bio});
        })
      } catch (error) {
        console.log(error);
      }
    }
  }, [livePost])
  
  return (
    <PostMain post={post} />
  )
}