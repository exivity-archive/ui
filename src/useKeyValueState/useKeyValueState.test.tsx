import React, { FC, useState, Dispatch } from 'react'
import { useKeyValueState } from './useKeyValueState'
import { mount } from 'enzyme'

interface KeyValueStateUserProps {
  items: { key: string, value: any }[]
  initialState: string
  children (state: any, update: (key: string, value: any) => void, set: Dispatch<any>)
}

const KeyValueStateUser: FC<KeyValueStateUserProps> = ({ children, initialState, items }) => {
  const [key, value, setKey] = useKeyValueState(items, initialState)
  return children(key, value, setKey)
}

test('setKey updates key and value', () => {
  const items = [
    { key: 'one', value: 'hello' },
    { key: 'two', value: 'bye' },
    { key: 'three', value: 'test' }
  ]
  mount(
    < KeyValueStateUser items={items} initialState='one' >
      {(key, value, setKey) => {
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
