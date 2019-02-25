import React from 'react'
import { shallowWithTheme } from '../../../../utils/testing/shallowWithTheme'
import DropdownButton from './DropDownButton';

test('renders dropdown button', () => {
  const button = shallowWithTheme(<DropdownButton value={'test'} onClick={() => { return }} />)
  expect(button).toMatchSnapshot()
})
