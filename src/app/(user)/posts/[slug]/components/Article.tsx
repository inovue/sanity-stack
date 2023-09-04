//import Image from 'next/image'
import Image from '@/app/(user)/components/Image'

import { type Post } from '@/lib/sanity.queries'
import { formatDate } from '@/utils'

export default function Article({ post }: { post: Post }) {
  const dimensions = post.mainImage?.asset.metadata.dimensions
  return (
    <article className='bg-white max-w-3xl flex-1 px-3 md:px-6 mx-auto'>
      <header className='article__header '>
        
        <div className='article__header__meta pb-8 '>
          <h1 className="text-5xl font-black mb-2">{post.title}</h1>
          <div className='tags-wrapper'></div>
          {post._createdAt && (
            <p className="created-at-wrapper text-gray-700">
              <time dateTime={post._createdAt} title={post._createdAt}> {formatDate(post._createdAt)} </time>
            </p>
          )}
        </div>
        {post.mainImage && dimensions &&
          <div className='relative w-full h-auto'>
            <Image 
              alt="Cover image for xxxxxxxxxxxxx" 
              src={post.mainImage}
              width={ dimensions.width } 
              height={ dimensions.height }
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        }
      </header>
      <section className='prose pb-8' dangerouslySetInnerHTML={{ __html: post.bio }}></section>
    
      {/*
        <div className="prose px-4 sm:px-6 md:px-8 mx-auto mt-12 mb-6">
          <PortableText value={post.body} />
        </div>
      */}
    </article>
  )
}
