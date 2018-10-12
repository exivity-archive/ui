/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Button from './Button'

test('renders basic button', () => {
  const button = renderer.create(<Button>click</Button>)
  expect(button.toJSON()).toMatchSnapshot()
})

test('renders large button', () => {
  const largeButton1 = renderer.create(<Button large>click</Button>)
  expect(largeButton1.toJSON()).toMatchSnapshot()
})
