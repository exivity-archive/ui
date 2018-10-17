/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import CodeBlock from './CodeBlock'

test('renders basic CodeBlock', () => {
  const component = renderer.create(<CodeBlock />)
  expect(component.toJSON()).toMatchSnapshot()
})
