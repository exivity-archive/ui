/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Label from './Label'

test('renders default Label', () => {
  const component = renderer.create(<Label />)
  expect(component.toJSON()).toMatchSnapshot()
})
