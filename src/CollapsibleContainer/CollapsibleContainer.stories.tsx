import React from 'react'
import Faker from 'faker'
// @ts-ignore
import { storiesOf } from '@storybook/react'

import { CollapsibleContainer } from '.'
import { Markdown } from '../Markdown'
import { ensureString } from '../utils'

// @ts-ignore
import * as useCollapsibleContextDocs from './docs/useCollapsibleContext.md'

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
