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
  .add('helpers', () => (
    <Markdown>{ensureString(useTabsContextDocs)}</Markdown>
  ))
