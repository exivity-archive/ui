import React from 'react'
import { mount } from 'enzyme'
import { Box } from './Box'
import { useBoxContext } from './helpers'

const BoxContextConsumer = () => {
  const context = useBoxContext()
  return null
}

test('it throws an error when useBoxContext is used outside a Box component', () => {
  let message: string
  try {
    mount(<BoxContextConsumer />)
  } catch (err) {
    message = err.message
  }
  expect(message).toBe('useBoxContext should only be called within a child of a Box component')
})

test('it doesn\'t throw an error when useBoxContext is used inside a Box component', () => {
  let error: Error
  try {
    mount(<Box><BoxContextConsumer /></Box>)
  } catch (err) {
    error = err
  }
  expect(error).not.toBeDefined()
})
