/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import DataGrid from './DataGrid'

test('renders default DataGrid', () => {
  const component = renderer.create(<DataGrid />)
  expect(component.toJSON()).toMatchSnapshot()
})
