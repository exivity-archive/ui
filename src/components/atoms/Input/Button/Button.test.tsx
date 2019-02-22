import React from 'react'
import renderer from 'react-test-renderer'

import Button from '.'

test('renders button', () => {
  const button = renderer.create(<Button />)
  expect(button.toJSON()).toMatchSnapshot()
})
