import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withState } from '../../.storybook/StateDecorator'

import TextInput from '../components/atoms/Input/TextInput'
import Checkbox from '../components/atoms/Input/Checkbox'
import Button from '../components/atoms/Input/Button'

export default storiesOf('Input', module)
  .addDecorator(withState('Testing'))
  .add('TextInput', ({ state, storeState }) => <TextInput value={state} onChange={(value) => {
    storeState(value)
    action('typing')(value)
  }}>Hello Button</TextInput>)
  .add('Checkbox', () => <Checkbox onClick={action('clicked')}/>)
  .add('Button', () => <Button onClick={action('clicked')}>Hello Button</Button>)