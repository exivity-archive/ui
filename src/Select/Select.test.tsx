import React from 'react'

import { mountWithTheme } from '../utils/tests/mountWithTheme'

import { Select } from '.'

describe('The Select component', () => {
  test('injects value component with selected value', () => {
    const wrapper = mountWithTheme((
      <Select
        selected={{ key: 'one', value: 'one' }}
        data={[]}
        onChange={(() => null)} />
    ))

    expect(wrapper.find('input')).toBeDefined()
    expect(wrapper.find('input').props().value).toBe('one')

    wrapper.unmount()
  })

  test('uses custom value accessor', () => {
    const wrapper = mountWithTheme((
      <Select
        selected={{ key: 'one', value: 'one' }}
        inputValueAccessor={(item) => `Value: ${item.value}`}
        data={[]}
        onChange={(() => null)} />
    ))

    expect(wrapper.find('input')).toBeDefined()
    expect(wrapper.find('input').props().value).toBe('Value: one')

    wrapper.unmount()
  })

  test('injects value component with selected value', () => {
    const wrapper = mountWithTheme((
      <Select
        selected={{ key: 'one', value: 'one' }}
        data={[]}
        onChange={(() => null)} />
    ))

    expect(wrapper.find('input')).toBeDefined()
    expect(wrapper.find('input').props().value).toBe('one')

    wrapper.unmount()
  })

  test('uses a custom value component', () => {
    const wrapper = mountWithTheme((
      <Select
        selected={{ key: 'one', value: 'one' }}
        data={[]}
        inputComponent={(props) => <input id='test-id' {...props} />}/>
    ))

    expect(wrapper.find('#test-id')).toBeDefined()
    expect(wrapper.find('#test-id').props().value).toBe('one')

    wrapper.unmount()
  })

  test('uses string as value with custom options', () => {
    const wrapper = mountWithTheme((
      <Select selected='string value'>
        <div>custom options</div>
      </Select>
    ))

    expect(wrapper.find('input')).toBeDefined()
    expect(wrapper.find('input').props().value).toBe('string value')

    wrapper.unmount()
  })
})
