import { storiesOf } from '@storybook/react'
import React from 'react'
import { Heading } from '../src/Heading'
import { Dashboard, MasterDetail } from './examples'

storiesOf('docs|Examples', module)
  .add('dashboard', () => <Dashboard />)
  .add('master/detail', () => <MasterDetail />)
  .add('settings', () => <Heading>Settings</Heading>)
