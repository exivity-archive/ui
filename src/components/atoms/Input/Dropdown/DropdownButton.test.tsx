import React from 'react'
import { shallowWithTheme } from '../../../../utils/testing/shallowWithTheme'
import DropdownButton from './DropdownButton';

test('renders dropdown button', () => {
  const button = shallowWithTheme(<DropdownButton opened={false} value={'test'} onClick={() => { return }} />)
  expect(button).toMatchSnapshot()
})
