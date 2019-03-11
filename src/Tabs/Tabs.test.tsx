import React from 'react'
import { mount } from 'enzyme'
import { Tabs } from './Tabs'

test('it throws an error when a TabList component is not rendered within a Tabs component', () => {
  const mountTabList = () => {
    mount(<Tabs.TabList>Test</Tabs.TabList>)
  }
  expect(mountTabList).toThrow()
})

test('it throws an error when a TabPanels component is not rendered within a Tabs component', () => {
  const mountTabPanels = () => {
    mount(<Tabs.TabPanels>h<Tabs.TabPanel></Tabs.TabPanel></Tabs.TabPanels>)
  }
  expect(mountTabPanels).toThrow()
})
