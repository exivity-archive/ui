import { storiesOf } from '@storybook/react'
import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { Adornment } from '.'

import { Input, Icon } from '..'

storiesOf('atoms|Adornment', module)
  .add('default', () => (
    <Adornment
      width='60%'
      left={<Icon><MdKeyboardArrowDown /></Icon>}>
      <Input type='text' />
    </Adornment>
  ))
  .add('right side', () => (
    <Adornment
      width='60%'
      right={<Icon><MdKeyboardArrowDown /></Icon>}>
      <Input type='text' />
    </Adornment>
  ))
  .add('both sides', () => (
    <Adornment
      width='60%'
      left={<Icon><MdKeyboardArrowDown /></Icon>}
      right={<Icon><MdKeyboardArrowDown /></Icon>}>
      <Input type='text' />
    </Adornment>
  ))
