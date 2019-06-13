import { storiesOf } from '@storybook/react'
import React from 'react'
import { Adornment } from '.'

import { MdKeyboardArrowDown } from 'react-icons/md'
import { Input } from '../Input/Input'
import { Icon } from '../Icon'
import { Position } from './Adornment'
import { Button } from '../Button'

storiesOf('atoms|Adornment', module)
  .add('default', () => (
    <>
      <Adornment component={<Icon><MdKeyboardArrowDown /></Icon>} ><Input type='text'></Input></Adornment>
    </>
  ))
  .add('right side', () => (
    <>
      <Adornment position={Position.RIGHT} component={<Icon><MdKeyboardArrowDown /></Icon>} ><Input type='text' ></Input></Adornment>
    </>
  ))
  .add('both sides', () => (
    <>
      <Adornment position={Position.LEFT} component={<Icon><MdKeyboardArrowDown /></Icon>} >
        <Adornment position={Position.RIGHT} component={<Icon><MdKeyboardArrowDown /></Icon>} >
          <Input type='text' />
        </Adornment>
      </Adornment>
    </>
  ))
  .add('other component', () => (
    <>
      <Adornment position={Position.LEFT} component={<Icon><MdKeyboardArrowDown /></Icon>} >
        <Adornment position={Position.RIGHT} component={<Icon><MdKeyboardArrowDown /></Icon>} >
          <Button>Hello There</Button>
        </Adornment>
      </Adornment>
    </>
  ))
