import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { Markdown } from '../src/Markdown'
import { MaxWidth } from '../src/utils/tests/decorators/MaxWidth'

// @ts-ignore
import * as readme from '../README.md'
// @ts-ignore
import * as installation from './guide/installation.md'
// @ts-ignore
import * as usage from './guide/usage.md'
// @ts-ignore
import * as development from './guide/development.md'

storiesOf('docs|Guide 👋', module)
  .addDecorator(MaxWidth)
  .add('Introduction', () => <Markdown>{readme}</Markdown>)
  .add('Installation', () => <Markdown>{installation}</Markdown>)
  .add('Usage', () => <Markdown>{usage}</Markdown>)
  .add('Development', () => <Markdown>{development}</Markdown>)
