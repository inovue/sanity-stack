import classNames from "classnames"
import { Post } from "@/lib/sanity.queries"
import { formatDate } from "@/utils"
import Image from 'next/image'


export type ArticleHeaderProps = {
  post: Post;
  className?: string;
}

export default async function ArticleHeader({post, className}: ArticleHeaderProps) {

  const dimensions = post.mainImage?.asset.metadata.dimensions
  return (
    <header className={classNames(className)}>
        
        <div className='article__header__meta pb-8 '>
          <h1 className="text-5xl font-black text-stone-800 mb-2 ">{post.title}</h1>
          <div className='tags-wrapper'></div>
          {post._createdAt && (
            <p className="created-at-wrapper text-stone-700">
              <time dateTime={post._createdAt} title={post._createdAt}> {formatDate(post._createdAt)} </time>
            </p>
          )}
        </div>
        {post.mainImage && dimensions &&
          <div className='relative w-full h-auto'>
            <Image 
              alt="Cover image for xxxxxxxxxxxxx" 
              src={post.mainImage.asset.url}
              width={ dimensions.width } 
              height={ dimensions.height }
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        }
      </header>
  )
}
