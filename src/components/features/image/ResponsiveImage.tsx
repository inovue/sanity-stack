import { TailwindSizesProps, createTailwindProvider } from '@/lib/TailwindProvider';
import classNames from 'classnames';
import Image, {SanityImageProps as ImageProps} from './SanityImage';
import nextConfig from '@/../next.config'

export type ResponsiveImageProps = { sizes: TailwindSizesProps} & Omit<ImageProps, 'sizes'>


const ResponsiveImageMap = (nextConfig.images?.imageSizes||[]).reduce((acc, size)=>{
  acc[String(size)] = `w-[${size}px]`
  return acc
}, {} as {[k:string]:string})

const ResponsiveImage = ( {sizes, ...props} :ResponsiveImageProps) => {
  const tw = createTailwindProvider()
  const resolvedSizes = tw.resolveImageSizes(sizes)
  const resolvedClassNames = [`w-[${sizes[0]}px]`, ...Object.entries(sizes[1]??{}).map(([breakpoint, size])=>`${breakpoint}:w-[${size}px]`)].join(' ')
  return (
    <div className={'relative '+resolvedClassNames}>
      {
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image {...props} sizes={resolvedSizes}/>
      }
    </div>
  );
};

export default ResponsiveImage;