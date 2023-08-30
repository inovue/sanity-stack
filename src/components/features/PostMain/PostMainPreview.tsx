'use client'

import { LiveQueryProvider, useLiveQuery } from 'next-sanity/preview'

import { getPost, type Post } from '@/lib/sanity.queries'
import { postBySlugQuery } from '@/lib/sanity.queries'

import PostMain from './PostMain'
import { markdownToHtmlBrowser } from '@/lib/markdown-to-html-browser'
import { useEffect, useMemo, useState } from 'react'

import mermaid from 'mermaid';
import { getClient } from '@/lib/sanity.client'


export default function PostMainPreview({ token, slug, initialPost }: { token: string, slug: string, initialPost: Post }) {
  
  const client = getClient({token})
  const [post , setPost] = useState<Post>()
  console.log('initialPost',slug, initialPost)

  const [livePost, loadingLivePost] = useLiveQuery<Post>(
    initialPost, 
    postBySlugQuery.query, 
    {slug: initialPost.slug.current}
  )
  
  useEffect(() => {
    console.log('livePost',livePost)
    if(livePost){
      console.log('change live post',livePost.slug.current)
      try {
        markdownToHtmlBrowser(livePost.bio).then((bio)=>{
          setPost(()=>({...livePost, bio}));
        })
      } catch (error) {
        console.log(error);
      }
      
    }
  }, [livePost]);

  useEffect(() => {
    if(post){
      try {
        console.log('mermaid.initialized!')
        mermaid.initialize({ startOnLoad: false });
        mermaid.run({nodes: document.querySelectorAll('div.language-mermaid')});
      } catch (error) {
        console.log(error);
      }
    }
  }, [post]);
  
  return (
    <LiveQueryProvider client={client}>
      {loadingLivePost && <p>Loading..</p>}
      {post && <PostMain post={post} />}
    </LiveQueryProvider>
  )
}