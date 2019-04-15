import React, { FC, useState, Dispatch } from 'react'
import { useKeyValueState } from './useKeyValueState'
import { mount } from 'enzyme'

interface KeyValueStateUserProps {
  items: { key: string, value: any }[]
  initialState: string
  children (value: any, set: Dispatch<any>, key: string)
}

const KeyValueStateUser: FC<KeyValueStateUserProps> = ({ children, initialState, items }) => {
  const [value, setKey, key] = useKeyValueState(items, initialState)
  return children(value, setKey, key)
}

test('setKey updates key and value', () => {
  const items = [
    { key: 'one', value: 'hello' },
    { key: 'two', value: 'bye' },
    { key: 'three', value: 'test' }
  ]
  mount(
    < KeyValueStateUser items={items} initialState='one' >
      {(value, setKey, key) => {
        const [renders, setRenders] = useState(0)
        if (renders === 0) {
          expect(key).toBe('one')
          expect(value).toBe('hello')
          setKey('two')
        } else {
          expect(key).toBe('two')
          expect(value).toBe('bye')
        }

        if (renders < 2) setRenders(renders + 1)
        return null
      }}
    </KeyValueStateUser>
  )
})

test('value is undefined when keys don\'t match', () => {
  const items = [
    { key: 'two', value: 'bye' },
    { key: 'three', value: 'test' }
  ]
  mount(
    < KeyValueStateUser items={items} initialState='one' >
      {(value, setKey, key) => {
        const [renders, setRenders] = useState(0)
        if (renders === 0) {
          expect(key).toBe('one')
          expect(value).not.toBeDefined()
          setKey('two')
        } else {
          expect(key).toBe('two')
          expect(value).toBe('bye')
        }

        if (renders < 2) setRenders(renders + 1)
        return null
      }}
    </KeyValueStateUser>
  )
})
