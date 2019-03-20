import React from 'react'
import renderer from 'react-test-renderer'
import { Block } from '.'

// Modify or remove, stories are snapshotted automatically
test('renders Block without props', () => {
  const component = renderer.create(<Block />)
  expect(component.toJSON()).toMatchSnapshot()
})
