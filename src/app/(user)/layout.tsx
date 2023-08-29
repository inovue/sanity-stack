import '../globals.css'
import './index.css'
import 'katex/dist/katex.min.css'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}