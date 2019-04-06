import React, { useState, Dispatch, SetStateAction } from 'react'
import { useDynamicAttribute, Enriched } from './useDynamicAttribute'
import { mount } from 'enzyme'
import { ListItem } from '../utils'

interface ICheckableListProps {
  data: ListItem<{ checked?: boolean }>[]
  children: (
    items: ListItem<Enriched<boolean, 'checked', 'setChecked'>>[],
    useState: [any, Dispatch<SetStateAction<any>>]
  ) => any
  initVal: boolean | ((item: ListItem<{ checked?: boolean }>) => boolean)
  initState?: any
}

const CheckableList: React.FC<ICheckableListProps> = ({ children, data, initVal, initState }) => {
  const state = typeof initState !== 'undefined' ? useState(initState) : useState(undefined)
  return children(
    useDynamicAttribute(data, 'checked', 'setChecked', initVal),
    state
  )
}

test('passed in key and setter are defined on enriched data', () => {
  const data: ListItem<{}>[] = [{ key: 'first' }, { key: 'second' }, { key: 'third' }]

  mount(
    <CheckableList data={data} initVal={true}>
      {(items) => {
        items.forEach((item) => {
          expect(item.checked).toBeDefined()
          expect(item.setChecked).toBeDefined()
        })
        return null
      }}
    </CheckableList>
  )
})

test('once setter is called the value changes to passed in value', () => {
  const data: ListItem<{}>[] = [{ key: 'first' }, { key: 'second' }, { key: 'third' }]

  mount(
    <CheckableList data={data} initVal={true} initState={0}>
      {(items, [timesRendered, setTimesRendered]) => {
        const item = items[0]
        if (timesRendered === 0) {
          expect(item.checked).toBe(true)
          item.setChecked(false)
          setTimesRendered(timesRendered + 1)
        } else {
          expect(item.checked).toBe(false)
        }

        return null
      }}
    </CheckableList>
  )
})

test('init val can be a function that returns the initial state', () => {
  const data: ListItem<{ checked: boolean }>[] = [
    { key: 'first', checked: false },
    { key: 'second', checked: true },
    { key: 'third', checked: false }
  ]
  mount(
    <CheckableList data={data} initVal={item => item.checked}>
      {(items) => {
        expect(items[0]).toHaveProperty('checked', false)
        expect(items[1]).toHaveProperty('checked', true)
        expect(items[2]).toHaveProperty('checked', false)

        return null
      }}
    </CheckableList>
  )
})
