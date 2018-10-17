/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Button from './Button'

test('renders basic button', () => {
  const button = renderer.create(<Button />)
  expect(button.toJSON()).toMatchSnapshot()
})

test('renders large button', () => {
  const largeButton = renderer.create(<Button large />)
  expect(largeButton.toJSON()).toMatchSnapshot()
})
