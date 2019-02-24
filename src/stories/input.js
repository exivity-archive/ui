import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withState } from '../../.storybook/StateDecorator'

import TextInput from '../components/atoms/Input/TextInput'
import Checkbox from '../components/atoms/Input/Checkbox'
import DropDownButton from '../components/atoms/Input/DropdownButton'
import Label from '../components/atoms/Input/Label'

import { storeAndAction } from '../utils/storeAndAction'
import CenterDecorator from '../decorators/CenterDecorator'

export default storiesOf('Input', module)
  .addDecorator(withState('test'))
  .addDecorator(CenterDecorator)
  .add('TextInput', ({ state, storeState }) => {
    return (
      <TextInput value={state} onChange={storeAndAction(storeState, 'typing')}>
          Hello Button
      </TextInput>
      )
    })
  .add('TextInput with label', ({ state, storeState }) => {
    return (
      <div>
        <Label name="Important field1">
          <TextInput value={state} onChange={storeAndAction(storeState, 'typing')}>
              Hello Button
          </TextInput>
        </Label>
        <Label name="Important field2" description="This field is very important">
          <TextInput value={state} onChange={storeAndAction(storeState, 'typing')}>
              Hello Button
          </TextInput>
        </Label>
      </div>
      )
    })
  .addDecorator(withState(false))
  .add('Checkbox', ({ state, storeState }) => {
    return <Checkbox checked={state} onChange={storeAndAction(storeState, 'toggle checkbox')}/>
  })
  .add('Dropdown Button', () => <DropDownButton value="click me!"/>)
  