import * as React from 'react'
import { mount, shallow } from 'enzyme'

import Checkbox from '.'

test('renders checkbox', () => {
  const checkbox = shallow(<Checkbox checked onClick={jest.fn()}/>)
  expect(checkbox).toMatchSnapshot()
})

test('onClick handler returns checkedValue', () => {
  const onClickMock = jest.fn(x => x)

  const checkbox = mount(<Checkbox checked onClick={onClickMock} />)

  checkbox
      .find({ type: 'checkbox' })
      .simulate('click', { target: { checked: false } })

  expect(onClickMock.mock.results[0].value).toBe(false)
})

test('onChange handler returns checkedValue', () => {
  const onChangeMock = jest.fn(x => x)

  const checkbox = mount(<Checkbox checked onChange={onChangeMock} />)

  checkbox
        .find({ type: 'checkbox' })
        .simulate('change', { target: { checked: false } })

  expect(onChangeMock.mock.results[0].value).toBe(false)
})

test('checked prop to true', () => {
  const checkbox = shallow(<Checkbox checked onChange={jest.fn()} />)
  expect(checkbox.props().checked).toBe(true)
})

test('checked prop to false', () => {
  const checkbox = shallow(<Checkbox checked={false} onChange={jest.fn()} />)
  expect(checkbox.props().checked).toBe(false)
})

test('checked prop updates', () => {
  const checkbox = mount(<Checkbox checked={false} onChange={jest.fn()} />)

  const checked = checkbox
        .setProps({ checked: true })
        .find({ type: 'checkbox' })
        .props()
        .checked

  expect(checked).toBe(true)
})
