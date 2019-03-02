import React from 'react'
import Label from '../Label'

import { storiesOf } from '@storybook/react'
import { CenterDecorator } from '../utils/testing/decorators/CenterDecorator'

export default storiesOf('Label', module)
  .addDecorator(CenterDecorator)
  .add('Label', () => {
    return <Label name='Label name' description='Label description' />
  })
