import React from 'react'
import renderer from 'react-test-renderer'

import Button from './Button'

test('renders basic button', () => {
  const button = renderer.create(<Button />)
  expect(button.toJSON()).toMatchSnapshot()
})
