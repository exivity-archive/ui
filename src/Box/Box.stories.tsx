import React from 'react'
import Faker from 'faker'
// @ts-ignore
import { storiesOf } from '@storybook/react'

import { Box } from '.'
import { ensureString } from '../utils'
import { Markdown } from '../Markdown'

// @ts-ignore
import * as CollapsibleContextDocs from '../CollapsibleContainer/docs/CollapsibleContext.md'

storiesOf('molecules|Box', module)
  .add('default', () => (
    <Box>
      <Box.Bar>Notifications</Box.Bar>
      <Box.Content>{Faker.lorem.paragraphs(4)}</Box.Content>
    </Box>
  ))
  .add('collapsible', () => (
    <Box initialCollapsed={false}>
      <Box.Bar>Notifications</Box.Bar>
      <Box.Content>{Faker.lorem.paragraphs(4)}</Box.Content>
    </Box>
  ))
  .add('helpers', () => (
    <Markdown>{ensureString(CollapsibleContextDocs)}</Markdown>
  ))
