/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Provider from './Provider'

// See https://github.com/facebook/jest/pull/5267#issuecomment-356605468
beforeEach(() => {
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => {})
})
afterEach(() => {
  console.error.mockRestore()
})

test('renders default Global', () => {
  const component = renderer.create(<Provider />)
  expect(component.toJSON()).toMatchSnapshot()
})
