import * as React from 'react'
import { mount, shallow } from 'enzyme'
import { enzymeFind } from 'styled-components/test-utils'

import { Checkbox, StyledCheckbox } from './Checkbox'

test('onClick handler returns checkedValue', () => {
  const onClickMock = jest.fn(x => x)

  const checkbox = mount(<Checkbox checked onClick={onClickMock} />)

  enzymeFind(checkbox, StyledCheckbox)
    .simulate('click', { target: { checked: false } })

  expect(onClickMock.mock.results[0].value).toBe(false)
})

test('onChange handler returns checkedValue', () => {
  const onChangeMock = jest.fn(x => x)

  const checkbox = mount(<Checkbox checked onChange={onChangeMock} />)

  enzymeFind(checkbox, StyledCheckbox)
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

  checkbox.setProps({ checked: true })

  const checked = enzymeFind(checkbox, StyledCheckbox)
    .props()
    .checked

  expect(checked).toBe(true)
})
