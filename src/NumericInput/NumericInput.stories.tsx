import faker from 'faker'
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Block } from '../Block'
import { Heading } from '../Heading'
import { Paragraph } from '../Paragraph'
import { TextInput } from '../TextInput'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { NumericInput } from '.'
import { Row } from '../utils/stories/components'
import { mockFn } from '../utils/stories/mocks'

storiesOf('interact|NumericInput', module)
  .addDecorator(withState(''))
  // @ts-ignore
  .add('default', ({ state, storeState }: any) => <NumericInput
    placeholder='Type an integer...'
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('step', ({ state, storeState }: any) => <NumericInput
    placeholder='Type a float...'
    step='any'
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('min', ({ state, storeState }: any) => <NumericInput
    placeholder='Type a positive float (2 decimal precision)...'
    step='0.01'
    min='0'
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('outlined', () => <NumericInput onChange={mockFn} outlined value='42' />)
  .add('inlined', () => <div>
    <Paragraph>{faker.lorem.words(4)}</Paragraph>
    <Block>
      <NumericInput inlined value={42} />
    </Block>
    <Paragraph>{faker.lorem.words(4)}</Paragraph>
  </div>)
  .add('purposes', () => <Row columns={4}>
    <NumericInput onChange={mockFn} primary value='42' />
    <NumericInput onChange={mockFn} secondary value='42' />
    <NumericInput onChange={mockFn} success value='42' />
    <NumericInput onChange={mockFn} danger value='42' />
    <NumericInput onChange={mockFn} outlined primary value='42' />
    <NumericInput onChange={mockFn} outlined secondary value='42' />
    <NumericInput onChange={mockFn} outlined success value='42' />
    <NumericInput onChange={mockFn} outlined danger value='42' />
    <NumericInput onChange={mockFn} inlined primary value='42' />
    <NumericInput onChange={mockFn} inlined secondary value='42' />
    <NumericInput onChange={mockFn} inlined success value='42' />
    <NumericInput onChange={mockFn} inlined danger value='42' />
  </Row>)
  .add('sizes', () => <Row columns={false}>
    <NumericInput onChange={mockFn} tiny value='42' />
    <NumericInput onChange={mockFn} small value='42' />
    <NumericInput onChange={mockFn} value='42' />
    <NumericInput onChange={mockFn} large value='42' />
  </Row>)
  .add('disabled', () => <NumericInput onChange={mockFn} disabled value='42' />)
  .add('as heading', () => <div>
    <Heading type='section' value='42' inlined as={NumericInput} />
    <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
  </div>)
