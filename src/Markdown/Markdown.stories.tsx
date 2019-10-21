import React from 'react'
import { storiesOf } from '@storybook/react'

import { ensureString } from '../utils'
// @ts-ignore
import * as sample from '../utils/stories/samples/markdown.md'

import { Markdown } from '.'

storiesOf('atoms|Markdown', module)
  .add('default', () => <Markdown>{ensureString(sample)}</Markdown>)
