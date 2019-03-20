import { mount } from 'enzyme'
import * as React from 'react'
// @ts-ignore
import { enzymeFind } from 'styled-components/test-utils'

import { Radio, StyledRadio } from '.'

test('onChange handler returns checkedValue', () => {
  const onChangeMock = jest.fn(x => x)
  const checkbox = mount(<Radio checked onChange={onChangeMock} />)

  enzymeFind(checkbox, StyledRadio)
    .simulate('change', { target: { checked: false } })

  expect(onChangeMock.mock.results[0].value).toBe(false)
})

test('checked prop to true', () => {
  const checkbox = mount(<Radio checked />)
  const checked = enzymeFind(checkbox, StyledRadio).props().checked

  expect(checked).toBe(true)
})

test('checked prop to false', () => {
  const checkbox = mount(<Radio checked={false} />)
  const checked = enzymeFind(checkbox, StyledRadio).props().checked

  expect(checked).toBe(false)
})

test('checked prop updates', () => {
  const checkbox = mount(<Radio checked={false} />)
  checkbox.setProps({ checked: true })
  const checked = enzymeFind(checkbox, StyledRadio).props().checked

  expect(checked).toBe(true)
})
