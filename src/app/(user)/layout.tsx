import '../globals.css'
import './index.css'

import Footer from './components/Footer'
import Header from './components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
  keywords: ['e-commerce','web','development'],
  robots: 'index, follow',
  authors: [{url:'https:/example.com', name:'John Doe'}],
  viewport: {width:"device-width", initialScale:1.0}
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ja">
      <body className='bg-slate-500'>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        </body>
    </html>
  )
}

/*
robots" content="index, follow"/>
http-equiv="Content-Type" content="text/html; charset=utf-8"/>
language" content="Japanese"/>
revisit-after" content="${2} days"/>
author" content="${author}"/>
copyright" content="Copyright owner" />
*/