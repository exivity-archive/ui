import { storiesOf } from '@storybook/react'
import faker from 'faker'
import React from 'react'

import { Widget } from '.'
import { Paragraph } from '../Paragraph'

storiesOf('molecules|Widget', module)
  .add('default', () => (
    <Widget header='Title'>
      <Paragraph>{faker.lorem.paragraphs(4)}</Paragraph>
    </Widget>
  ))
  .add('no padding', () => (
    <Widget header='Title' noPadding>
      <Paragraph>{faker.lorem.paragraphs(4)}</Paragraph>
    </Widget>
  ))
  .add('editable header', () => (
    <Widget>
      <Widget.Header editable>Edit Me</Widget.Header>
      <Paragraph>{faker.lorem.paragraphs(4)}</Paragraph>
    </Widget>
  ))
