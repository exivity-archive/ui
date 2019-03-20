import React from 'react'
import renderer from 'react-test-renderer'
import { Radio } from '.'

// Modify or remove, stories are snapshotted automatically
test('renders Radio without props', () => {
  const component = renderer.create(<Radio />)
  expect(component.toJSON()).toMatchSnapshot()
})
