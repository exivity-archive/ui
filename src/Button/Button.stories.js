import React from 'react'
import { Grid } from 'reakit'
import { MdFavorite, MdSync } from 'react-icons/md'

import { storiesOf } from '@storybook/react'
import { withPropKnobs } from '../../docs/utils/withPropKnobs'

import Button from './Button'
import Icon from './../Icon'

storiesOf('atoms|Button', module)
  .add('default', () => withPropKnobs(<Button>Button</Button>))
  .add('palette', () => <Grid gridTemplateColumns='repeat(5, max-content)' gap={20} align>
    {[0, 1, 2, 3, 4].map(tone => <React.Fragment key={tone}>
      <Button primary tone={tone}>Primary</Button>
      <Button secondary tone={tone}>Secondary</Button>
      <Button success tone={tone}>Success</Button>
      <Button warning tone={tone}>Warning</Button>
      <Button danger tone={tone}>Danger</Button>
    </React.Fragment>)}
  </Grid>)
  .add('outlined', () => <Grid gridTemplateColumns='repeat(5, max-content)' gap={20} align>
    {[0, 1, 2, 3, 4].map(tone => <React.Fragment key={tone}>
      <Button primary outlined tone={tone}>Primary</Button>
      <Button secondary outlined tone={tone}>Secondary</Button>
      <Button success outlined tone={tone}>Success</Button>
      <Button warning outlined tone={tone}>Warning</Button>
      <Button danger outlined tone={tone}>Danger</Button>
    </React.Fragment>)}
  </Grid>)
  .add('scale', () => <Grid gridTemplateColumns='repeat(5, max-content)' gap={20} align>
    <Button primary xsmall>Extra small</Button>
    <Button primary small>Small</Button>
    <Button primary>Normal</Button>
    <Button primary large>Large</Button>
    <Button primary xlarge>Extra large</Button>
  </Grid>)
  .add('icon', () => <Grid gridTemplateColumns='repeat(2, max-content)' gap={20} align>
    <Button primary><Icon><MdFavorite /></Icon> like</Button>
    <Button success rightIcon large>
      retweet
      <Icon style={{ marginRight: 0 }}><MdSync /></Icon>
    </Button>
  </Grid>)
  .add('disabled', () => <Grid gridTemplateColumns='repeat(2, max-content)' gap={20} align>
    <Button disabled>Disabled</Button>
    <Button disabled outlined>Disabled</Button>
  </Grid>)
