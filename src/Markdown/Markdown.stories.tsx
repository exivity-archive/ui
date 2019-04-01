import React from 'react'
import { storiesOf } from '@storybook/react'

import { Markdown } from '.'
import { ensureString } from '../utils'
// @ts-ignore
import * as sample from '../utils/stories/samples/markdown.md'

storiesOf('atoms|Markdown', module)
  .add('default', () => <Markdown>{ensureString(sample)}</Markdown>)
