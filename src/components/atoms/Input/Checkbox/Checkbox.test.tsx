import * as React from 'react'

import { shallow } from 'enzyme'

import Checkbox from '.'

test('renders checkbox', () => {
  const checkbox = shallow(
      <Checkbox checked onClick={() => { return }} />
  )
  expect(checkbox).toMatchSnapshot()
})

test('checked gets flipped in value when checkbox is clicked', () => {
  let checked: boolean = false
  const mockCallBack = jest.fn(() => checked = !checked)

  const checkbox = shallow(<Checkbox checked={checked} onClick={mockCallBack} />)
  
  checkbox.simulate('click')
  expect(mockCallBack.mock.calls.length).toEqual(1)
  // @ts-ignore
  expect(checked === true).toBe(true)
})
