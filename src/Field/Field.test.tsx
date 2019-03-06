/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import { Field } from '.'

test('renders default Field', () => {
  const component = renderer.create(<Field />)
  expect(component.toJSON()).toMatchSnapshot()
})

test('renders default Field.Container', () => {
  const component = renderer.create(<Field.Container />)
  expect(component.toJSON()).toMatchSnapshot()
})

test('renders Field.Container containing children', () => {
  const component = renderer.create(<Field.Container><div/></Field.Container>)
  expect(component.toJSON()).toMatchSnapshot()
})
