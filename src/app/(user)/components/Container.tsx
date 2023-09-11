import classNames from "classnames"
import Header from "./Header"
import Footer from "./Footer"

export type ContainerProps = {
  children: React.ReactNode,
}

export default function Container({ children }:ContainerProps) {
  return (
    <>
      <Header />
      <div className={classNames('w-full max-w-[1280px] mx-auto flex gap-4 md:p-4')}>
        <main>
          {children}
        </main>
        
        <aside className='sidebar-right hidden md:block w-[30%]'>
          <div className='bg-stone-50'></div>
        </aside>
      </div>
      <Footer />
    </>
  )
}