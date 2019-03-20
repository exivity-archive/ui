import React from 'react'
import { storiesOf } from '@storybook/react'
import { Markdown } from '../Markdown'
import { ensureString } from '../utils'

// @ts-ignore
import * as useIsUncontrolled from './docs/useIsUncontrolled.md'

storiesOf('helpers|useIsControlled', module).add('default', () => <Markdown>{ensureString(useIsUncontrolled)}</Markdown>)
