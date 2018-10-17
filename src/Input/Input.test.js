/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Input from './Input'

test('renders default Input', () => {
  const component = renderer.create(<Input />)
  expect(component.toJSON()).toMatchSnapshot()
})
