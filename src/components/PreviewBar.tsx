
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type PreviewBarProps = {
  className?: string
}

export default function PreviewBar({ className}: PreviewBarProps) {
  const pathname = usePathname()

  return (
    <div className={classNames('fixed bg-yellow-500 text-white text-lg top-0 left-0 right-0 z-20', className)}>
      <p className='text-center'>Preview mode. 
        <Link href={{pathname:'/api/disable-draft', query:{redirect_to: pathname}}} prefetch={false}>
          <span className='font-black cursor-pointer mx-2'>Click here</span>
        </Link> to exit preview mode. {pathname}
      </p>
    </div>
  )
}
