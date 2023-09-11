import Image from 'next/image'

import { type Post } from '@/lib/sanity.queries'
import { formatDate } from '@/utils'
import Link from 'next/link'
import {createTailwindProvider} from '@/lib/TailwindProvider'
import classNames from 'classnames'

export default function PostCard({ post }: { post: Post }) {
  const tw = createTailwindProvider()
  const imageClassName = "w-40 sm:w-64 md:w-72"
  const sizes = tw.resolveSizes(imageClassName)
  
  return (
    <div className="bg-stone-50 border border-stone-200 rounded-lg shadow flex w-full ">
      <div className="card__container flex flex-1 flex-col justify-between p-4 leading-normal">
        <h3 className="card__title mb-2 text-2xl font-bold tracking-tight text-stone-900">
          <Link className="card__link" href={`/posts/${post.slug.current}`}>
            {post.title}
          </Link>
        </h3>
        <p className="card__excerpt mb-3 font-normal text-stone-700">{post.excerpt}</p>
        <p className="card__date text-sm text-stone-700">{formatDate(post._createdAt)}</p>
      </div>
      
      {post.mainImage ? (
        <figure className={classNames('relative', imageClassName)}>
          <Image 
            src={post.mainImage.asset.url}
            className="card__cover rounded-r-lg object-cover" 
            sizes={sizes}
            fill
            placeholder="blur"
            blurDataURL={post.mainImage.asset.metadata.lqip}
            alt=""
          />
        </figure>
      ) : (
        <div className="card__cover--none" />
      )}
      
    </div>
  )
}
