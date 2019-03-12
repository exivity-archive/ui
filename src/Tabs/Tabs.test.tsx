import React from 'react'
import { mount } from 'enzyme'
import { Tabs } from './Tabs'

test('it throws an error when a TabList component is not rendered within a Tabs component', () => {
  const mountTabList = () => {
    mount(
      <Tabs.TabList >
        <Tabs.Tab>Tab one</Tabs.Tab>
        <Tabs.Tab>Tab two</Tabs.Tab>
        <Tabs.Tab>Tab three</Tabs.Tab>
      </Tabs.TabList >
    )
  }
  expect(mountTabList).toThrow()
})

test('it throws an error when a TabPanels component is not rendered within a Tabs component', () => {
  const mountTabPanels = () => {
    mount(
      <Tabs.TabPanels>
        <Tabs.TabPanel></Tabs.TabPanel>
        <Tabs.TabPanel></Tabs.TabPanel>
      </Tabs.TabPanels>
    )
  }
  expect(mountTabPanels).toThrow()
})

type Key = 'ArrowLeft' | 'ArrowRight'
type Panel = 'Panel one' | 'Panel two' | 'Panel three'

interface Test {
  key: Key
  panel: Panel
}

test('when focussed on a tab you can use arrows to navigate', () => {
  const tabs = mount(
    <Tabs>
      <Tabs.TabList>
        <Tabs.Tab>Tab one</Tabs.Tab>
        <Tabs.Tab>Tab two</Tabs.Tab>
        <Tabs.Tab>Tab three</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanels>
        <Tabs.TabPanel>Panel one</Tabs.TabPanel>
        <Tabs.TabPanel>Panel two</Tabs.TabPanel>
        <Tabs.TabPanel>Panel three</Tabs.TabPanel>
      </Tabs.TabPanels>
    </Tabs>
  )

  const tab = tabs.find(Tabs.Tab)

  // focus on tabs so navigation becomes possible
  tab.first().simulate('click')

  const getCurrentTabPanelContent = () => {
    return tabs.find({ 'data-test': 'tab-panel' }).get(0).props.children.props.children
  }

  const testArrowNavigation = ({ key, panel }: Test) => {
    tabs.first().simulate('keydown', { key })
    expect(
      tabs.containsMatchingElement(
        <div>{panel}</div>
      )
    ).toBeTruthy()
  }

  const tests: Test[] = [
    { key: 'ArrowRight', panel: 'Panel one' }
    //   { key: 'ArrowRight', panel: 'Panel three' },
    //   { key: 'ArrowRight', panel: 'Panel three' },
    //   { key: 'ArrowLeft', panel: 'Panel two' },
    //   { key: 'ArrowLeft', panel: 'Panel one' },
    //   { key: 'ArrowLeft', panel: 'Panel one' }
  ]

  tests.forEach(test => testArrowNavigation(test))
})
