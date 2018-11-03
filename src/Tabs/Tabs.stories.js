import React from 'react'
import { storiesOf } from '@storybook/react'
import { Block } from 'reakit'

import sample1 from '../../docs/examples/text.md'
import sample2 from '../../docs/examples/markdown.md'

import Tabs from './Tabs'
import Markdown from '../Markdown'

const content1 = <Markdown>{sample1}</Markdown>
const content2 = <Markdown>{sample2}</Markdown>

storiesOf('molecules|Tab', module)
  .add('default', () => <Tabs.Container>
    {tabs => (
      <Block>
        <Tabs>
          <Tabs.Tab tab='first' {...tabs}>First tab</Tabs.Tab>
          <Tabs.Tab tab='second' {...tabs}>Second tab</Tabs.Tab>
        </Tabs>
        <Tabs.Panel tab='first' {...tabs}>{content1}</Tabs.Panel>
        <Tabs.Panel tab='second' {...tabs}>{content2}</Tabs.Panel>
      </Block>
    )}
  </Tabs.Container>)
  .add('active', () => <Tabs.Container initialState={{ current: 1 }}>
    {tabs => (
      <Block>
        <Tabs>
          <Tabs.Tab tab='first' {...tabs}>First tab</Tabs.Tab>
          <Tabs.Tab tab='second' {...tabs}>Second tab</Tabs.Tab>
        </Tabs>
        <Tabs.Panel tab='first' {...tabs}>{content1}</Tabs.Panel>
        <Tabs.Panel tab='second' {...tabs}>{content2}</Tabs.Panel>
      </Block>
    )}
  </Tabs.Container>)
  .add('palette', () => <Tabs.Container>
    {tabs => (
      <Block>
        <Tabs palette='success' tone={0}>
          <Tabs.Tab tab='first' {...tabs}>First tab</Tabs.Tab>
          <Tabs.Tab tab='second' {...tabs}>Second tab</Tabs.Tab>
          <Tabs.Tab palette='danger' tab='errors' {...tabs}>Errors</Tabs.Tab>
        </Tabs>
        <Tabs.Panel tab='first' {...tabs}>{content1}</Tabs.Panel>
        <Tabs.Panel tab='second' {...tabs}>{content2}</Tabs.Panel>
        <Tabs.Panel tab='errors' {...tabs}>Errors</Tabs.Panel>
      </Block>
    )}
  </Tabs.Container>)
