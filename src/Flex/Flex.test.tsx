import React from 'react'
import renderer from 'react-test-renderer'
import { Flex } from '.'

// Modify or remove, stories are snapshotted automatically
test('renders Flex without props', () => {
  const component = renderer.create(<Flex />)
  expect(component.toJSON()).toMatchSnapshot()
})
