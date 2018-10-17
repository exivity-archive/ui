/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Alert from './Alert'

test('renders default alert', () => {
  const alert = renderer.create(<Alert />)
  expect(alert.toJSON()).toMatchSnapshot()
})

test('renders dangerous alert', () => {
  const alert = renderer.create(<Alert danger />)
  expect(alert.toJSON()).toMatchSnapshot()
})
