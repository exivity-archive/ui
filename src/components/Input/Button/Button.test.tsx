import React from 'react'
import renderer from 'react-test-renderer'

import Button from '.'

test('renders basic button', () => {
  const button = renderer.create(<Button />)
  expect(button.toJSON()).toMatchSnapshot()
})

test('renders pink button', () => {
  const button = renderer.create(<Button pink />)
  expect(button.toJSON()).toMatchSnapshot()
})
