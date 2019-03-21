import { storiesOf } from '@storybook/react'
import React from 'react'
import { Heading } from '../src/Heading'
import { App } from './examples/App'

storiesOf('docs|Examples', module)
  .add('Dashboard', () => (
    <App>
      Dashboard
      <div style={{ height: '150vh' }} />
    </App>
  ))
  .add('Master/Detail', () => <Heading>Master/Detail</Heading>)
  .add('Settings', () => <Heading>Settings</Heading>)
