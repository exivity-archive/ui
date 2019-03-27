import React from 'react'
import { storiesOf } from '@storybook/react'

import { Section } from '.'
import { Button } from '../Button'

storiesOf('atoms|Section', module)
  .add('default', () => <>
    <Section><Button>Action</Button></Section>
    <Section><Button>Another action</Button></Section>
  </>)
