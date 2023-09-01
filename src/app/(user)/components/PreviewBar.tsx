'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {IconClose} from '@/app/(user)/components/Icons'

export type PreviewBarProps = {
  className?: string
}

export default function PreviewBar({className}: PreviewBarProps) {
  const pathname = usePathname()

  return (
    <div className={classNames('bg-yellow-500 text-white text-lg z-20', className)}>
      <div className='relative text-center'>
        <span className='font-black mx-2'>Preview Mode</span>
        <div className="absolute flex flex-col justify-center items-center right-0 top-0 text-2xl">
          <Link href={{pathname:'/api/disable-draft', query:{redirect_to: pathname}}} prefetch={false}>
            <IconClose />
          </Link>
        </div>
      </div>
    </div>
  )
}
