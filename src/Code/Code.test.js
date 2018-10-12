/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Code from './Code'

test('renders basic code', () => {
  const component = renderer.create(<Code>code</Code>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
