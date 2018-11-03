import React from 'react'
import { storiesOf } from '@storybook/react'
import { withPropKnobs } from '../../docs/utils/withPropKnobs'

import Alert from './Alert'

storiesOf('atoms|Alert', module)
  .add('default', () => withPropKnobs(<Alert>Could not load all requested information at this time, please try again later.</Alert>))
  .add('danger', () => <Alert danger>Something went utterly wrong while loading your report.</Alert>)
  .add('success', () => <Alert success>Synchronized all your data.</Alert>)
