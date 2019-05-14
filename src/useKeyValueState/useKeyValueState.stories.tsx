import React from 'react'
import { storiesOf } from '@storybook/react'
import { Markdown } from '../Markdown'
import { ensureString } from '../utils'

// @ts-ignore
import * as useKeyValueState from './docs/useKeyValueState.md'

storiesOf('helpers|useKeyValueState', module)
  .add('documentation', () => <Markdown>{ensureString(useKeyValueState)}</Markdown>)
