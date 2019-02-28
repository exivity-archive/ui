import React from 'react'

import { storiesOf } from '@storybook/react'
import { withState } from '../decorators/StateDecorator'


import TextInput from '../TextInput'
import Checkbox from '../Checkbox'
import Label from '../Label'


import { storeAndAction } from '../utils/storeAndAction'
import Dropdown from '../Dropdown'

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
    return <Checkbox checked={state} onClick={storeAndAction(storeState, 'toggle checkbox')}/>
  })

storiesOf('Dropdown', module).addDecorator(withState(false)).add('Dropdown', ({ state, storeState }) => {
  return (
    <div style={{ paddingTop: 300 }}>
      <Dropdown 
        opened={state}
        button={
          <div onClick={() => storeState(!state)} >Click me</div>
          }>
        <div style={{width: 500}} >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, 
          but also the leap into electronic typesetting, remaining essentially unchanged. 
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </div>
      </Dropdown>
    </div>
  )
})
