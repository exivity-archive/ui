import React from 'react'
import { storiesOf } from '@storybook/react'

import example from './stories/example.md'

import Markdown from './Markdown'

storiesOf('atoms|Markdown', module)
  .add('default', () => <Markdown>{example}</Markdown>)
