import * as React from 'react'
import { mount } from 'enzyme'

import { ThemeProvider } from '../../ThemeProvider'

export const mountWithTheme = (children: any) => mount(
  <ThemeProvider>{children}</ThemeProvider>
)
