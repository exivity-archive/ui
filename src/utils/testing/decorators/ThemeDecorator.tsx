import * as React from 'react'
import ThemeAndFontProvider from '../../../ThemeProvider/ThemeProvider'

export const ThemeDecorator = (storyFn: any) => (
  <ThemeAndFontProvider>
    {storyFn()}
  </ThemeAndFontProvider>
)
