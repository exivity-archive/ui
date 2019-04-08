import React from 'react'
import faker from 'faker'

import { storiesOf } from '@storybook/react'
import { Section } from '../Section'
import { Heading } from '../Heading'
import { Paragraph } from '../Paragraph'
import { markdown } from '../utils/stories/markdown'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { TextInput } from '.'
import { Row } from '../utils/stories/components'

storiesOf('interact|TextInput', module)
  .addDecorator(withState(''))
  .add('overview', markdown(require('./README.md')))
  // @ts-ignore
  .add('default', ({ state, storeState }: any) => <TextInput
    placeholder='Type something...'
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('outlined', () => <TextInput outlined value='Outlined' />)
  .add('required', ({ state, storeState }: any) => <TextInput
    placeholder='Type something...'
    required
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('inline', () => <Paragraph>
    {faker.lorem.words(4)}{' '}
    <TextInput inline value={faker.lorem.words(4)} />{' '}
    {faker.lorem.words(8)}
  </Paragraph>)
  .add('flat', () => <div>
    <Paragraph>{faker.lorem.sentences(1)}</Paragraph>
    <Section>
      <TextInput flat value={faker.lorem.words(4)} />
    </Section>
    <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
  </div>)
  .add('flat + outined', () => <div>
    <Paragraph>{faker.lorem.sentences(1)}</Paragraph>
    <Section>
      <TextInput flat outlined value={faker.lorem.words(4)} />
    </Section>
    <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
  </div>)
  .add('purposes', () => <Row columns={4}>
      <TextInput primary value='Primary' />
      <TextInput secondary value='Secondary' />
      <TextInput success value='Success' />
      <TextInput danger value='Danger' />
      <TextInput outlined primary value='Primary' />
      <TextInput outlined secondary value='Secondary' />
      <TextInput outlined success value='Success' />
      <TextInput outlined danger value='Danger' />
      <TextInput flat outlined primary value='Primary' />
      <TextInput flat outlined secondary value='Secondary' />
      <TextInput flat outlined success value='Success' />
      <TextInput flat outlined danger value='Danger' />
    </Row>)
  .add('sizes', () => <Row columns={false}>
    <TextInput tiny value='Tiny' />
    <TextInput small value='Small' />
    <TextInput value='Default' />
    <TextInput large value='Large' />
    <TextInput huge value='Huge' />
  </Row>)
  .add('disabled', () => <TextInput disabled value='Disabled' />)
  .add('as heading', () => <div>
    <Heading type='section' value='Editable heading' flat as={TextInput} />
    <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
  </div>)
