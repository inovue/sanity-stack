import { type Post } from '@/lib/sanity.queries'

import PostCard from './PostCard'

export default function PostCardList({ posts }: { posts: Post[] }) {
  return (
    <ul className='flex flex-col gap-2'>
      { posts.map(post => (
        <li key={post._id} className=''>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
