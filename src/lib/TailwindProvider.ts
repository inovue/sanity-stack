
import resolveConfig from 'tailwindcss/resolveConfig'

import { Config } from 'tailwindcss/types/config'
import tailwindConfig from '@/../tailwind.config'


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