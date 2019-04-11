import React from 'react'
import { storiesOf } from '@storybook/react'
import { Markdown } from '../Markdown'
import { ensureString } from '../utils'

// @ts-ignore
import * as useStateObject from './docs/useStateObject.md'

storiesOf('helpers|useStateObject', module)
  .add('documentation', () => <Markdown>{ensureString(useStateObject)}</Markdown>)
