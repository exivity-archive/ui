import React from 'react'
import { mount } from 'enzyme'

import { Tabs } from './Tabs'
import { useTabsContext } from './helpers'

const TabsContextConsumer = () => {
  const context = useTabsContext()
  return null
}

test('it throws an error when a TabList component is not rendered within a Tabs component', () => {
  let message: string
  try {
    mount(<TabsContextConsumer />)
  } catch (err) {
    message = err.message
  }

  expect(message).toBe('useTabsContext should only be called within a child of a Tabs component')
})

test(
  'it doesn\'t throw an error when a TabPanels component is rendered within a Tabs component',
  () => {
    let error: Error
    try {
      mount(
        <Tabs>
          <TabsContextConsumer />
        </Tabs>
      )
    } catch (err) {
      error = err
    }

    expect(error).toBeUndefined()
  })
