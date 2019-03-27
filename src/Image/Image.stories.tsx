import React from 'react'
import { storiesOf } from '@storybook/react'

import { Image } from '.'

storiesOf('atoms|Image', module)
  .add('default', () => <Image src='https://picsum.photos/200/300' />)
  .add('contain', () => <Image size={150} background='cover' src='https://picsum.photos/200/300' />)
