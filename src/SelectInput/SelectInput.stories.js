import React from 'react'

import { storiesOf } from '@storybook/react'
import { withState } from '../utils/testing/decorators/StateDecorator'
import { storeAndAction } from '../utils/testing/storeAndAction'

import SelectInput from './'

export default storiesOf('forms|SelectInput', module)
  .addDecorator(withState(''))
  .add('default', ({ state, storeState }) => (
    <div>
      <SelectInput/>
      <SelectInput disabled/>
    </div>
  ))
