import classNames from "classnames"

export type PreviewBarProps = {
  className?: string
}

export function LoadingModal({className}: PreviewBarProps) {

  return (
    <div tabIndex={-1} className={classNames('fixed inset-0 z-20 bg-stone-900 bg-opacity-50 flex items-center justify-center', className)}>
      <div className="animate-spin h-10 w-10 border-4 text-stone-50 rounded-full border-t-transparent"></div>
    </div>
  )
}
