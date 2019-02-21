import * as React from 'react'

import renderer from 'react-test-renderer'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Checkbox from '.'
import theme from '../../../theme'

configure({ adapter: new Adapter() })

test('renders checkbox', () => {
  const checkbox = renderer.create(
      <Checkbox theme={theme} checked onClick={() => { return }} />
  )
  expect(checkbox.toJSON()).toMatchSnapshot()
})

test('checked gets flipped in value when checkbox is clicked', () => {
  let checked: boolean = false
  const mockCallBack = jest.fn(() => {
    checked = !checked
  })

  const checkbox = shallow(
      <Checkbox checked onClick={mockCallBack} />
  )
  checkbox.simulate('click')
  expect(mockCallBack.mock.calls.length).toEqual(1)
  expect(checkbox.props().checked === true).toBe(true)
  // @ts-ignore
  expect(checked === true).toBe(true)
})
