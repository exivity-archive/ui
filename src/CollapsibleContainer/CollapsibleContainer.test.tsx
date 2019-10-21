import React from 'react'
import { mount } from 'enzyme'

import { CollapsibleContainer } from './CollapsibleContainer'
import { CollapsibleContext } from './helpers'

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

test('collapser should be visible when no props are given', () => {
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

  expect(collapser).toBeDefined()
})

test('collapser shouldn\'t be visible when collapsible is set to false', () => {
  const box = mount(
    <CollapsibleContainer collapsible={false}>
      <CollapsibleContainer.Collapser />
      <CollapsibleContext.Consumer>
        {(context) => {
          expect(context).toBeNull()

          return null
        }}
      </CollapsibleContext.Consumer>
    </CollapsibleContainer>
  )

  const collapser = box.find({ 'data-test': 'container-collapser' }).get(0)

  expect(collapser).not.toBeDefined()
})
