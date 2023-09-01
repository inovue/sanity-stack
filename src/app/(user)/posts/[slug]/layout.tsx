import 'katex/dist/katex.min.css'

export default async function PostLayout({children}: {children: React.ReactNode}) {
  
  return (
    <div className='main-wrapper w-full max-w-[1280px] mx-auto flex gap-4 md:p-4'>
      {children}
      
      <aside className='sidebar-right hidden md:block w-[30%]'>
        <div className='bg-white'></div>
      </aside>
    </div>
  )
}
