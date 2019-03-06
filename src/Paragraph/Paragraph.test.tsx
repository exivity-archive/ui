import React from 'react'
import renderer from 'react-test-renderer'
import { Paragraph } from '.'

test('renders Paragraph without props', () => {
  const component = renderer.create(<Paragraph />)
  expect(component.toJSON()).toMatchSnapshot()
})
