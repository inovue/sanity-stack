import { draftMode } from 'next/headers'

import PreviewProvider from '@/components/PreviewProvider'
import { readToken } from '@/lib/sanity.api'
import { redirect } from 'next/navigation'

export default async function PostPreviewLayout({children, params}: {children: React.ReactNode, params: {slug: string}}) {
  const preview = draftMode().isEnabled ? {token: readToken} : undefined
  //const preview = {token: readToken}

  if (!preview) redirect(`/posts/${params.slug}`);

  return (
    <PreviewProvider token={preview.token}>
      {children}
    </PreviewProvider>
  )
}
