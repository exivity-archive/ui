import React from 'react'
import { storiesOf } from '@storybook/react'

import { Alert } from '.'

storiesOf('atoms|Alert', module)
  .add('default', () => <Alert>Something is going on</Alert>)
  .add('success', () => <Alert success>All is well</Alert>)
  .add('danger', () => <Alert danger>Things went south</Alert>)
