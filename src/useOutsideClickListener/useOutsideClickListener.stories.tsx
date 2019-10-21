import React from 'react'
import { storiesOf } from '@storybook/react'

import { Markdown } from '../Markdown'
import { ensureString } from '../utils'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import * as useOutsideClickListener from './docs/useOutsideClickListener.md'

storiesOf('helpers|useOutsideClickListener', module)
  .add('documentation', () => <Markdown>{ensureString(useOutsideClickListener)}</Markdown>)
