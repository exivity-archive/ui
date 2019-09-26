import React, { forwardRef } from 'react'

import { mountWithTheme } from '../utils/tests/mountWithTheme'

import { Select } from '.'

const CustomInput = forwardRef<any, any>((props, ref) => (
  <input id='test-id' {...props} ref={ref} />
))

test('SelectT injects value component with selected value', () => {
  const wrapper = mountWithTheme((
    <Select
      value={{ key: 'one', value: 'one' }}
      onChange={(() => null)}
      data={[]}
    />
  ))

  expect(wrapper.find('input')).toBeDefined()
  expect(wrapper.find('input').props().value).toBe('one')
  wrapper.unmount()
})

test('SelectT uses a custom value component', () => {
  const wrapper = mountWithTheme((
    <Select
      value={{ key: 'one', value: 'one' }}
      onChange={(() => null)}
      data={[]}
      InputComponent={CustomInput}
    />
  ))

  expect(wrapper.find('#test-id')).toBeDefined()
  expect(wrapper.find('#test-id').props().value).toBe('one')
  wrapper.unmount()
})
