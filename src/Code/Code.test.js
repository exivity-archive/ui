/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Code from './Code'

test('renders basic code', () => {
  const component = renderer.create(<Code>code</Code>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
