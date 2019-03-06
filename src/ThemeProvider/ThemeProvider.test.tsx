import renderer from 'react-test-renderer'
import * as React from 'react'

import ThemeProvider from '.'

test('renders basic ThemeProvider', () => {
  const provider = renderer.create(<ThemeProvider />)
  expect(provider.toJSON()).toMatchSnapshot()
})
