import React from 'react'
import { storiesOf } from '@storybook/react'

import readme from '../../README.md'

import Markdown from './Markdown'

storiesOf('atoms|Markdown', module)
  .add('default', () => <Markdown>{readme}</Markdown>)
