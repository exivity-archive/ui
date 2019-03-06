import React from 'react'
import renderer from 'react-test-renderer'
import { Heading } from '.'

test('renders Heading without props', () => {
  const component = renderer.create(<Heading />)
  expect(component.toJSON()).toMatchSnapshot()
})

test('renders Heading with text', () => {
  const component = renderer.create(<Heading>Heading</Heading>)
  expect(component.toJSON()).toMatchSnapshot()
})

test('renders Heading with different levels', () => {
  const component1 = renderer.create(<Heading level={1} />)
  expect(component1.toJSON()).toMatchSnapshot()
  const component2 = renderer.create(<Heading level={2} />)
  expect(component2.toJSON()).toMatchSnapshot()
  const component3 = renderer.create(<Heading level={3} />)
  expect(component3.toJSON()).toMatchSnapshot()
})
