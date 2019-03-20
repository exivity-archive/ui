import React from 'react'
import { mount } from 'enzyme'

import { Box } from './Box'
import { BoxContext } from './helpers'

test('collapser shouldn\'t be visible when no props are given', () => {
  const box = mount(
    <Box><Box.Bar />
      {(context) => {
        expect(context.collapsed).toBe(false)
        return null
      }}</Box>
  )

  const collapser = box.find({ 'data-test': 'box-collapser' }).get(0)
  expect(collapser).not.toBeDefined()
})

test('collapser should be visible when collapsed and onCollapsed are given', () => {
  const collapsed = true
  const box = mount(
    <Box collapsed={collapsed} onCollapse={jest.fn()}><Box.Bar />
      {(context) => {
        expect(context.collapsed).toBe(collapsed)
        return null
      }}</Box>
  )

  const collapser = box.find({ 'data-test': 'box-collapser' }).get(0)
  expect(collapser).toBeDefined()
})

test('collapser should be visible when initialCollapsed is given', () => {
  const box = mount(
    <Box initialCollapsed={false}><Box.Bar />
      <BoxContext.Consumer>
        {(context) => {
          expect(context.collapsed).toBe(false)
          return null
        }}
      </BoxContext.Consumer></Box>
  )

  const collapser = box.find({ 'data-test': 'box-collapser' }).get(0)
  expect(collapser).toBeDefined()
})

test('with collapsible initializing to true, the box collapser should disappear when it is set to false', () => {
  let changedCollapsible = false
  const box = mount(
    <Box initialCollapsed={false}><Box.Bar />
      <BoxContext.Consumer>
        {(context) => {
          if (!changedCollapsible) {
            expect(context.collapsible).toBe(true)
            context.setCollapsible(false)
            changedCollapsible = true
          }
          return null
        }}
      </BoxContext.Consumer></Box>
  )

  const collapser = box.find({ 'data-test': 'box-collapser' }).get(0)
  expect(collapser).not.toBeDefined()
})

test('with collapsible initializing to true, the box collapser should appear when it is set to true', () => {
  let changedCollapsible = false
  const box = mount(
    <Box><Box.Bar />
      <BoxContext.Consumer>
        {(context) => {
          if (!changedCollapsible) {
            expect(context.collapsible).toBe(false)
            context.setCollapsible(true)
            changedCollapsible = true
          }
          return null
        }}
      </BoxContext.Consumer></Box>
  )

  const collapser = box.find({ 'data-test': 'box-collapser' }).get(0)
  expect(collapser).toBeDefined()
})

test('When BoxCollapser gets clicked collapsed is toggled for uncontrolled component', () => {
  const initialCollapsed = false
  let clicked = false
  const box = mount(
    <Box initialCollapsed={initialCollapsed}>
      <Box.Bar />
      <BoxContext.Consumer>
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
      </BoxContext.Consumer>
    </Box>
  )

  const collapser = box.find({ 'data-test': 'box-collapser' })
  clicked = true
  collapser.first().props().onClick()
})
