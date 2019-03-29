import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { Tabs } from '.'
import { Markdown } from '../Markdown'
import { ensureString } from '../utils'

// @ts-ignore
import * as useTabsContextDocs from './docs/useTabsContext.md'

storiesOf('molecules|Tabs', module)
  .add('default', () => (
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
  ))
  .add('initialActiveIndex', () => (
    <Tabs initialActiveIndex={2}>
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
  ))
  .add('disabled', () => (
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
  ))
  .add('flipped', () => (
    <Tabs>
      <Tabs.TabPanels>
        <Tabs.TabPanel>Panel one</Tabs.TabPanel>
        <Tabs.TabPanel>Panel two</Tabs.TabPanel>
        <Tabs.TabPanel>Panel three</Tabs.TabPanel>
      </Tabs.TabPanels>
      <Tabs.TabList>
        <Tabs.Tab>Tab one</Tabs.Tab>
        <Tabs.Tab>Tab two</Tabs.Tab>
        <Tabs.Tab>Tab three</Tabs.Tab>
      </Tabs.TabList>
    </Tabs>
  ))
  .add('animate all panels', () => (
    <Tabs>
      <Tabs.TabList>
        <Tabs.Tab>Tab one</Tabs.Tab>
        <Tabs.Tab>Tab two</Tabs.Tab>
        <Tabs.Tab>Tab three</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanels animated>
        <Tabs.TabPanel>Panel one</Tabs.TabPanel>
        <Tabs.TabPanel>Panel two</Tabs.TabPanel>
        <Tabs.TabPanel>Panel three</Tabs.TabPanel>
      </Tabs.TabPanels>
    </Tabs>
  ))
  .add('animate single panel', () => (
    <Tabs>
      <Tabs.TabList>
        <Tabs.Tab>Tab one</Tabs.Tab>
        <Tabs.Tab>Animated panel</Tabs.Tab>
        <Tabs.Tab>Tab three</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanels>
        <Tabs.TabPanel>Panel one</Tabs.TabPanel>
        <Tabs.TabPanel animated>Animated!</Tabs.TabPanel>
        <Tabs.TabPanel>Panel three</Tabs.TabPanel>
      </Tabs.TabPanels>
    </Tabs>
  ))
  .add('helpers', () => (
    <Markdown>{ensureString(useTabsContextDocs)}</Markdown>
  ))
