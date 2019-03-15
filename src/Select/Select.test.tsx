import React from 'react'
import { mountWithTheme } from '../utils/tests/mountWithTheme'
import { Select } from './Select'

test('Select renders a list of items', () => {
  const items = [
    { key: '1', value: 'one' },
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const wrapper = mountWithTheme(<Select data={items}/>)

  wrapper.find('input')
    .simulate('click')

  // find list
})

test('Select returns an item onChange', () => {
  const itemOne = { key: '1', value: 'one' }

  const items = [
    itemOne,
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const onChange = jest.fn(item => item)

  const wrapper = mountWithTheme(<Select onChange={onChange} data={items}/>)

  wrapper.find('input')
    .simulate('click')

  // @ToDo select item
  wrapper.find('input')
    .simulate('click')

  const onChangeResult = onChange.mock.results[0].value

  expect(onChangeResult).toBe(itemOne)
})

test('Select inject value component with selected value', () => {
  const items = [
    { key: '1', value: 'one' },
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const wrapper = mountWithTheme(<Select value='1' data={items}/>)

  expect(wrapper.find('input').props().value).toBe('one')
})

test('Select uses a default item component', () => {
  const items = [
    { key: '1', value: 'one' },
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const wrapper = mountWithTheme(<Select data={items}/>)

  wrapper.find('input')
    .simulate('click')
})

test('Select uses a custom item component', () => {
  const items = [
    { key: '1', value: 'one' },
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const wrapper = mountWithTheme(<Select data={items}/>)

  wrapper.find('input')
    .simulate('click')
})

test('Select uses a default value component', () => {
  const items = [
    { key: '1', value: 'one' },
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const wrapper = mountWithTheme(<Select value='1' data={items}/>)

  expect(wrapper.find('input')).toEqual(true)
})

test('Select uses a custom value component', () => {
  const ValueComp = () => <select/>

  const items = [
    { key: '1', value: 'one' },
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const wrapper = mountWithTheme(<Select value='1' data={items} valueComponent={ValueComp}/>)

  expect(wrapper.find('select')).toEqual(true)
})
