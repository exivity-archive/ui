import React from 'react'
import faker from 'faker'
// @ts-ignore
import { storiesOf } from '@storybook/react'

import { Heading } from '.'
import { Paragraph } from '../Paragraph'

storiesOf('atoms|Heading', module)
  .add('default', () => <>
    <Heading>{faker.lorem.sentence(4)}</Heading>
    <Paragraph>{faker.lorem.paragraphs(2)}</Paragraph>
    <Heading level={2}>{faker.lorem.sentence(4)}</Heading>
    <Paragraph>{faker.lorem.paragraphs(2)}</Paragraph>
    <Heading level={3}>{faker.lorem.sentence(4)}</Heading>
    <Paragraph>{faker.lorem.paragraphs(2)}</Paragraph>
  </>)
