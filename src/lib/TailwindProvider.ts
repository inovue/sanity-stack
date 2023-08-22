
import resolveConfig from 'tailwindcss/resolveConfig'

import { Config } from 'tailwindcss/types/config'
import tailwindConfig from '@/../tailwind.config'


export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type TailwindSizesProps = [number, {[k:Breakpoint|string]:number}?]

class TailwindProvider {
  protected config: ReturnType<typeof resolveConfig>
  
  public constructor(config: Config) {
    this.config = resolveConfig(config)
  }

  public resolveImageSizes = (sizes: TailwindSizesProps) => {
    const screenConfig = this.config.theme!.screens! as {[k:string]:string}
    //sort screenConfig by value
    return Object.entries(screenConfig)
      .map(([key, value]) => ({ key, value: parseInt(value.replace(/[^0-9]/g, '')||'0') }))
      .sort((a, b) => b.value - a.value)
      .reduce((acc, { key, value }) => sizes[1]?.[key] ? [...acc, `(min-width: ${screenConfig[key]}) ${sizes[1][key]}px`]:acc, [] as string[])
      .concat([`${sizes[0]}px`])
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