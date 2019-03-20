import { storiesOf } from '@storybook/react'
import React from 'react'

import { MdFavorite } from 'react-icons/md'
import { Icon } from '.'

storiesOf('atoms|Icon', module)
  .add('default', () => <Icon><MdFavorite /></Icon>)
