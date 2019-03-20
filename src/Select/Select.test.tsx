import React from 'react'
import { mountWithTheme } from '../utils/tests/mountWithTheme'

import { Select } from '.'
import { injectComponent } from './Select'
import { SelectInput } from '../SelectInput'

test('SelectT injects value component with selected value', () => {
  const wrapper = mountWithTheme(<Select value='one'><div>placeholder</div></Select>)

  expect(wrapper.find('input').props().value).toBe('one')
})

test('SelectT uses a default value component', () => {
  const wrapper = mountWithTheme(<Select value='one'><div>placeholder</div></Select>)

  expect(wrapper.find('input')).toBeDefined()
})

test('SelectT uses a custom value component', () => {
  const ValueComp = <input id='test-id' onChange={jest.fn}/>

  const wrapper = mountWithTheme(<Select value='one' valueComponent={ValueComp}><div>placeholder</div></Select>)

  expect(wrapper.find('#test-id')).toBeDefined()
})

test('SelectT inject value component with selected value', () => {
  const ValueComp = <input id='test-id' onChange={jest.fn}/>

  const wrapper = mountWithTheme(<Select value='one' valueComponent={ValueComp}><div>placeholder</div></Select>)

  expect(wrapper.find('#test-id').props().value).toBe('one')
})

test('injectComponents', () => {
  const injectedValue = 'injected'
  const wrapper = mountWithTheme(<SelectInput value='test'/>)
  const input = wrapper.find('input')

  // @ts-ignore
  const injectedComponent = injectComponent(input, { value: injectedValue })
  expect(injectedComponent.props.value).toBe(injectedValue)
})
