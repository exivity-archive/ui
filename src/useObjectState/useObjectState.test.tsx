import React, { FC, useState, Dispatch } from 'react'
import { useObjectState } from './useObjectState'
import { mount } from 'enzyme'

interface StateObjectUserProps {
  initialState: any
  children (state: any, update: (key: string, value: any) => void, set: Dispatch<any>)
}

const ObjectStateUser: FC<StateObjectUserProps> = ({ children, initialState }) => {
  const [state, update, set] = useObjectState(initialState)
  return children(state, update, set)
}

test('updateObjectState takes in a string and a new value', () => {
  const initialState = {
    count: 0,
    startCount: 5
  }
  mount(<ObjectStateUser initialState={initialState}>
    {(objectState, updateObjectState) => {
      const [renders, setRenders] = useState(0)
      if (renders === 0) {
        expect(objectState.count).toBe(0)
        expect(objectState.startCount).toBe(5)
        updateObjectState('count', 10)
      } else {
        expect(objectState.count).toBe(10)
        expect(objectState.startCount).toBe(5)
      }

      if (renders < 2) setRenders(renders + 1)
      return null
    }}
  </ObjectStateUser>)
})

test('setObjectState takes in an object and replaces the old one', () => {
  const initialState = {
    count: 0,
    startCount: 5
  }
  mount(<ObjectStateUser initialState={initialState}>
    {(objectState, updateObjectState, setObjectState) => {
      const [renders, setRenders] = useState(0)
      if (renders === 0) {
        expect(objectState.count).toBe(0)
        expect(objectState.startCount).toBe(5)
        setObjectState({ count: 10, startCount: 20 })
      } else {
        expect(objectState.count).toBe(10)
        expect(objectState.startCount).toBe(20)
      }

      if (renders < 2) setRenders(renders + 1)
      return null
    }}
  </ObjectStateUser>)
})
