import React from 'react'
import { storiesOf } from '@storybook/react'

import { Label } from '.'

storiesOf('atoms|Label', module)
  .add('default', () => <Label>Default label</Label>)
  .add('secondary', () => <Label secondary>Secondary label</Label>)
  .add('nested', () => <Label>Primary label<Label>Secondary label</Label></Label>)
