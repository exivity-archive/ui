import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TextInput from '../components/Input/TextInput'
import Checkbox from '../components/Input/Checkbox'
import Button from '../components/Input/Button'
import Label from '../components/Input/Label'
import Icon from '../components/Icon'
import DropDownButton from '../components/Input/DropdownButton'

let textInputValue = "Hello there!"

export default storiesOf('Input', module)
  .add('TextInput', () => <TextInput value={textInputValue} onChange={(value) => {
    textInputValue = value
    action('New Value: ' + value)
  }}>Hello Button</TextInput>)
  .add('Checkbox', () => <Checkbox onClick={action('clicked')}/>)
  .add('Button', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('Button with Icon (doesn\'t work yet)', () => <Button onClick={action('clicked')}><Icon subIcon={'triangle-down'}>{'triangle-down'}</Icon></Button>)
  .add('Default Label', () => <Label name='LabelName'>Children</Label>)
  .add('Label with Description', () => <Label name='LabelName' description='labelDescription'>Something</Label>)
  .add('Label with TextInput', () => <Label name='LabelName' description='labelDescription'><TextInput>something</TextInput></Label>)
  .add('Dropdown Button', () => <DropDownButton value="click me!"/>)
  