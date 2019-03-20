import React from 'react'
import Faker from 'faker'
// @ts-ignore
import { storiesOf } from '@storybook/react'

import { Box } from '.'
import { Markdown } from '../'
import { ensureString } from '../utils'

// @ts-ignore
import * as useBoxContextDocs from './docs/useBoxContext.md'

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
    <Box initialCollapsed>
      <Box.Content>{Faker.lorem.paragraphs(4)}</Box.Content>
      <Box.Bar>Hi</Box.Bar>
    </Box>
  ))
  .add('useBoxContext', () => (
    <Markdown>{ensureString(useBoxContextDocs)}</Markdown>
  ))
