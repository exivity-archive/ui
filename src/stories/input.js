import React from 'react'

import { storiesOf } from '@storybook/react'
import { withState } from '../decorators/StateDecorator'

import TextInput from '../TextInput'
import Checkbox from '../Checkbox'
import Label from '../Label'

import { storeAndAction } from '../utils/storeAndAction'

export default storiesOf('Input', module)
  .addDecorator(withState('test'))
  .add('TextInput', ({ state, storeState }) => {
    return (
      <div>
          <TextInput value={state} onChange={storeAndAction(storeState, 'typing')}/>
      </div>
    )
  })
  .add('TextInput with label', ({ state, storeState }) => {
    return (
      <div>
        <Label name="Important field1">
          <TextInput value={state} onChange={storeAndAction(storeState, 'typing')}/>
        </Label>
        <Label name="Important field2" description="This field is very important">
          <TextInput value={state} onChange={storeAndAction(storeState, 'typing')}/>
        </Label>
      </div>
    )
  })

storiesOf('Checkbox', module)
  .addDecorator(withState(true))
  .add('Checkbox', ({ state, storeState }) => {
    return <Checkbox checked={state} onChange={storeAndAction(storeState, 'toggle checkbox')}/>
  })

