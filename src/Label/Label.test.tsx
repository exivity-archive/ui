import React from 'react'
import renderer from 'react-test-renderer'
import Label from '.'

test('renders label without props', () => {
  const button = renderer.create(<Label />)
  expect(button.toJSON()).toMatchSnapshot()
})

test('renders label with text', () => {
  const button = renderer.create(<Label>label</Label>)
  expect(button.toJSON()).toMatchSnapshot()
})

test('renders secondary label', () => {
  const button = renderer.create(<Label secondary>secondary</Label>)
  expect(button.toJSON()).toMatchSnapshot()
})

test('renders nested label', () => {
  const button = renderer.create(<Label>primary<Label>secondary</Label></Label>)
  expect(button.toJSON()).toMatchSnapshot()
})
