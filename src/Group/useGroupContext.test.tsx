import React from 'react'
import { mount } from 'enzyme'

import { useGroupContext } from './useGroupContext'

test('should throw an error when called outside of a Group component', () => {
  let message: string
  const ContextGetter = () => {
    const context = useGroupContext()
    console.log(context)
    return null
  }

  try {
    mount(<ContextGetter />)
  } catch (error) {
    message = error.message
  }

  expect(message).toBeDefined()
  expect(message).toBe('useGroupContext should only be called within a child of a Group component')
})
