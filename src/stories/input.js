import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TextInput from '../components/Input/TextInput'
import Checkbox from '../components/Input/Checkbox'
import Button from '../components/Input/Button'
import Label from '../components/Input/Label'

let textInputValue = "Hello there!"

export default storiesOf('Input', module)
  .add('TextInput', () => <TextInput value={textInputValue} onChange={(value) => {
    textInputValue = value
    action('New Value: ' + value)
  }}>Hello Button</TextInput>)
  .add('Checkbox', () => <Checkbox onClick={action('clicked')}/>)
  .add('Button', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('Default Label', () => <Label name='LabelName'>Children</Label>)
  .add('Label with Description', () => <Label name='LabelName' description='labelDescription'>Children</Label>)