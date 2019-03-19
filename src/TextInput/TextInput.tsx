import React from 'react'
import { AbstractInput, InputProps } from '../AbstractInput/AbstractInput'

export const TextInput = (props: InputProps) => (
  <AbstractInput type='text' {...props} />
)
