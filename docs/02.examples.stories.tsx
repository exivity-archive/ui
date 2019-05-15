import { storiesOf } from '@storybook/react'
import React from 'react'
import { Heading } from '../src/Heading'
import { Dashboard, MasterDetail } from './examples'

storiesOf('docs|Examples', module)
  .add('Dashboard', () => <Dashboard />)
  .add('Master/Detail', () => <MasterDetail />)
  .add('Settings', () => <Heading>Settings</Heading>)
