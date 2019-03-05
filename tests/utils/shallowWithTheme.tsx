import { shallow } from 'enzyme'
import * as React from 'react'

import { ThemeProvider } from 'styled-components'
import theme from '../../src/defaultTheme/theme'

export const shallowWithTheme = (Component: JSX.Element) => {
  return shallow(<ThemeProvider theme={theme}>{Component}</ThemeProvider>)
}
