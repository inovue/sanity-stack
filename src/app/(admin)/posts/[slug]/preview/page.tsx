import { draftMode } from 'next/headers'

import { readToken } from '@/lib/sanity.api'
import { redirect } from 'next/navigation'
import ArticlePreview from './components/ArticlePreview'
import { getClient } from '@/lib/sanity.client'
import { getPost } from '@/lib/sanity.queries'
import dynamic from 'next/dynamic'
import Article from '../../../../(user)/posts/[slug]/components/Article'
import Container from '@/app/(user)/components/Container'

const PreviewProvider = dynamic( () => import("@/app/(user)/components/PreviewProvider") );

export default async function PostPreviewLayout({params}: { params: {slug: string}}) {
  //const preview = draftMode().isEnabled ? {token: readToken} : undefined
  const preview = {token: readToken}
  
  if (!preview) redirect(`/posts/${params.slug}`);

  const client = getClient(preview)
  const post = await getPost(client, params.slug)
  
  return (
    <Container>
      {preview && 
        <PreviewProvider token={preview.token}>
          <Article post={post}>
            <ArticlePreview post={post}/>
          </Article>
        </PreviewProvider>
      }
    </Container>
  )
}
