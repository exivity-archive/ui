import faker from 'faker'
import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { Paragraph } from '../Paragraph'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { TextInput } from '.'
import { Row } from '../utils/stories/components'
import { mockFn } from '../utils/stories/mocks'

storiesOf('forms|TextInput', module)
  .addDecorator(withState(''))
  .add('default', ({ state, storeState }: any) => <TextInput
    placeholder='Type something...'
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('outlined', () => <TextInput onChange={mockFn} outlined value='Outlined' />)
  .add('inlined', () => <div>
    <Paragraph>{faker.lorem.words(4)}</Paragraph>
    <TextInput inlined value={faker.lorem.words(4)} style={{ marginBottom: '1em' }} />
    <Paragraph>{faker.lorem.words(4)}</Paragraph>
  </div>)
  .add('purposes', () => <Row columns={4}>
      <TextInput onChange={mockFn} primary value='Primary' />
      <TextInput onChange={mockFn} secondary value='Secondary' />
      <TextInput onChange={mockFn} success value='Success' />
      <TextInput onChange={mockFn} danger value='Danger' />
      <TextInput onChange={mockFn} outlined primary value='Primary' />
      <TextInput onChange={mockFn} outlined secondary value='Secondary' />
      <TextInput onChange={mockFn} outlined success value='Success' />
      <TextInput onChange={mockFn} outlined danger value='Danger' />
    </Row>)
  .add('sizes', () => <Row columns={false}>
    <TextInput onChange={mockFn} tiny value='Tiny' />
    <TextInput onChange={mockFn} small value='Small' />
    <TextInput onChange={mockFn} value='Default' />
    <TextInput onChange={mockFn} large value='Large' />
  </Row>)
  .add('disabled', () => <TextInput onChange={mockFn} disabled value='Disabled' />)
  .add('as heading', () => <div>
    <Heading type='section' value='Editable heading' inlined as={TextInput} />
    <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
  </div>)
