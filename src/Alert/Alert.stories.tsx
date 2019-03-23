import React from 'react'
import { storiesOf } from '@storybook/react'
import { markdown } from '../utils/stories/markdown'
import { Alert } from '.'

storiesOf('atoms|Alert', module)
  .add('overview', markdown(require('./README.md')))
  .add('default', () => <Alert>Something is going on</Alert>)
  .add('success', () => <Alert success>All is well</Alert>)
  .add('danger', () => <Alert danger>Things went south</Alert>)
