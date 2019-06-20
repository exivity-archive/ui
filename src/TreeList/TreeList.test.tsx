import React from 'react'
import { mountWithTheme } from '../utils/tests/mountWithTheme'

import { TreeList } from '.'

const parentKeyAccessor = (item: any) => item.parentId

describe('<TreeList/>', () => {
  test('initially renders all parents', () => {
    const items = [
      { key: '1', value: 'one', parentId: null },
      { key: '2', value: 'two', parentId: null },
      { key: '3', value: 'three', parentId: '1' },
      { key: '4', value: 'four', parentId: '2' }
    ]

    const wrapper = mountWithTheme(<TreeList data={items} parentKeyAccessor={parentKeyAccessor} />)

    expect(wrapper.find('li').length).toBe(2)
  })

  test('returns an item onChange', () => {
    const itemOne = { key: '1', value: 'one', parentId: null }

    const items = [
      itemOne,
      { key: '2', value: 'two', parentId: '1' },
      { key: '3', value: 'three', parentId: '1' },
      { key: '4', value: 'four', parentId: '1' }
    ]

    const onChange = jest.fn(item => item)

    const wrapper = mountWithTheme(<TreeList onChange={onChange} data={items} parentKeyAccessor={parentKeyAccessor} />)

    wrapper.find('li')
      .first()
      .simulate('click')

    const onChangeResult = onChange.mock.results[0].value

    expect(onChangeResult).toMatchObject(itemOne)
  })

  test('uses a custom item component', () => {
    const items = [
      { key: '1', value: 'one', parentId: null },
      { key: '2', value: 'two', parentId: '1' },
      { key: '3', value: 'three', parentId: '1' },
      { key: '4', value: 'four', parentId: '1' }
    ]

    const Custom: any = ({ style }) => <div style={style} className='test-id' />

    const wrapper = mountWithTheme(<TreeList data={items} parentKeyAccessor={parentKeyAccessor}>{Custom}</TreeList>)

    expect(wrapper.find('.test-id').length).toBe(1)
    expect(wrapper.find('li').length).toBe(0)
  })

  test('expands and collapses children when DefaultItem button is clicked', () => {
    const items = [
      { key: '1', value: 'one', parentId: null },
      { key: '2', value: 'two', parentId: '1' },
      { key: '3', value: 'three', parentId: '1' },
      { key: '4', value: 'four', parentId: '1' }
    ]

    const wrapper = mountWithTheme(<TreeList data={items} parentKeyAccessor={parentKeyAccessor} />)

    expect(wrapper.find('li').length).toBe(1)

    wrapper.find('button')
      .first()
      .simulate('click')

    expect(wrapper.find('li').length).toBe(4)

    wrapper.find('button')
      .first()
      .simulate('click')

    expect(wrapper.find('li').length).toBe(1)
  })

  test('initially expands when expandedKeys is provided', () => {
    const items = [
      { key: '1', value: 'one', parentId: null },
      { key: '2', value: 'two', parentId: '1' },
      { key: '3', value: 'three', parentId: '1' },
      { key: '4', value: 'four', parentId: '1' }
    ]

    const wrapper = mountWithTheme(<TreeList expandedKeys={['1']} data={items} parentKeyAccessor={parentKeyAccessor} />)

    expect(wrapper.find('li').length).toBe(4)
  })
})
