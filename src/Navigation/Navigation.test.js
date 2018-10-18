/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Navigation from './Navigation'

test('renders default Navigation', () => {
  const component = renderer.create(<Navigation />)
  expect(component.toJSON()).toMatchSnapshot()
})
