import React from 'react'
import { storiesOf } from '@storybook/react'

import Label from './Label'

storiesOf('atoms|Label', module)
  .add('default', () => <Label>I'm a label</Label>)
  .add('nested', () => <Label>I'm a label
    <Label>And here's more details</Label>
  </Label>)
