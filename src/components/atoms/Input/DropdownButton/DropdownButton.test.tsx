import React from 'react'
import renderer from 'react-test-renderer'

import DropdownButton from '.';

test('renders dropdown button', () => {
  const button = renderer.create(<DropdownButton value={'test'} onClick={() => { return }} />)
  expect(button.toJSON()).toMatchSnapshot()
})
