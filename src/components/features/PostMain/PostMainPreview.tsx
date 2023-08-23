'use client'

import { useLiveQuery } from 'next-sanity/preview'

import { type Post } from '@/lib/sanity.queries'
import { postBySlugQuery } from '@/lib/sanity.queries'

import PostMain from './PostMain'
import { markdownToHtmlBrowser } from '@/lib/markdown-to-html-browser'
import { useEffect, useState } from 'react'

import mermaid from 'mermaid';
import PreviewBar from '@/components/PreviewBar'


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
        markdownToHtmlBrowser(livePost.bio).then((bio)=>{
          setPost(()=>({...livePost, bio}));
        })
      } catch (error) {
        console.log(error);
      }
      
    }
  }, [livePost]);

  useEffect(() => {
    console.log('change post!')
    if(post){
      try {
        
        mermaid.initialize({ startOnLoad: false });
        mermaid.run({nodes: document.querySelectorAll('div.language-mermaid')});
      } catch (error) {
        console.log(error);
      }
    }
  }, [post]);
  
  return (
    <>
      <PreviewBar />
      <PostMain post={post} />
    </>
  )
}