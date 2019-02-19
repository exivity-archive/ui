import React from 'react'
import { storiesOf } from '@storybook/react'
import { withPropKnobs } from '../../.storybook/withPropKnobs'

import {Component} from './{Component}'

storiesOf('atoms|{Component}', module)
  .add('default', () => withPropKnobs(<{Component} />))
