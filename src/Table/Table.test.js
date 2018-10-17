/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Table from './Table'

test('renders default Table', () => {
  const component = renderer.create(<Table />)
  expect(component.toJSON()).toMatchSnapshot()
})
