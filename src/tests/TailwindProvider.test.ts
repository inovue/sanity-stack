import { expect, test } from 'vitest'
import TailwindProvider from '../lib/TailwindProvider'
import tailwindConfig from '../../tailwind.config'

test('tailwind provider test', () => {
  expect((()=>{
    const tw = new TailwindProvider(tailwindConfig)
    const sizes = tw.resolveImageSizes( { sm: '100px', md: '200px', lg: '300px', xl: '400px', '2xl': '500px' }, '600px')
    return sizes
  })())
})
