import React from 'react'
import renderer from 'react-test-renderer'
import { Grid } from '.'

// Modify or remove, stories are snapshotted automatically
test('renders Grid without props', () => {
  const component = renderer.create(<Grid />)
  expect(component.toJSON()).toMatchSnapshot()
})
