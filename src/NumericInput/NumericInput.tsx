import React from 'react'
import { AbstractInput, InputProps } from '../AbstractInput/AbstractInput'

export const NumericInput = (props: InputProps) => (
  <AbstractInput type='number' {...props} />
)
