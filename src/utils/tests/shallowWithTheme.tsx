import * as React from 'react'
import { shallow } from 'enzyme'

import { ThemeProvider } from '../../ThemeProvider'

export const shallowWithTheme = (Component: JSX.Element) => {
  return shallow(<ThemeProvider>{Component}</ThemeProvider>)
}
