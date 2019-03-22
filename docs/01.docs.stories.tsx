import React from 'react'
import { storiesOf } from '@storybook/react'
import { Markdown } from '../src/Markdown'
import { ensureString } from '../src/utils'
import { markdown } from '../src/utils/stories/markdown'
import { MaxWidth } from '../src/utils/tests/decorators/MaxWidth'

// @ts-ignore
import * as installation from './guide/installation.md'
// @ts-ignore
import * as usage from './guide/usage.md'
// @ts-ignore
import * as development from './guide/development.md'

storiesOf('docs|Guide 👋', module)
  .addDecorator(MaxWidth)
  // Check typeof readme because README.md is not imported from Jest
  // (storyshots) and triggers a React warning
  .add('Introduction', markdown(require('../README.md')))
  .add('Installation', () => <Markdown>{ensureString(installation)}</Markdown>)
  .add('Usage', () => <Markdown>{ensureString(usage)}</Markdown>)
  .add('Development', () => <Markdown>{ensureString(development)}</Markdown>)
