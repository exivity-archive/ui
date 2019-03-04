/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Icon from './Icon'

test('renders basic icon', () => {
  const button = renderer.create(<Icon/>)
  expect(button.toJSON()).toMatchSnapshot()
})
