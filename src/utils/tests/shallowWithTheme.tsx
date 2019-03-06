import { shallow } from 'enzyme'
import * as React from 'react'

import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../../themes'

export const shallowWithTheme = (Component: JSX.Element) => {
  return shallow(<ThemeProvider theme={lightTheme}>{Component}</ThemeProvider>)
}
