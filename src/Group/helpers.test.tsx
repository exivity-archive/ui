import React from 'react'
import { mount } from 'enzyme'

import { useGroupContext } from './helpers'
import { Group } from '.'

const ContextGetter = () => {
  const context = useGroupContext()
  return null
}

test('should throw an error when called outside of a Group component', () => {
  let message: string
  try {
    mount(<ContextGetter />)
  } catch (error) {
    message = error.message
  }

  expect(message).toBe('useGroupContext should only be called within a child of a Group component')
})

test('should throw an error when called outside of a Group component', () => {
  let message: string
  try {
    mount(<Group><ContextGetter /></Group>)
  } catch (error) {
    message = error.message
  }

  expect(message).not.toBeDefined()
})
