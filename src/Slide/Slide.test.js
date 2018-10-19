/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Slide from './Slide'

test('renders default Slide', () => {
  const component = renderer.create(<Slide />)
  expect(component.toJSON()).toMatchSnapshot()
})
