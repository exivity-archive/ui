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

  expect(wrapper.find('li').length).toBe(4)
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

  wrapper.find('li')
    .first()
    .simulate('click')

  const onChangeResult = onChange.mock.results[0].value

  expect(onChangeResult).toBe(itemOne)
})

test('Select injects value component with selected value', () => {
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

  expect(wrapper.find('li').length).toBe(4)
})

test('Select uses a custom item component', () => {
  const items = [
    { key: '1', value: 'one' },
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const Custom = ({ style }: any) => <div style={style} className='test-id'/>

  const wrapper = mountWithTheme(<Select data={items}>{Custom}</Select>)

  expect(wrapper.find('.test-id').length).toBe(4)
  expect(wrapper.find('li').length).toBe(0)
})

test('Select uses a default value component', () => {
  const items = [
    { key: '1', value: 'one' },
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const wrapper = mountWithTheme(<Select value='1' data={items}/>)

  expect(wrapper.find('input')).toBeDefined()
})

test('Select uses a custom value component', () => {
  const ValueComp = <input id='test-id' onChange={jest.fn}/>

  const items = [
    { key: '1', value: 'one' },
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const wrapper = mountWithTheme(<Select value='1' data={items} valueComponent={ValueComp}/>)

  expect(wrapper.find('#test-id')).toBeDefined()
})

test('Select inject value component with selected value', () => {
  const ValueComp = <input id='test-id' onChange={jest.fn}/>

  const items = [
    { key: '1', value: 'one' },
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const wrapper = mountWithTheme(<Select value='1' data={items} valueComponent={ValueComp}/>)

  expect(wrapper.find('#test-id').props().value).toBe('one')
})
