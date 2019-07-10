import React from 'react'

import { mountWithTheme } from '../utils/tests/mountWithTheme'
import { SelectList } from '.'

test('SelectList renders a list of items', () => {
  const items = [
    { key: '1', value: 'one' },
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const wrapper = mountWithTheme(<SelectList data={items} />)

  expect(wrapper.find('li').length).toBe(4)
})

test('SelectList returns an item onChange', () => {
  const itemOne = { key: '1', value: 'one' }

  const items = [
    itemOne,
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const onChange = jest.fn(item => item)

  const wrapper = mountWithTheme(<SelectList onChange={onChange} data={items} />)

  wrapper.find('li')
    .first()
    .simulate('click')

  const onChangeResult = onChange.mock.results[0].value

  expect(onChangeResult).toBe(itemOne)
})

test('SelectList uses a default item component', () => {
  const items = [
    { key: '1', value: 'one' },
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const wrapper = mountWithTheme(<SelectList data={items} />)

  expect(wrapper.find('li').length).toBe(4)
})

test('SelectList uses a custom item component', () => {
  const items = [
    { key: '1', value: 'one' },
    { key: '2', value: 'two' },
    { key: '3', value: 'three' },
    { key: '4', value: 'four' }
  ]

  const Custom = () => <div className='test-id' />

  const wrapper = mountWithTheme(<SelectList data={items}>{Custom}</SelectList>)

  expect(wrapper.find('.test-id').length).toBe(4)
  expect(wrapper.find('li').length).toBe(0)
})
