import React from 'react'
import Faker from 'faker'
import { storiesOf } from '@storybook/react'
import { MdAccountBox, MdNotifications, MdMail } from 'react-icons/md'

import { Markdown } from '../Markdown'
import { ensureString } from '../utils'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import * as CollapsibleContextDocs from '../CollapsibleContainer/docs/CollapsibleContext.md'

import { Group } from '.'

storiesOf('molecules|Group', module)
  .add('default', () => (
    <Group header='Global options'>
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
  .add('with icons', () => (
    <Group>
      <Group.Header>
        <Group.Title>Configuration</Group.Title>
        <Group.Separator />
        <Group.Separator />
        <Group.Icon><MdMail /></Group.Icon>
        <Group.Icon><MdNotifications /></Group.Icon>
        <Group.Icon><MdAccountBox /></Group.Icon>
        <Group.Separator />
      </Group.Header>
      <Group.Content>
        {Faker.lorem.paragraphs(4)}
      </Group.Content>
    </Group>
  ))
  .add('helpers', () => (
    <Markdown>{ensureString(CollapsibleContextDocs)}</Markdown>
  ))
