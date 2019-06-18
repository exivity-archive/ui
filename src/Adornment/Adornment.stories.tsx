import { storiesOf } from '@storybook/react'
import React from 'react'
import { Adornment } from '.'

import { MdKeyboardArrowDown } from 'react-icons/md'
import { Input, Icon } from '..'
import { Block } from '../Block'

storiesOf('atoms|Adornment', module)
  .add('default', () => (
    <Adornment
      width={'60%'}
      leftComponent={<Icon><MdKeyboardArrowDown /></Icon>} >
      <Input type='text' />
    </Adornment>
  ))
  .add('right side', () => (
    <Adornment
      width={'60%'}
      rightComponent={<Icon><MdKeyboardArrowDown /></Icon>} >
      <Input type='text' />
    </Adornment>
  ))
  .add('both sides', () => (
    <Adornment
      width={'60%'}
      leftComponent={<Icon><MdKeyboardArrowDown /></Icon>}
      rightComponent={<Icon><MdKeyboardArrowDown /></Icon>}>
      <Input type='text' />
    </Adornment>
  ))
