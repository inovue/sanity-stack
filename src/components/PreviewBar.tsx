
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {IoMdClose} from 'react-icons/io'

export type PreviewBarProps = {
  className?: string
}

export default function PreviewBar({ className}: PreviewBarProps) {
  const pathname = usePathname()

  return (
    <div className={classNames('fixed bg-yellow-500 text-white text-lg top-0 left-0 right-0 z-20', className)}>
      <p className='relative text-center'>
        <span className='font-black mx-2'>Preview Mode</span>
        <div className="absolute right-0 top-0 text-2xl m-auto bottom-0">
          <Link href={{pathname:'/api/disable-draft', query:{redirect_to: pathname}}} prefetch={false}>
            <IoMdClose />
          </Link>
        </div>
      </p>
      
    </div>
  )
}
