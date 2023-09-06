import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource,  } from '@sanity/image-url/lib/types/types'

import { dataset, projectId } from '@/lib/sanity.api'

import {ImageLoader} from 'next/image'


const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: SanityImageSource) => {
  // Ensure that source image contains a valid reference
  
  return imageBuilder?.image(source).auto('format')
}


// Docs: https://www.sanity.io/docs/image-urls
export const sanityLoader:ImageLoader = ({ src, width, quality }) => {
  const url = new URL(`https://cdn.sanity.io/images/${projectId}/${dataset}${src}`)
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'max')
  url.searchParams.set('w', width.toString())
  if (quality) {
    url.searchParams.set('q', quality.toString())
  }
  return url.href
}