import React from 'react'
import { storiesOf } from '@storybook/react'

import readme from '../README.md'
import { maxWidth } from './utils'

import Markdown from '../src/Markdown/Markdown'

storiesOf('Docs', module)
  .addDecorator(maxWidth)
  .add('Introduction', () => <Markdown>{readme}</Markdown>)
