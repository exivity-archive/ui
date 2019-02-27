import React from 'react'

import { storiesOf } from '@storybook/react'
import { withState } from '../decorators/StateDecorator'

import TextInput from '../components/atoms/Input/TextInput'
import Checkbox from '../components/atoms/Input/Checkbox'
import DropDownButton from '../components/atoms/Input/DropDownSelect/DropDownButton'
import Button from '../components/atoms/Input/Buttons/Button'
import UpdateButton from '../components/atoms/Input/Buttons/UpdateButton'
import Label from '../components/atoms/Input/Label'

import { storeAndAction } from '../utils/storeAndAction'

export default storiesOf('Input', module)
  .addDecorator(withState('test'))
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

storiesOf('Buttons', module)
  .add('Button', () => <Button>Hello</Button>)
  .add('Update Button', () => <UpdateButton/>)
  .add('Dropdown Button', () => <DropDownButton value="click me!"/>)

storiesOf('Checkbox', module)
  .addDecorator(withState(true))
  .add('Checkbox', ({ state, storeState }) => {
    return <Checkbox checked={state} onChange={storeAndAction(storeState, 'toggle checkbox')}/>
  })
  
  