import React from 'react'
import { storiesOf } from '@storybook/react'

import {Component} from './{Component}'

storiesOf('atoms|{Component}', module)
  .add('default', () => <{Component} />)
