import React from 'react'
import faker from 'faker'
import { storiesOf } from '@storybook/react'

import { Section } from '../Section'
import { Heading } from '../Heading'
import { Paragraph } from '../Paragraph'
import { markdown } from '../utils/stories/markdown'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { Row } from '../utils/stories/components'

import { Input } from '.'

storiesOf('interact|Input', module)
  .addDecorator(withState(''))
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  .add('overview', markdown(require('./README.md')))
  .add('default', ({ state, storeState }: any) => (
    <>
      <Heading type='sub'>Text</Heading>
      <Input
        placeholder='Type something...'
        value={state}
        onChange={storeAndAction(storeState, 'onChange')} />
      <Heading type='sub'>Numeric</Heading>
      <Input
        type='number'
        placeholder='Type a number...'
        value={state}
        onChange={storeAndAction(storeState, 'onChange')} />
    </>
  ))
  .add('outlined', () => (
    <>
      <Heading type='sub'>Text</Heading>
      <Input outlined value='Outlined' />
      <Heading type='sub'>Numeric</Heading>
      <Input type='number' outlined value='42' />
    </>
  ))
  .add('required', ({ state, storeState }: any) => (
    <>
      <Heading type='sub'>Text</Heading>
      <Input
        placeholder='Type something...'
        required
        value={state}
        onChange={storeAndAction(storeState, 'onChange')} />
      <Heading type='sub'>Numeric</Heading>
      <Input
        type='number'
        placeholder='Type some number...'
        required
        value={state}
        onChange={storeAndAction(storeState, 'onChange')} />
    </>
  ))
  .add('inline', () => (
    <Paragraph>
      <Heading type='sub'>Text</Heading>
      {faker.lorem.words(4)}{' '}
      <Input inline value={faker.lorem.words(4)} />
      {faker.lorem.words(8)}
      <Heading type='sub'>Numeric</Heading>
      {faker.lorem.words(4)}{' '}
      <Input inline value={faker.random.number(1000000)} />
      {faker.lorem.words(8)}
    </Paragraph>
  ))
  .add('flat', () => (
    <>
      <Heading type='sub'>Text</Heading>
      <Paragraph>{faker.lorem.sentences(1)}</Paragraph>
      <Section>
        <Input flat value={faker.lorem.words(4)} />
      </Section>
      <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
      <Heading type='sub'>Numeric</Heading>
      <Paragraph>{faker.lorem.sentences(1)}</Paragraph>
      <Section>
        <Input type='number' flat value={faker.random.number(1000000)} />
      </Section>
      <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
    </>
  ))
  .add('flat + outined', () => (
    <>
      <Heading type='sub'>Text</Heading>
      <Paragraph>{faker.lorem.sentences(1)}</Paragraph>
      <Section>
        <Input flat outlined value={faker.lorem.words(4)} />
      </Section>
      <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
      <Heading type='sub'>Numeric</Heading>
      <Paragraph>{faker.lorem.sentences(1)}</Paragraph>
      <Section>
        <Input type='number' flat outlined value={faker.random.number(1000000)} />
      </Section>
      <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
    </>
  ))
  .add('purposes', () => (
    <>
      <Heading type='sub'>Text</Heading>
      <Row columns={4}>
        <Input primary value='Primary' />
        <Input secondary value='Secondary' />
        <Input success value='Success' />
        <Input danger value='Danger' />
        <Input outlined primary value='Primary' />
        <Input outlined secondary value='Secondary' />
        <Input outlined success value='Success' />
        <Input outlined danger value='Danger' />
        <Input flat outlined primary value='Primary' />
        <Input flat outlined secondary value='Secondary' />
        <Input flat outlined success value='Success' />
        <Input flat outlined danger value='Danger' />
      </Row>
      <Heading type='sub'>Numeric</Heading>
      <Row columns={4}>
        <Input type='number' primary value={0} />
        <Input type='number' secondary value={0} />
        <Input type='number' success value={0} />
        <Input type='number' danger value={0} />
        <Input type='number' outlined primary value={0} />
        <Input type='number' outlined secondary value={0} />
        <Input type='number' outlined success value={0} />
        <Input type='number' outlined danger value={0} />
        <Input type='number' flat outlined primary value={0} />
        <Input type='number' flat outlined secondary value={0} />
        <Input type='number' flat outlined success value={0} />
        <Input type='number' flat outlined danger value={0} />
      </Row>
    </>
  ))
  .add('sizes', () => (
    <>
      <Heading type='sub'>Text</Heading>
      <Row columns={false}>
        <Input tiny value='Tiny' />
        <Input small value='Small' />
        <Input value='Default' />
        <Input large value='Large' />
        <Input huge value='Huge' />
      </Row>
      <Heading type='sub'>Numeric</Heading>
      <Row columns={false}>
        <Input type='number' tiny value={0} />
        <Input type='number' small value={0} />
        <Input type='number' value={0} />
        <Input type='number' large value={0} />
        <Input type='number' huge value={0} />
      </Row>
    </>
  ))
  .add('disabled', () => (
    <>
      <Heading type='sub'>Text</Heading>
      <Input disabled value='Disabled' />
      <Heading type='sub'>Numeric</Heading>
      <Input disabled value={0} />
    </>
  ))
  .add('as heading', () => (
    <>
      <Heading type='section' value='Editable heading' flat as={Input} />
      <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
    </>
  ))
  .add('step (numeric)', ({ state, storeState }: any) => (
    <>
      <Input
        type='number'
        placeholder='Type a float...'
        step='any'
        value={state}
        onChange={storeAndAction(storeState, 'onChange')} />
      <Input
        type='number'
        placeholder='Type an int...'
        step='1'
        value={state}
        onChange={storeAndAction(storeState, 'onChange')} />
    </>
  ))
  .add('min (numeric)', ({ state, storeState }: any) => (
    <Input
      type='number'
      placeholder='Type a positive float (2 decimal precision)...'
      step='0.01'
      min='0'
      value={state}
      onChange={storeAndAction(storeState, 'onChange')} />
  ))
