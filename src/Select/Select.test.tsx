import React from 'react'
import { mountWithTheme } from '../utils/tests/mountWithTheme'

import { Select } from '.'
import { injectComponent } from './Select'
import { SelectInput } from '../SelectInput'

test('SelectT injects value component with selected value', () => {
  const wrapper = mountWithTheme((
    <Select value={{ key: 'one', value: 'one' }} data={[]} />
  ))

  expect(wrapper.find('input')).toBeDefined()
  expect(wrapper.find('input').props().value).toBe('one')
  wrapper.unmount()
})

test('SelectT uses a custom value component', () => {
  const wrapper = mountWithTheme((
    <Select
      value={{ key: 'one', value: 'one' }}
      data={[]}
      triggerComponent={<input id='test-id' onChange={jest.fn} />}
    />
  ))

  expect(wrapper.find('#test-id')).toBeDefined()
  expect(wrapper.find('#test-id').props().value).toBe('one')
  wrapper.unmount()
})

test('injectComponents', () => {
  const injectedValue = 'injected'
  const wrapper = mountWithTheme(<SelectInput value='test' />)
  const input = wrapper.find('input')

  // @ts-ignore
  const injectedComponent = injectComponent(input, { value: injectedValue })
  expect(injectedComponent.props.value).toBe(injectedValue)
  wrapper.unmount()
})
