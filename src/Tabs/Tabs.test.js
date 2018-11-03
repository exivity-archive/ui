/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Tabs from './Tabs'

test('renders default Tabs', () => {
  const component = renderer.create(<Tabs />)
  expect(component.toJSON()).toMatchSnapshot()
})
