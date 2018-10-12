import React from 'react'

import { storiesOf } from '@storybook/react'

import Button from './Button'

storiesOf('atoms|Button', module)
  .add('default', () => <Button>Button</Button>)
  .add('colours', () => <div>
    <Button primary>Primary</Button>
    <Button secondary>Secondary</Button>
    <Button success>Success</Button>
    <Button warning>Warning</Button>
    <Button danger>Danger</Button>
  </div>)
