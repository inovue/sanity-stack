import { expect, test } from 'vitest'
import  { createTailwindProvider } from '../lib/TailwindProvider'

test('tailwind provider test', () => {
  expect((()=>{
    const tw = createTailwindProvider()
    //const sizes = tw.resolveImageSizes( { sm: '100px', md: '200px', lg: '300px', xl: '400px', '2xl': '500px' }, '600px')
    const sizes = tw.resolveSizes('w-[100px] sm:w-32 md:w-[300px] lg:w-[400px] xl:w-[500px] 2xl:w-[600px]')
    return sizes
  })())
})
