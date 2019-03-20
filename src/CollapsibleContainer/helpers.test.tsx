import React from 'react'
import { mount } from 'enzyme'

import { CollapsibleContainer, useCollapsibleContext } from '.'

const ContextGetter = () => {
  const context = useCollapsibleContext()
  return null
}

test('should throw an error when called outside of a CollapsibleContainer component', () => {
  let message: string
  try {
    mount(<ContextGetter />)
  } catch (error) {
    message = error.message
  }

  expect(message).toBe(
    'useCollapsibleContext should only be called within a child of a CollapsibleContainer component.'
    + 'e.g. Group or Box'
  )
})

test('shouldn\'t throw an error when called inside of a CollapsibleContainer component', () => {
  let message: string
  try {
    mount(<CollapsibleContainer><ContextGetter /></CollapsibleContainer>)
  } catch (error) {
    message = error.message
  }

  expect(message).not.toBeDefined()
})
