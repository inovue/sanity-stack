// [next.config.js > Options > urlImports](https://nextjs.org/docs/app/api-reference/next-config-js/urlImports)

import Image from 'next/image'
import React, { createElement } from 'react'
import dynamic from 'next/dynamic'


type PostImageFunc = () => React.FC<JSX.IntrinsicElements['img']>

const PostImage: PostImageFunc = () => (props) => {
  try {
    
    const { src, alt, title } = props
    if(src === undefined) throw new Error('src is undefined');

    return <Image
      src={require(src)}
      alt={alt||title||''}
      title={title||''}
      sizes="(max-width: 768px) 100vw, 50vw"
    />

  } catch (e) {
    return createElement('img', props)
  }
}
export default PostImage