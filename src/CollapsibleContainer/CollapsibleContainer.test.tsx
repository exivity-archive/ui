import React from 'react'
import { mount } from 'enzyme'

import { CollapsibleContainer } from './CollapsibleContainer'
import { CollapsibleContext } from './helpers'

test('CollapsibleContainer.Collapser should throw an error when rendered outside a box component', () => {
  let message: string
  try {
    mount(<CollapsibleContainer.Collapser />)
  } catch (error) {
    message = error.message
  }
  expect(message).toBe(
    'useCollapsibleContext should only be called within a child of a CollapsibleContainer component.'
    + 'e.g. Group or Box'
  )
})

test('CollapsibleContainer.Content should throw an error when rendered outside a box component', () => {
  let message: string
  try {
    mount(<CollapsibleContainer.Content />)
  } catch (error) {
    message = error.message
  }
  expect(message).toBe(
    'useCollapsibleContext should only be called within a child of a CollapsibleContainer component.'
    + 'e.g. Group or Box'
  )
})

test('When CollapsibleContainer.Collapser gets clicked collapsed is toggled for uncontrolled component', () => {
  const initialCollapsed = false
  let clicked = false
  const container = mount(
    <CollapsibleContainer initialCollapsed={initialCollapsed}>
      <CollapsibleContainer.Collapser />
      <CollapsibleContext.Consumer>
        {(context) => {
          if (!clicked) {
            //  Runs after mount
            expect(context.collapsed).toBe(false)
          } else {
            // Runs after context value changed due to the onclick
            expect(context.collapsed).toBe(true)
          }
          return null
        }}
      </CollapsibleContext.Consumer>
    </CollapsibleContainer>
  )

  const collapser = container.find({ 'data-test': 'container-collapser' })
  clicked = true
  collapser.first().props().onClick()
})

test('collapser shouldn\'t be visible when no props are given', () => {
  const box = mount(
    <CollapsibleContainer>
      <CollapsibleContainer.Collapser />
      <CollapsibleContext.Consumer>
        {(context) => {
          expect(context.collapsed).toBe(false)
          return null
        }}
      </CollapsibleContext.Consumer>
    </CollapsibleContainer>
  )

  const collapser = box.find({ 'data-test': 'container-collapser' }).get(0)
  expect(collapser).not.toBeDefined()
})

test('collapser should be visible when collapsed and onCollapsed are given', () => {
  const collapsed = true
  const box = mount(
    <CollapsibleContainer collapsed={collapsed} onCollapse={jest.fn()}>
      <CollapsibleContainer.Collapser />
      <CollapsibleContext.Consumer>
        {(context) => {
          expect(context.collapsed).toBe(collapsed)
          return null
        }}
      </CollapsibleContext.Consumer>
    </CollapsibleContainer>
  )

  const collapser = box.find({ 'data-test': 'container-collapser' }).get(0)
  expect(collapser).toBeDefined()
})

test('collapser should be visible when initialCollapsed is given', () => {
  const initialCollapsed = false
  const box = mount(
    <CollapsibleContainer initialCollapsed={initialCollapsed}>
      <CollapsibleContainer.Collapser />
      <CollapsibleContext.Consumer>
        {(context) => {
          expect(context.collapsed).toBe(initialCollapsed)
          return null
        }}
      </CollapsibleContext.Consumer>
    </CollapsibleContainer>
  )

  const collapser = box.find({ 'data-test': 'container-collapser' }).get(0)
  expect(collapser).toBeDefined()
})
