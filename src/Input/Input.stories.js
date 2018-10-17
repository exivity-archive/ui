import React from 'react'
import { Grid } from 'reakit'
import { storiesOf } from '@storybook/react'

import Input from './Input'

storiesOf('atoms|Input', module)
  .add('default', () => <Input placeholder="What's your name?" />)
  .add('palette', () => <Grid gridTemplateColumns='repeat(6, 100px)' gap={20}>
    {[0, 1, 2, 3, 4].map(tone => <React.Fragment key={tone}>
      <Input tone={tone} placeholder='Primary' />
      <Input primary tone={tone} placeholder='Primary' />
      <Input secondary tone={tone} placeholder='Secondary' />
      <Input success tone={tone} placeholder='Success' />
      <Input warning tone={tone} placeholder='Warning' />
      <Input danger tone={tone} placeholder='Danger' />
    </React.Fragment>)}
  </Grid>)
  .add('opaque', () => <Grid gridTemplateColumns='repeat(6, 100px)' gap={20}>
    {[0, 1, 2, 3, 4].map(tone => <React.Fragment key={tone}>
      <Input opaque tone={tone} placeholder='Primary' />
      <Input primary opaque tone={tone} placeholder='Primary' />
      <Input secondary opaque tone={tone} placeholder='Secondary' />
      <Input success opaque tone={tone} placeholder='Success' />
      <Input warning opaque tone={tone} placeholder='Warning' />
      <Input danger opaque tone={tone} placeholder='Danger' />
    </React.Fragment>)}
  </Grid>)
  .add('outlined', () => <Grid gridTemplateColumns='repeat(6, 100px)' gap={20}>
    {[0, 1, 2, 3, 4].map(tone => <React.Fragment key={tone}>
      <Input outlined tone={tone} placeholder='Primary' />
      <Input primary outlined tone={tone} placeholder='Primary' />
      <Input secondary outlined tone={tone} placeholder='Secondary' />
      <Input success outlined tone={tone} placeholder='Success' />
      <Input warning outlined tone={tone} placeholder='Warning' />
      <Input danger outlined tone={tone} placeholder='Danger' />
    </React.Fragment>)}
  </Grid>)
  .add('size', () => <Grid gridTemplateColumns='repeat(5, max-content)' gap={20}>
    <Input xsmall placeholder='Extra small' />
    <Input small placeholder='Small' />
    <Input placeholder='Normal' />
    <Input large placeholder='Large' />
    <Input xlarge placeholder='Extra large' />
  </Grid>)
  .add('disabled', () => <Grid gridTemplateColumns='repeat(5, max-content)' gap={20}>
    <Input disabled value='Disabled' />
    <Input disabled opaque value='Disabled' />
    <Input disabled outlined value='Disabled' />
  </Grid>)
