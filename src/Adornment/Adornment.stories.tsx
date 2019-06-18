import { storiesOf } from '@storybook/react'
import React from 'react'
import { Adornment } from '.'

import { MdKeyboardArrowDown } from 'react-icons/md'
import { Button, Input, Icon } from '..'

storiesOf('atoms|Adornment', module)
  .add('default', () => (
    <>
      <Adornment
        leftComponent={<Icon><MdKeyboardArrowDown /></Icon>} >
        <Input type='text' width={500} />
      </Adornment>
    </>
  ))
  .add('right side', () => (
    <>
      <Adornment
        rightComponent={<Icon><MdKeyboardArrowDown /></Icon>} >
        <Input type='text' width={500} />
      </Adornment>
    </>
  ))
  .add('both sides', () => (
    <>
      <Adornment
        leftComponent={<Icon><MdKeyboardArrowDown /></Icon>}
        rightComponent={<Icon><MdKeyboardArrowDown /></Icon>}>
        <Input type='text' width={500} />
      </Adornment>
    </>
  ))
  .add('button', () => (

    < Button > Hello</Button >

  ))

{/* <Adornment rightComponent={<Icon><MdKeyboardArrowDown /></Icon>}> */ }
{/* </Adornment> */ }
