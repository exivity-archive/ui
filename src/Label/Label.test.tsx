import React from 'react'
import renderer from 'react-test-renderer'
import Label from '.'

test('renders label without props', () => {
  const button = renderer.create(<Label />)
  expect(button.toJSON()).toMatchSnapshot()
})

test('renders label with name and description', () => {
  const button = renderer.create(<Label name='Label name' description='Label description' />)
  expect(button.toJSON()).toMatchSnapshot()
})

test('renders label with content', () => {
  const button = renderer.create(<Label>Label content</Label>)
  expect(button.toJSON()).toMatchSnapshot()
})
