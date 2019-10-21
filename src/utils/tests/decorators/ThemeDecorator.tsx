import * as React from 'react'

import { ThemeProvider } from '../../../ThemeProvider'

export const ThemeDecorator = (storyFn: any) => (
  <ThemeProvider>
    {storyFn()}
  </ThemeProvider>
)
