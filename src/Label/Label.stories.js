import React from 'react'
import Label from './Label'

import { storiesOf } from '@storybook/react'

export default storiesOf('atoms|Label', module)
  .add('default', () => <Label>Default label</Label>)
  .add('secondary', () => <Label secondary>Secondary label</Label>)
  .add('Nested', () => <Label>Primary label<Label>Secondary label</Label></Label>)
