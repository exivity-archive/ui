import React from 'react'
import { Grid } from 'reakit'
import { storiesOf } from '@storybook/react'

import Icon from './Icon'

storiesOf('atoms|Icon', module)
  .add('default', () => <Icon>favorite</Icon>)
  .add('color', () => <Icon palette='primary'>favorite</Icon>)
  .add('scale', () => <Grid gridTemplateColumns='repeat(5, max-content)' gap={20} align>
    <Icon xsmall>favorite</Icon>
    <Icon small>favorite</Icon>
    <Icon>favorite</Icon>
    <Icon large>favorite</Icon>
    <Icon xlarge>favorite</Icon>
  </Grid>)
