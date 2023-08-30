
import resolveConfig from 'tailwindcss/resolveConfig'

import { Config } from 'tailwindcss/types/config'
import tailwindConfig from '../../tailwind.config'


type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

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

  public resolveSizes = (className: string) => {
    const classNames = className.split(' ')
    const screens = this.config.theme!.screens! as {[k:string]:string}
    const widthPattern = new RegExp(`^(?<screen>${Object.keys(screens).join('|')})?\\:?w-\\[?(?<width>\\d{1,}([a-z]+)?)\\]?$`)
      
    return classNames.reduce((acc, curr) => {
      let { screen, width } = curr.match(widthPattern)?.groups || {};
      if (width) {
        if(/^\d+$/.test(width)) width = parseInt(width)/4 + 'rem';
        return [...acc, { width, breakpoint: screen ? parseInt(screens[screen].replace(/[^0-9]/g, '')):-1 }];
      }
      return acc;
    }, [] as {width:string, breakpoint:number}[])
    .sort((a, b) => b.breakpoint - a.breakpoint)
    .map(({ width, breakpoint }) => (0<breakpoint) ? `(min-width: ${breakpoint}px) ${width}` : width)
    .join(', ');
  }

  public resolveScreen = (width:number) => {
    const screens = resolveConfig(tailwindConfig).theme!.screens! as {[k:string]:string}
    return Object.keys(screens)
      .map((key) => ({ key, value: parseInt(screens[key].replace(/[^0-9]/g, '')||'0') }))
      .sort((a, b) => b.value - a.value)
      .find((screen, index, screens) => width >= screen.value || index === screens.length - 1)?.key!
  }
}

export default TailwindProvider


export const createTailwindProvider = () => {
  return new TailwindProvider(tailwindConfig);
}