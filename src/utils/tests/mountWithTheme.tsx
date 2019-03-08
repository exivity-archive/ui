import * as React from 'react'
import { mount } from 'enzyme'

import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../../themes'

export const mountWithTheme = (children: any) => mount(
  <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
)
