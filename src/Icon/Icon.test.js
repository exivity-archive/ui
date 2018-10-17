/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Icon from './Icon'

test('renders default Icon', () => {
  const component = renderer.create(<Icon />)
  expect(component.toJSON()).toMatchSnapshot()
})
