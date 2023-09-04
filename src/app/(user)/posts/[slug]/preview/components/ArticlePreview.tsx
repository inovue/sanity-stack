'use client'

import { useLiveQuery } from 'next-sanity/preview'

import { type Post } from '@/lib/sanity.queries'
import { postBySlugQuery } from '@/lib/sanity.queries'

import Article from '../../components/Article'
import { markdownToHtmlBrowser } from '@/lib/markdown-to-html-browser'
import { useEffect, useState } from 'react'

import mermaid from 'mermaid';
import { LoadingModal } from '@/app/(user)/components/Modal'


export default function PostMainPreview({ initialPost }: { initialPost: Post }) {
  
  const [post , setPost] = useState<Post>()

  const [livePost, loadingLivePost] = useLiveQuery<Post>(
    initialPost, 
    postBySlugQuery.query, 
    {slug: initialPost.slug.current}
  )
  
  useEffect(() => {
    console.log('livePost', livePost)
    if(livePost){
      console.log('change live post', livePost.slug.current)
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
        mermaid.initialize({ startOnLoad: false });
        mermaid.run({nodes: document.querySelectorAll('div.language-mermaid')});
        console.log('render mermaid.')
      } catch (error) {
        console.log(error);
      }
    }
  }, [post]);
  
  return (
    <>
      {loadingLivePost && 
        <LoadingModal />
      }
      {post && 
        <Article post={post} />
      }
    </>
  )
}