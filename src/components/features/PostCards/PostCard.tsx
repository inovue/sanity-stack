import Image from '@/components/features/SanityImage/SanityImage'

import { urlForImage } from '@/lib/sanity.image'
import { type Post } from '@/lib/sanity.queries'
import { formatDate } from '@/utils'
import Link from 'next/link'
import {getTailwindProvider} from '@/lib/TailwindProvider'

export default function PostCard({ post }: { post: Post }) {
  const tw = getTailwindProvider()
  const sizes = tw.resolveImageSizes( 
    { sm: '64px', md: '200px', lg: '300px', xl: '400px', '2xl': '500px' }, '600px'
  )
  
  return (
    <div className="card bg-white border border-gray-200 rounded-lg shadow flex flex-row-reverse max-w-xl hover:bg-gray-100">
      {post.mainImage ? (
        <div className='w-[200px] relative'>
          <Image
            source={post.mainImage}
            className="card__cover h-auto rounded-r-lg"
            sizes={sizes}
            objectFit='cover'
            alt=""
          />
        </div>
        
      ) : (
        <div className="card__cover--none" />
      )}

      <div className="card__container flex flex-1 flex-col justify-between p-4 leading-normal">
        <h3 className="card__title mb-2 text-2xl font-bold tracking-tight text-gray-900">
          <Link className="card__link" href={`/posts/${post.slug.current}`}>
            {post.title}
          </Link>
        </h3>
        <p className="card__excerpt mb-3 font-normal text-gray-700">{post.excerpt}</p>
        <p className="card__date text-sm text-gray-700">{formatDate(post._createdAt)}</p>
      </div>
    </div>
  )
}
