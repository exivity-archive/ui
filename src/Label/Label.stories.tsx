import React from 'react'
import { Label } from '.'

// @ts-ignore
import { storiesOf } from '@storybook/react'

storiesOf('atoms|Label', module)
  .add('default', () => <Label>Default label</Label>)
  .add('secondary', () => <Label secondary>Secondary label</Label>)
  .add('nested', () => <Label>Primary label<Label>Secondary label</Label></Label>)
