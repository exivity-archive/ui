import { storiesOf } from '@storybook/react'
import React from 'react'
import { Adornment } from '.'

import { MdKeyboardArrowDown } from 'react-icons/md'
import { Input } from '../Input/Input'
import { Icon } from '../Icon'

storiesOf('atoms|Adornment', module)
  .add('default', () => (
    <>
      <Adornment
        leftComponent={<Icon><MdKeyboardArrowDown /></Icon>} >
        <Input type='text' />
      </Adornment>
    </>
  ))
  .add('right side', () => (
    <>
      <Adornment
        rightComponent={<Icon><MdKeyboardArrowDown /></Icon>} >
        <Input type='text' />
      </Adornment>
    </>
  ))
  .add('both sides', () => (
    <>
      <Adornment
        leftComponent={<Icon><MdKeyboardArrowDown /></Icon>}
        rightComponent={<Icon><MdKeyboardArrowDown /></Icon>}>
        <Input type='text' />
      </Adornment>
    </>
  ))
