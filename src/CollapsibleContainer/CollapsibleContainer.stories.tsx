import React from 'react'
import Faker from 'faker'
import { storiesOf } from '@storybook/react'

import { Markdown } from '../Markdown'
import { ensureString } from '../utils'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import * as useCollapsibleContextDocs from './docs/CollapsibleContext.md'

import { CollapsibleContainer } from '.'

storiesOf('molecules|CollapsibleContainer', module)
  .add('default', () => (
    <CollapsibleContainer>
      <CollapsibleContainer.Collapser />
      <CollapsibleContainer.Content>{Faker.lorem.paragraphs(4)}</CollapsibleContainer.Content>
    </CollapsibleContainer>
  ))
  .add('helpers', () => (
    <Markdown>{ensureString(useCollapsibleContextDocs)}</Markdown>
  ))
