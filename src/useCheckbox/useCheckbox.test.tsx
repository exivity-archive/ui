import React, { useState, Dispatch, SetStateAction } from 'react'
import { useCheckbox } from './useCheckbox'
import { Enriched } from './types'
import { mount } from 'enzyme'
import { MapItem } from '../utils'

interface IData extends MapItem { id: number }

interface ICheckableListProps {
  data: IData[]
  children: (
    items: Enriched<IData, 'checked', 'setChecked', boolean>[],
    useState: [any, Dispatch<SetStateAction<any>>]
  ) => any
  initVal: boolean | ((item: IData) => boolean)
  initState?: any
}

const CheckableList: React.FC<ICheckableListProps> = ({ children, data, initVal, initState }) => {
  const state = typeof initState !== 'undefined' ? useState(initState) : useState(undefined)
  return children(
    useCheckbox<IData, 'checked', 'setChecked', boolean>(data, 'checked', 'setChecked', initVal),
    state
  )
}

test('passed in key and setter are defined on enriched data', () => {
  const data: IData[] = [{ id: 1, key: 'first' }, { id: 2, key: 'second' }, { id: 3, key: 'third' }]

  mount(
    <CheckableList data={data} initVal={true}>
      {(items) => {
        items.forEach((item) => {
          expect(item.checked).toBe(true)
          spyOn(item, 'setChecked')
          item.setChecked(false, items)
          expect(item.setChecked).toHaveBeenCalled()
        })
        return null
      }}
    </CheckableList>
  )
})

test('returns same amount of items as is passed in', () => {
  const data: IData[] = [{ id: 1, key: 'first' }, { id: 2, key: 'second' }, { id: 3, key: 'third' }]

  mount(
    <CheckableList data={data} initVal={true}>
      {(items) => {
        expect(items).toHaveLength(data.length)
        return null
      }}
    </CheckableList>
  )
})

test('once setter is called the value changes to passed in value', () => {
  const data: IData[] = [{ id: 1, key: 'first' }, { id: 2, key: 'second' }, { id: 3, key: 'third' }]

  mount(
    <CheckableList data={data} initVal={true} initState={0}>
      {(items, [timesRendered, setTimesRendered]) => {
        const item = items[0]
        if (timesRendered === 0) {
          expect(item.checked).toBe(true)
          item.setChecked(false, items)
          setTimesRendered(timesRendered + 1)
        } else {
          expect(item.checked).toBe(false)
        }

        return null
      }}
    </CheckableList>
  )
})

test('original keys should still be intact', () => {
  const data: IData[] = [{ id: 1, key: 'first' }, { id: 2, key: 'second' }, { id: 3, key: 'third' }]

  mount(
    <CheckableList data={data} initVal={true}>
      {(items) => {
        items.forEach(item => {
          expect(item).toHaveProperty('id')
        })

        return null
      }}
    </CheckableList>
  )
})

test('the returned array should have the same order', () => {
  const data: IData[] = [{ id: 1, key: 'first' }, { id: 2, key: 'second' }, { id: 3, key: 'third' }]
  mount(
    <CheckableList data={data} initVal={true}>
      {(items) => {
        expect(items[0]).toHaveProperty('id', 1)
        expect(items[1]).toHaveProperty('id', 2)
        expect(items[2]).toHaveProperty('id', 3)

        return null
      }}
    </CheckableList>
  )
})

test('init val can be a function that returns the initial state', () => {
  const data: IData[] = [{ id: 1, key: 'first' }, { id: 2, key: 'second' }, { id: 3, key: 'third' }]
  mount(
    <CheckableList data={data} initVal={(item: IData) => {
      return item.id % 2 === 0
    }}>
      {(items) => {
        expect(items[0]).toHaveProperty('checked', false)
        expect(items[1]).toHaveProperty('checked', true)
        expect(items[2]).toHaveProperty('checked', false)

        return null
      }}
    </CheckableList>
  )
})
