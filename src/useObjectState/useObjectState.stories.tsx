import React from 'react'
import { storiesOf } from '@storybook/react'
import { Markdown } from '../Markdown'
import { ensureString } from '../utils'

// @ts-ignore
import * as useObjectState from './docs/useObjectState.md'

storiesOf('helpers|useObjectState', module)
  .add('documentation', () => <Markdown>{ensureString(useObjectState)}</Markdown>)
