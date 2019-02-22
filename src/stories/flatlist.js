import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import TextInput from '../components/Input/TextInput'

let textInputValue = "Hello there!"

export default storiesOf('Flatlist', module)
  .add('default', () => <TextInput value={textInputValue} onChange={(value) => {
    textInputValue = value
    action('New Value: ' + value)
  }}>Hello Button</TextInput>)