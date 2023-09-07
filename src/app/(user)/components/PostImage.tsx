// [next.config.js > Options > urlImports](https://nextjs.org/docs/app/api-reference/next-config-js/urlImports)

import Image from 'next/image'
import React, { createElement } from 'react'

type PostImageFunc = () => React.FC<JSX.IntrinsicElements['img']>

const PostImage: PostImageFunc = () => (props) => {
  try {
    const { src, alt, title } = props
    if(src === undefined) throw new Error('src is undefined');

    const image = new URL(src, import.meta.url)
    
    return <Image
      src={image.pathname}
      alt={alt||title||''}
      title={title||''}
    />

  } catch (e) {
    return createElement('img', props)
  }
}
export default PostImage