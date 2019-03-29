import { storiesOf } from '@storybook/react'
import faker from 'faker'
import React from 'react'

import { Widget } from '.'
import { Paragraph } from '../Paragraph'
import { withState } from '../utils/tests/decorators/StateDecorator'

storiesOf('molecules|Widget', module)
  .addDecorator(withState({ header: 'Edit me' }))
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
  // @ts-ignore
  .add('editable header', ({ state, storeState }: any) => (
    <Widget>
      <Widget.Header editable onChange={(newHeader) => storeState({ ...state, header: newHeader })}>{state.header}</Widget.Header>
      <Paragraph>{faker.lorem.paragraphs(4)}</Paragraph>
    </Widget>
  ))
