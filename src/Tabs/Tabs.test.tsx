import React from 'react'
import { mount } from 'enzyme'
import { Tabs } from './Tabs'
import { enzymeFind } from 'styled-components/test-utils'
import { act } from 'react-test-renderer'

test('it throws an error when a TabList component is not rendered within a Tabs component', () => {
  try {
    mount(
      <Tabs.TabList >
        <Tabs.Tab>Tab one</Tabs.Tab>
        <Tabs.Tab>Tab two</Tabs.Tab>
        <Tabs.Tab>Tab three</Tabs.Tab>
      </Tabs.TabList >
    )
  } catch (error) {
    expect(error.message).toBe('Tabs compound components must be rendered within the Tabs component')
  }
})

test('it throws an error when a TabPanels component is not rendered within a Tabs component', () => {
  try {
    mount(
      <Tabs.TabPanels>
        <Tabs.TabPanel></Tabs.TabPanel>
        <Tabs.TabPanel></Tabs.TabPanel>
      </Tabs.TabPanels>
    )
  } catch (error) {
    expect(error.message).toBe('Tabs compound components must be rendered within the Tabs component')
  }
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

  // focus on tabs so navigation becomes possible
  enzymeFind(tabs, Tabs.Tab).first().props().onFocus()
  tabs.update()

  const testArrowNavigation = ({ key, panel }: Test) => {
    enzymeFind(tabs, Tabs.Tab).first().props().onKeyDown({ key })
    tabs.update()
    expect(
      tabs.containsMatchingElement(
        <div>{panel}</div>
      )
    ).toBeTruthy()
  }

  const tests: Test[] = [
    { key: 'ArrowRight', panel: 'Panel two' },
    { key: 'ArrowRight', panel: 'Panel three' },
    { key: 'ArrowRight', panel: 'Panel three' },
    { key: 'ArrowLeft', panel: 'Panel two' },
    { key: 'ArrowLeft', panel: 'Panel one' },
    { key: 'ArrowLeft', panel: 'Panel one' }
  ]

  tests.forEach(test => testArrowNavigation(test))
})
