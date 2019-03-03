import React from 'react'
import Label from './Label'

import { storiesOf } from '@storybook/react'

export default storiesOf('atoms|Label', module)
  .add('Label', () => {
    return <Label name='Label name' description='Label description' />
  })
