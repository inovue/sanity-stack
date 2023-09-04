import PostsList from './posts/components/PostsList'
import { getClient } from '@/lib/sanity.client'
import { getPosts } from '@/lib/sanity.queries'
import { LoadingModal } from './components/Modal'


export default async function Page() {
  const client = getClient()
  const posts = await getPosts(client)
  return (
    <div className='my-2 sm:m-6'>
      <PostsList posts={posts} />
    </div>
  )
}
