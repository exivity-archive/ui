import { storiesOf } from '@storybook/react'
import React from 'react'
import { Adornment } from '.'
import { Section } from '../Section'

import { MdKeyboardArrowDown } from 'react-icons/md'
import { Input } from '../Input/Input'

storiesOf('interact|Checkbox', module)
  .add('default', () => (
    <>
      <Adornment component={<MdKeyboardArrowDown />} ><Input type='text'></Input></Adornment>
    </>
  ))
