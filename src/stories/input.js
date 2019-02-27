import React from 'react'

import { storiesOf } from '@storybook/react'
import { withState } from '../decorators/StateDecorator'

import TextInput from '../components/atoms/Input/TextInput'
import Checkbox from '../components/atoms/Input/Checkbox'
import Button from '../components/atoms/Input/Buttons/Button'
import UpdateButton from '../components/atoms/Input/Buttons/UpdateButton'
import Label from '../components/atoms/Input/Label'

import { storeAndAction } from '../utils/storeAndAction'
import Dropdown from '../components/atoms/Input/Dropdown'
import DropDownButton from '../components/atoms/Input/Dropdown/DropdownButton'

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
  .add('Dropdown Button', () => <DropdownButton value="click me!"/>)

storiesOf('Checkbox', module)
  .addDecorator(withState(true))
  .add('Checkbox', ({ state, storeState }) => {
    return <Checkbox checked={state} onChange={storeAndAction(storeState, 'toggle checkbox')}/>
  })
  
  

storiesOf('Dropdown', module).addDecorator(withState(false)).add('Dropdown', ({ state, storeState }) => {
  return <div style={{ paddingTop: 300 }}><Dropdown 
    button={
      <DropDownButton 
        opened={state} 
        onClick={() => storeState(!state)} 
        value="Click me"/>
    } 
  opened={state}><div style={{width: 500}} >
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
  </div>
  </Dropdown>
    </div>
  })