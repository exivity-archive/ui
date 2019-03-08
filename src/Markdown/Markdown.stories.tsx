import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'

import { Markdown } from '.'
// @ts-ignore
import * as sample from '../utils/stories/samples/markdown.md'

storiesOf('atoms|Markdown', module)
  .add('default', () => <Markdown>{sample}</Markdown>)
