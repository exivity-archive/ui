import faker from 'faker'
import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'

import { Paragraph } from '.'

storiesOf('atoms|Paragraph', module)
  .add('default', () => <Paragraph>{faker.lorem.paragraphs(4)}</Paragraph>)
