/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Button from '.'

test('renders basic button', () => {
  const button = renderer.create(<Button />)
  expect(button.toJSON()).toMatchSnapshot()
})

test('renders outlined button', () => {
  const button = renderer.create(<Button outlined />)
  expect(button.toJSON()).toMatchSnapshot()
})

// Sizes
test('renders different size buttons', () => {
  ['large', 'small'].forEach(size => {
    const props = { [size]: true }
    const button = renderer.create(<Button {...props} />)
    expect(button.toJSON()).toMatchSnapshot()
  })
})

// Purposes
test('renders different purpose buttons', () => {
  ['primary', 'secondary', 'success', 'danger'].forEach(size => {
    const props = { [size]: true }
    const button = renderer.create(<Button {...props} />)
    expect(button.toJSON()).toMatchSnapshot()
  })
})
