import * as React from 'react'
import ThemeAndFontProvider from '../../../src/ThemeProvider/ThemeProvider'

export const ThemeDecorator = (storyFn: any) => (
  <ThemeAndFontProvider>
    {storyFn()}
  </ThemeAndFontProvider>
)
