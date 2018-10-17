/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import List from './List'

test('renders default List', () => {
  const component = renderer.create(<List />)
  expect(component.toJSON()).toMatchSnapshot()
})
