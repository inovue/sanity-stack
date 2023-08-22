'use client'

import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';

type SanityImageProps = Omit<React.ComponentProps<typeof Image>, 'src'> & { source: SanityImageSource }

const SanityImage = ({ source, ...props }:SanityImageProps) => {
  
  const imageProps = ((sanityImageProps)=>{
    const {width, height, ...resolvedProps} = sanityImageProps;
    return props.fill ? {...resolvedProps, ...props}: {width, height, ...resolvedProps, ...props};
  })(useNextSanityImage({
    config: () => ({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET
    })
  }, source));
  
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image {...imageProps} />
  );
};

export default SanityImage;