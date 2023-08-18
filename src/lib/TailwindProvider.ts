import { useEffect, useState } from 'react'

import resolveConfig from 'tailwindcss/resolveConfig'

import { Config, ScreensConfig } from 'tailwindcss/types/config'
import tailwindConfig from '@/../tailwind.config'

import nextConfig from '@/../next.config'

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const n = (nextConfig?.images?.imageSizes || [] as number[]) as const
type ImageSizePatterns = (typeof nextConfig.images.imageSizes as const)[number]

class TailwindProvider {
  protected config: ReturnType<typeof resolveConfig>
  
  public constructor(config: Config) {
    this.config = resolveConfig(config)
  }

  public resolveImageSizes = (sizes: {[k:Breakpoint|string]:string}, defaultSize:string) => {
    const screenConfig = this.config.theme!.screens! as {[k:string]:string}
    return Object.keys(sizes)
      .reduce((acc, curr) => screenConfig[curr]?[...acc, `(max-width: ${screenConfig[curr]}) ${sizes[curr]}`]:[...acc], [] as string[])
      .concat([defaultSize])
      .join(', ');
  }
} 
export default TailwindProvider


export const getTailwindProvider = () => {
  return new TailwindProvider(tailwindConfig);
}



/*
const resolveScreens = (screens: {[k:string]:string}) => {
  return Object.keys(screens)
    .map((key) => ({ 
      key, 
      max: parseInt(screens[key].replace(/[^0-9]/g, '')||'0')
    }))
    .sort((a, b) => a.max - b.max)
    .reduce((acc, curr, index, arr) => {
      const min = index === 0 ? 0 : arr[index - 1].max
      const max = index === arr.length - 1 ? 999999 : curr.max

      return [...acc, { ...curr, min, max }]
    }, [] as { key: string; min: number; max: number; }[])
}
*/

/*
const useBreakpoint = (width: number): Breakpoint|null => {
  const fullConfig = resolveConfig(tailwindConfig)
  const screens = fullConfig.theme!.screens! as {[k:string]:string}
  resolveScreens(screens).find(({ min, max }, index, arr) => {
    if (width >= min && width < max) {
      return true
    }
    return false
  })
  return null;
  
  const bpSizes = Object.keys(screens).map((screenSize) => parseInt(screens[screenSize]))

  const bpShapes = bpSizes.map((size, index) => ({
    min: !index ? 0 : bpSizes[index - 1],
    max: size,
    key: findKeyByValue(screens, `${size}px`),
  }))

  let breakpoint: Breakpoint | null = 'md'

  bpShapes.forEach((shape) => {
    if (!shape.min && width < shape.max) {
      breakpoint = shape.key as Breakpoint
    } else if (shape.min && width >= shape.min && width < shape.max) {
      breakpoint = shape.key as Breakpoint
    } else if (!shape.max && width >= shape.max) {
      breakpoint = shape.key as Breakpoint
    }
  })

  return breakpoint
  
}


export default useBreakpoint
*/
