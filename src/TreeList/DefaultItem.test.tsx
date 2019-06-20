import React from 'react'

import { mountWithTheme } from '../utils/tests/mountWithTheme'
import { TreeList } from './TreeList'
import { MdAdd, MdDelete, MdRemove } from 'react-icons/md'
import { CHILDREN } from '../utils/makeParentChildTree'

const parentKeyAccessor = (item: any) => item.parentId

describe('<DefaultItem/>', () => {
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

  test('button shows a plus sign when item is not expanded', () => {
    const item1 = { key: '1', value: 'one', parentId: null }
    const item2 = { key: '2', value: 'two', parentId: '1' }

    const wrapper = mountWithTheme(<TreeList data={[item1, item2]} parentKeyAccessor={parentKeyAccessor} />)

    expect(wrapper.find(MdAdd).length).toBe(1)
  })

  test('button shows a minus sign when item is expanded', () => {
    const item1 = { key: '1', value: 'one', parentId: null }
    const item2 = { key: '2', value: 'two', parentId: '1' }

    const wrapper = mountWithTheme(<TreeList data={[item1, item2]} parentKeyAccessor={parentKeyAccessor} />)

    wrapper.find('button')
      .first()
      .simulate('click')

    expect(wrapper.find(MdRemove).length).toBe(1)
  })
})
