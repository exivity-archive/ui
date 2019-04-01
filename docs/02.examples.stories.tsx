import { storiesOf } from '@storybook/react'
import React from 'react'
import { Heading } from '../src/Heading'
import { App } from './examples/App'

storiesOf('docs|Examples', module)
  .add('dashboard', () => (
    <App>
      Dashboard
      <div style={{ height: '150vh' }} />
    </App>
  ))
  .add('master/detail', () => <Heading>Master/Detail</Heading>)
  .add('settings', () => <Heading>Settings</Heading>)
