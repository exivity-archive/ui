import { mount } from 'enzyme'
import * as React from 'react'
// @ts-ignore
import { enzymeFind } from 'styled-components/test-utils'

import { Checkbox, StyledCheckbox } from './Checkbox'

test('onChange handler returns checkedValue', () => {
  const onChangeMock = jest.fn(x => x)
  const checkbox = mount(<Checkbox checked onChange={onChangeMock} />)

  enzymeFind(checkbox, StyledCheckbox)
    .simulate('change', { target: { checked: false } })

  expect(onChangeMock.mock.results[0].value).toBe(false)
})

test('checked prop to true', () => {
  const checkbox = mount(<Checkbox checked />)
  const checked = enzymeFind(checkbox, StyledCheckbox).props().checked

  expect(checked).toBe(true)
})

test('checked prop to false', () => {
  const checkbox = mount(<Checkbox checked={false} />)
  const checked = enzymeFind(checkbox, StyledCheckbox).props().checked

  expect(checked).toBe(false)
})

test('checked prop updates', () => {
  const checkbox = mount(<Checkbox checked={false} />)
  checkbox.setProps({ checked: true })
  const checked = enzymeFind(checkbox, StyledCheckbox).props().checked

  expect(checked).toBe(true)
})
