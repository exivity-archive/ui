import React from 'react'
import { storiesOf } from '@storybook/react'
import { Heading } from '../src/Heading'

storiesOf('docs|Examples', module)
  .add('Dashboard', () => <Heading>Dashboard</Heading>)
  .add('Master/Detail', () => <Heading>Master/Detail</Heading>)
  .add('Settings', () => <Heading>Settings</Heading>)
