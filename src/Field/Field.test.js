/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Field from './Field'

test('renders default Field', () => {
  const component = renderer.create(<Field />)
  expect(component.toJSON()).toMatchSnapshot()
})
