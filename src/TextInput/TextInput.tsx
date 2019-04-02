import React, { forwardRef, Ref } from 'react'
import { AbstractInput, InputProps } from '../AbstractInput/AbstractInput'

export const TextInput = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => (
  <AbstractInput type='text' {...props} ref={ref} />
))
