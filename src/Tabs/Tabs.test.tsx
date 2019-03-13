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

  interface KeyboardNavigationTest {
    key: 'ArrowLeft' | 'ArrowRight'
    panel: 'Panel one' | 'Panel two' | 'Panel three'
  }

  const testArrowNavigation = ({ key, panel }: KeyboardNavigationTest) => {
    enzymeFind(tabs, Tabs.Tab).first().props().onKeyDown({ key })
    tabs.update()
    expect(
      tabs.containsMatchingElement(
        <div>{panel}</div>
      )
    ).toBeTruthy()
  }

  const tests: KeyboardNavigationTest[] = [
    { key: 'ArrowRight', panel: 'Panel two' },
    { key: 'ArrowRight', panel: 'Panel three' },
    { key: 'ArrowRight', panel: 'Panel three' },
    { key: 'ArrowLeft', panel: 'Panel two' },
    { key: 'ArrowLeft', panel: 'Panel one' },
    { key: 'ArrowLeft', panel: 'Panel one' }
  ]

  // focus on tabs so navigation becomes possible
  enzymeFind(tabs, Tabs.Tab).first().props().onFocus()
  tabs.update()

  tests.forEach(test => testArrowNavigation(test))
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
  const tab = enzymeFind(tabs, Tabs.Tab).first()

  interface KeyboardNavigationTest {
    key: 'ArrowLeft' | 'ArrowRight'
    panel: 'Panel one' | 'Panel two' | 'Panel three'
  }

  const testArrowNavigation = ({ key, panel }: KeyboardNavigationTest) => {
    enzymeFind(tabs, Tabs.Tab).first().props().onKeyDown({ key })
    tabs.update()
    expect(
      tabs.containsMatchingElement(
        <div>{panel}</div>
      )
    ).toBeTruthy()
  }

  // focus on tabs so navigation becomes possible
  tab.props().onFocus()
  tabs.update()

  const testsWhenFocussed: KeyboardNavigationTest[] = [
    { key: 'ArrowRight', panel: 'Panel two' },
    { key: 'ArrowRight', panel: 'Panel three' }
  ]

  testsWhenFocussed.forEach(test => testArrowNavigation(test))

  // blur tabs so navigation doesn't work anymore
  tab.props().onBlur()
  tabs.update()

  const testsWhenUnfocussed: KeyboardNavigationTest[] = [
    { key: 'ArrowLeft', panel: 'Panel three' },
    { key: 'ArrowLeft', panel: 'Panel three' }
  ]

  testsWhenUnfocussed.forEach(test => testArrowNavigation(test))
})

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

  interface ClickNavigationTest {
    tabIndex: 0 | 1 | 2
    panel: 'Panel one' | 'Panel two' | 'Panel three'
  }

  const testClickNavigation = ({ tabIndex, panel }: ClickNavigationTest) => {
    enzymeFind(tabs, Tabs.Tab).get(tabIndex).props.onClick()
    tabs.update()
    expect(
      tabs.containsMatchingElement(
        <div>{panel}</div>
      )
    ).toBeTruthy()
  }

  const tests: ClickNavigationTest[] = [
    { tabIndex: 2, panel: 'Panel three' },
    { tabIndex: 0, panel: 'Panel one' },
    { tabIndex: 1, panel: 'Panel two' }
  ]

  // focus on tabs so navigation becomes possible
  enzymeFind(tabs, Tabs.Tab).first().props().onFocus()
  tabs.update()

  tests.forEach(test => testClickNavigation(test))
})
