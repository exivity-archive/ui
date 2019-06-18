import React from 'react'
import { Markdown } from '..'

import { storiesOf } from '@storybook/react'
import { ensureString } from '../utils'
// @ts-ignore
import docs from './docs/useRefDependentSpacing.md'

export default storiesOf('helpers|useRefDependentSpacing', module)
  .add('docs', () => <Markdown>{ensureString(docs)}</Markdown>)
