import { shallow } from 'enzyme'
import * as React from 'react'

import { ThemeProvider } from 'styled-components'
import theme from '../../theme'

export const shallowWithTheme = (Component: JSX.Element) => {
  return shallow(<ThemeProvider theme={theme}>{Component}</ThemeProvider>)
}
