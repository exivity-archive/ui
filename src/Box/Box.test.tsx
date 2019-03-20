import React from 'react'
import { mount } from 'enzyme'

import { Box } from './Box'

test('box bar should throw an error when rendered outside a box component', () => {
  let message: string
  try {
    mount(<Box.Bar></Box.Bar>)
  } catch (error) {
    message = error.message
  }
  expect(message).toBe(
    'useCollapsibleContext should only be called within a child of a CollapsibleContainer component.'
    + 'e.g. Group or Box'
  )
})
