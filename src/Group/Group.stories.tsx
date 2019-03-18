import React from 'react'
import Faker from 'faker'
// @ts-ignore
import { storiesOf } from '@storybook/react'

import { Group } from '.'
import { Markdown } from '../Markdown'
import { ensureString } from '../utils'

import * as useGroupContextDocs from './docs/useGroupContext.md'

storiesOf('molecules|Group', module)
  .add('default', () => (
    <Group>
      <Group.Header>
        <Group.Title>Configuration</Group.Title>
        <Group.Separator />
        <Group.Collapser />
      </Group.Header>
      <Group.Content>
        {Faker.lorem.paragraphs(4)}
      </Group.Content>
    </Group>
  ))
  .add('x-inverted', () => (
    <Group>
      <Group.Header>
        <Group.Collapser />
        <Group.Separator />
        <Group.Title>Configuration</Group.Title>
      </Group.Header>
      <Group.Content>
        {Faker.lorem.paragraphs(4)}
      </Group.Content>
    </Group>
  ))
  .add('y-inverted', () => (
    <Group>
      <Group.Content>
        {Faker.lorem.paragraphs(4)}
      </Group.Content>
      <Group.Header>
        <Group.Title>Configuration</Group.Title>
        <Group.Separator />
        <Group.Collapser />
      </Group.Header>
    </Group>
  ))
  .add('xy-inverted', () => (
    <Group>
      <Group.Content>
        {Faker.lorem.paragraphs(4)}
      </Group.Content>
      <Group.Header>
        <Group.Collapser />
        <Group.Separator />
        <Group.Title>Configuration</Group.Title>
      </Group.Header>
    </Group>
  ))
  .add('useGroupContext', () => (
    <Markdown>{ensureString(useGroupContextDocs)}</Markdown>
  ))
