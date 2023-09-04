import Link from "next/link";
import { draftMode } from 'next/headers'
import { PreviewBar } from "./StatusBar";

export default function Header() {
  const isDraft = draftMode().isEnabled;

  return (
    <header className="sticky bg-white top-0 left-0 right-0 z-10 shadow">
      {isDraft && 
        <PreviewBar />
      }
      <div className="h-[56px] px-4 max-w-[1280px] mx-auto flex items-center">
        <Link className="header__title" href="/"> 
          <p className='text-2xl font-black'>Next.js + Sanity</p>
        </Link>
      </div>
    </header>
  )
}
