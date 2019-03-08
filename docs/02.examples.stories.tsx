import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { Heading } from '../src/Heading'

storiesOf('docs|Examples', module)
  .add('Kitchensink', () => <Heading>Kitchensink</Heading>)
  .add('App', () => <Heading>App</Heading>)
