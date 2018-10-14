import React from 'react'
import { storiesOf } from '@storybook/react'

import Alert from './Alert'

storiesOf('atoms|Alert', module)
  .add('default', () => <Alert>Warning!</Alert>)
  .add('danger', () => <Alert palette='danger'>Danger!</Alert>)
  .add('success', () => <Alert palette='success'>Success!</Alert>)
