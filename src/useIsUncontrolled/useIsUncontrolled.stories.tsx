import React from 'react'
import { storiesOf } from '@storybook/react'

import { Markdown } from '../Markdown'
import { ensureString } from '../utils'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import * as useIsUncontrolled from './docs/useIsUncontrolled.md'

storiesOf('helpers|useIsUncontrolled', module)
  .add('documentation', () => <Markdown>{ensureString(useIsUncontrolled)}</Markdown>)
