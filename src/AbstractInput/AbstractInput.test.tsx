import React from 'react'
import renderer from 'react-test-renderer'
import { AbstractInput } from '.'

// Modify or remove, stories are snapshotted automatically
test('renders AbstractInput without props', () => {
  const component = renderer.create(<AbstractInput />)
  expect(component.toJSON()).toMatchSnapshot()
})
