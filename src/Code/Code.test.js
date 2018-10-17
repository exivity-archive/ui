/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Code from './Code'

test('renders basic Code', () => {
  const component = renderer.create(<Code />)
  expect(component.toJSON()).toMatchSnapshot()
})
