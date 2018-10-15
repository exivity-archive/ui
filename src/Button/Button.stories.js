import React from 'react'
import { Grid } from 'reakit'

import { storiesOf } from '@storybook/react'

import Button from './Button'
import Icon from './../Icon'

storiesOf('atoms|Button', module)
  .add('default', () => <Button>Button</Button>)
  .add('palette', () => <Grid gridTemplateColumns='repeat(5, max-content)' gap={20} align>
    {[0, 1, 2, 3, 4].map(tone => <React.Fragment>
      <Button primary tone={tone}>Primary</Button>
      <Button secondary tone={tone}>Secondary</Button>
      <Button success tone={tone}>Success</Button>
      <Button warning tone={tone}>Warning</Button>
      <Button danger tone={tone}>Danger</Button>
    </React.Fragment>)}
  </Grid>)
  .add('size', () => <Grid gridTemplateColumns='repeat(5, max-content)' gap={20} align>
    <Button primary xsmall>Extra small</Button>
    <Button primary small>Small</Button>
    <Button primary>Normal</Button>
    <Button primary large>Large</Button>
    <Button primary xlarge>Extra large</Button>
  </Grid>)
  .add('icon', () => <Grid gridTemplateColumns='repeat(2, max-content)' gap={20} align>
    <Button primary><Icon>favorite</Icon> like</Button>
    <Button success rightIcon>retweet <Icon style={{ marginRight: 0 }}>sync</Icon></Button>
  </Grid>)
