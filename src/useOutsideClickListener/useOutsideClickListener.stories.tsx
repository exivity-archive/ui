import React from 'react'
import { storiesOf } from '@storybook/react'
import { Markdown } from '../Markdown'
import { ensureString } from '../utils'

// @ts-ignore
import * as useOutsideClickListener from './docs/useOutsideClickListener.md'

storiesOf('helpers|useOutsideClickListener', module)
  .add('documentation', () => <Markdown>{ensureString(useOutsideClickListener)}</Markdown>)
