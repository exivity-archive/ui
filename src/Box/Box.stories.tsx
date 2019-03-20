import React from 'react'
import Faker from 'faker'
// @ts-ignore
import { storiesOf } from '@storybook/react'

import { Box } from '.'
import { ensureString } from '../utils'
import { Markdown } from '../Markdown'

// @ts-ignore
import * as useCollapsibleContextDocs from '../CollapsibleContainer/docs/useCollapsibleContext.md'

storiesOf('molecules|Box', module)
  .add('default', () => (
    <Box>
      <Box.Bar>Hi</Box.Bar>
      <Box.Content>{Faker.lorem.paragraphs(4)}</Box.Content>
    </Box>
  ))
  .add('flipped', () => (
    <Box>
      <Box.Content>{Faker.lorem.paragraphs(4)}</Box.Content>
      <Box.Bar>Hi</Box.Bar>
    </Box>
  ))
  .add('collapsible', () => (
    <Box initialCollapsed={false}>
      <Box.Bar>Hi</Box.Bar>
      <Box.Content>{Faker.lorem.paragraphs(4)}</Box.Content>
    </Box>
  ))
  .add('flipped collapsible', () => (
    <Box initialCollapsed={false}>
      <Box.Content>{Faker.lorem.paragraphs(4)}</Box.Content>
      <Box.Bar>Hi</Box.Bar>
    </Box>
  ))
  .add('helpers', () => (
    <Markdown>{ensureString(useCollapsibleContextDocs)}</Markdown>
  ))
