import React from 'react'
import { mount, ReactWrapper } from 'enzyme'

import { Tabs } from './Tabs'

test('it throws an error when a TabList component is not rendered within a Tabs component', () => {
  try {
    mount(
      <Tabs.TabList>
        <Tabs.Tab>Tab one</Tabs.Tab>
        <Tabs.Tab>Tab two</Tabs.Tab>
        <Tabs.Tab>Tab three</Tabs.Tab>
      </Tabs.TabList>
    )
  } catch (error) {
    expect(error.message).toBe(
      'useTabsContext should only be called within a child of a Tabs component'
    )
  }
})

test(
  'it throws an error when a TabPanels component is not rendered within a Tabs component',
  () => {
    try {
      mount(
        <Tabs.TabPanels>
          <Tabs.TabPanel />
          <Tabs.TabPanel />
        </Tabs.TabPanels>
      )
    } catch (error) {
      expect(error.message).toBe(
        'useTabsContext should only be called within a child of a Tabs component'
      )
    }
  })

interface KeyboardNavigationTest {
  key: 'ArrowLeft' | 'ArrowRight'
  panel: 'Panel one' | 'Panel two' | 'Panel three'
}

const testArrowNavigation = (tabs: ReactWrapper, { key, panel }: KeyboardNavigationTest) => {
  tabs.find({ 'data-test': 'tabs-tab' }).first().props().onKeyDown({ key })
  tabs.update()

  expect(tabs.find({ 'data-test': 'tabs-panel' }).get(0).props.children === panel)
    .toBe(true)
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

  const tests: KeyboardNavigationTest[] = [
    { key: 'ArrowRight', panel: 'Panel two' },
    { key: 'ArrowRight', panel: 'Panel three' },
    { key: 'ArrowRight', panel: 'Panel one' },
    { key: 'ArrowLeft', panel: 'Panel three' },
    { key: 'ArrowLeft', panel: 'Panel two' },
    { key: 'ArrowLeft', panel: 'Panel one' }
  ]

  // focus on tabs so navigation becomes possible
  tabs.find({ 'data-test': 'tabs-tab' }).first().props().onFocus()
  tabs.update()

  tests.forEach(test => testArrowNavigation(tabs, test))
})

test('when blurred, arrow navigation should not work anymore', () => {
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
  const tab = tabs.find({ 'data-test': 'tabs-tab' }).first()

  // focus on tabs so navigation becomes possible
  tab.props().onFocus()
  tabs.update()

  const testsWhenFocussed: KeyboardNavigationTest[] = [
    { key: 'ArrowRight', panel: 'Panel two' },
    { key: 'ArrowRight', panel: 'Panel three' }
  ]

  testsWhenFocussed.forEach(test => testArrowNavigation(tabs, test))

  // blur tabs so navigation doesn't work anymore
  tab.props().onBlur()
  tabs.update()

  const testsWhenUnfocussed: KeyboardNavigationTest[] = [
    { key: 'ArrowLeft', panel: 'Panel three' },
    { key: 'ArrowLeft', panel: 'Panel three' }
  ]

  testsWhenUnfocussed.forEach(test => testArrowNavigation(tabs, test))
})

test('when arrow navigating, disabled tabs should be skipped', () => {
  const tabs = mount(
    <Tabs>
      <Tabs.TabList>
        <Tabs.Tab>Tab one</Tabs.Tab>
        <Tabs.Tab disabled>Tab two</Tabs.Tab>
        <Tabs.Tab>Tab three</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanels>
        <Tabs.TabPanel>Panel one</Tabs.TabPanel>
        <Tabs.TabPanel>Panel two</Tabs.TabPanel>
        <Tabs.TabPanel>Panel three</Tabs.TabPanel>
      </Tabs.TabPanels>
    </Tabs>
  )
  const tab = tabs.find({ 'data-test': 'tabs-tab' }).first()

  // focus on tabs so navigation becomes possible
  tab.props().onFocus()
  tabs.update()

  const tests: KeyboardNavigationTest[] = [
    { key: 'ArrowRight', panel: 'Panel three' },
    { key: 'ArrowLeft', panel: 'Panel one' }
  ]

  tests.forEach(test => testArrowNavigation(tabs, test))
})

interface ClickNavigationTest {
  tabIndex: 0 | 1 | 2
  panel: 'Panel one' | 'Panel two' | 'Panel three'
}

const testClickNavigation = (tabs: ReactWrapper, { tabIndex, panel }: ClickNavigationTest) => {
  tabs.find({ 'data-test': 'tabs-tab' }).get((tabIndex * 3) + 2).props.onClick()
  tabs.update()

  expect(
    tabs.find({ 'data-test': 'tabs-panel' }).get(tabIndex).props.children === panel
  ).toBe(true)
}

test('you can navigate to a tab by clicking on it', () => {
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

  const tests: ClickNavigationTest[] = [
    { tabIndex: 2, panel: 'Panel three' },
    { tabIndex: 0, panel: 'Panel one' },
    { tabIndex: 1, panel: 'Panel two' }
  ]

  tests.forEach(test => testClickNavigation(tabs, test))
})

test('you can\'t navigate to a tab by clicking on it when it\'s disabled', () => {
  const tabs = mount(
    <Tabs>
      <Tabs.TabList>
        <Tabs.Tab>Tab one</Tabs.Tab>
        <Tabs.Tab disabled>Tab two</Tabs.Tab>
        <Tabs.Tab>Tab three</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanels>
        <Tabs.TabPanel>Panel one</Tabs.TabPanel>
        <Tabs.TabPanel>Panel two</Tabs.TabPanel>
        <Tabs.TabPanel>Panel three</Tabs.TabPanel>
      </Tabs.TabPanels>
    </Tabs>
  )

  interface ClickNavigationTest {
    tabIndex: 0 | 1 | 2
    panel: 'Panel one' | 'Panel two' | 'Panel three'
  }

  const tests: ClickNavigationTest[] = [
    { tabIndex: 0, panel: 'Panel one' },
    { tabIndex: 1, panel: 'Panel one' }
  ]

  tests.forEach(test => testClickNavigation(tabs, test))
})
