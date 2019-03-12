import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { Tabs } from '.'

storiesOf('molecules|Tabs', module)
  .add('default', () =>
    (
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
  )
