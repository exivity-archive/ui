import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'

import { Block } from '.'
import { Button } from '../Button'

storiesOf('atoms|Block', module)
  .add('default', () => <>
    <Block><Button>Action</Button></Block>
    <Block><Button>Another action</Button></Block>
  </>)
