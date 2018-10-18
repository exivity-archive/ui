import React from 'react'
import { Grid } from 'reakit'
import { storiesOf } from '@storybook/react'
import { MdFavorite } from 'react-icons/md'

import Icon from './Icon'

storiesOf('atoms|Icon', module)
  .add('default', () => <Icon><MdFavorite /></Icon>)
  .add('color', () => <Icon palette='primary'><MdFavorite /></Icon>)
  .add('scale', () => <Grid gridTemplateColumns='repeat(5, max-content)' gap={20} align>
    <Icon xsmall><MdFavorite /></Icon>
    <Icon small><MdFavorite /></Icon>
    <Icon><MdFavorite /></Icon>
    <Icon large><MdFavorite /></Icon>
    <Icon xlarge><MdFavorite /></Icon>
  </Grid>)
