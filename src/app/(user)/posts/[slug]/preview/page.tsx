import { draftMode } from 'next/headers'

import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getPost } from '@/lib/sanity.queries'

import Container from '@/app/(user)/components/Container'
const Article = dynamic( () => import('@/app/(user)/posts/[slug]/components/Article'), {ssr: false} );
const ArticlePreview = dynamic( () => import('@/app/(user)/posts/[slug]/preview/components/ArticlePreview'), {ssr: false} );
const PreviewProvider = dynamic( () => import('@/app/(user)/components/PreviewProvider'), {ssr: false} );

// import Article from '@/app/(user)/posts/[slug]/components/Article'
// import ArticlePreview from '@/app/(user)/posts/[slug]/preview/components/ArticlePreview'
// import PreviewProvider from '@/app/(user)/components/PreviewProvider'

export default async function PostPreviewPage({params}: { params: {slug: string}}) {
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
