import React from 'react'
import { Grid } from 'reakit'
import { storiesOf } from '@storybook/react'
import { MdFavorite } from 'react-icons/md'
import { FaFish } from 'react-icons/fa'
import { IoIosBasketball } from 'react-icons/io'

import Icon from './Icon'

storiesOf('atoms|Icon', module)
  .add('default', () => <Icon><MdFavorite /></Icon>)
  .add('color', () => <Icon palette='primary'><FaFish /></Icon>)
  .add('scale', () => <React.Fragment>
    <Grid gridTemplateColumns='repeat(5, max-content)' gap={20} align>
      <Icon xsmall><IoIosBasketball /></Icon>
      <Icon small><IoIosBasketball /></Icon>
      <Icon><IoIosBasketball /></Icon>
      <Icon large><IoIosBasketball /></Icon>
      <Icon xlarge><IoIosBasketball /></Icon>
    </Grid>
  </React.Fragment>)
