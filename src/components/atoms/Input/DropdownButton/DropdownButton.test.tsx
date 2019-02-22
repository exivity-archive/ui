import React from 'react'
import { shallowWithTheme } from '../../../../utils/testing/shallowWithTheme'
import DropdownButton from '.';



test('renders dropdown button', () => {
  const button = shallowWithTheme(<DropdownButton value={'test'} onClick={() => { return }} />)
  expect(button).toMatchSnapshot()
})
