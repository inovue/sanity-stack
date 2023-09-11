// [next.config.js > Options > urlImports](https://nextjs.org/docs/app/api-reference/next-config-js/urlImports)

import Image from 'next/image'
import React, { createElement } from 'react'

type imgFunction = () => React.FC<JSX.IntrinsicElements['img']>

export const img: imgFunction = () => (props) => {
  try {
    
    const { src, alt, title } = props
    if(src === undefined) throw new Error('src is undefined');
    
    return <Image
      src={src}
      alt={alt||title||''}
      title={title||''}
      sizes="(max-width: 768px) 100vw, 50vw"
      width="0"
      height="0"
      className="w-full h-auto"
    />

  } catch (e) {
    console.error(e)
    return createElement('img', props)
  }
}