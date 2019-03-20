import React from 'react'
import { shallow, mount } from 'enzyme'

import { Group } from '.'
import { GroupContext } from './helpers'

test('group collapser should throw an error when rendered outside a box component', () => {
  let message: string
  try {
    mount(<Group.Collapser></Group.Collapser>)
  } catch (error) {
    message = error.message
  }
  expect(message).toBe('useGroupContext should only be called within a child of a Group component')
})

test('group content should throw an error when rendered outside a box component', () => {
  let message: string
  try {
    mount(<Group.Content></Group.Content>)
  } catch (error) {
    message = error.message
  }
  expect(message).toBe('useGroupContext should only be called within a child of a Group component')
})

test('When group gets a collapsed prop it requires a toggleCollapse prop', () => {
  let message: string
  try {
    shallow(<Group collapsed={true}></Group>)
  } catch (error) {
    message = error.message
  }
  expect(message).toBeDefined()
  expect(message).toBe('The controlled version of this component should take in a toggleCollapse prop')
})

test('When GroupCollapser gets clicked collapsed is toggled for uncontrolled component', () => {
  const initialCollapsed = false
  let clicked = false
  const group = mount(
    <Group initialCollapsed={initialCollapsed}>
      <Group.Header>
        <Group.Collapser />
        <GroupContext.Consumer>
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
        </GroupContext.Consumer>
      </Group.Header>
    </Group>
  )

  const collapser = group.find({ 'data-test': 'group-collapser' })
  clicked = true
  collapser.first().props().onClick()
})
