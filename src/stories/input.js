import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withState } from '../../.storybook/StateDecorator'

import TextInput from '../components/atoms/Input/TextInput'
import Checkbox from '../components/atoms/Input/Checkbox'
import Button from '../components/atoms/Input/Button'
import Icon from '../components/atoms/Icon'
import DropDownButton from '../components/atoms/Input/DropdownButton'

import { MdAccountCircle } from 'react-icons/md'
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
  .addDecorator(withState(false))
  .add('Checkbox', ({ state, storeState }) => {
    return <Checkbox checked={state} onClick={storeAndAction(storeState, 'toggle checkbox', !state)}/>
  })
  .add('Button', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('Button with Icon (doesn\'t work yet)', () => {
    return (
      <Button onClick={action('clicked')}>
        <Icon subIcon={<MdAccountCircle/>}>
          {<MdAccountCircle/>}
        </Icon>
      </Button>
    )
  })
  .add('Dropdown Button', () => <DropDownButton value="click me!"/>)
  .add('Test icon', () => <Icon subIcon={<MdAccountCircle/>}><MdAccountCircle/></Icon>)
  