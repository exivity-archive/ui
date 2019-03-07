import faker from 'faker'
import React from 'react'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { Paragraph } from '../Paragraph'
import { TextInput } from '../TextInput'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { TextArea } from '.'

storiesOf('forms|TextArea', module)
  .addDecorator(withState(''))
  .add('default', ({ state, storeState }: any) => <TextArea
    rows={5}
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('outlined', ({ state, storeState }: any) => <TextArea
    rows={5}
    value={state}
    outlined
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('inlined', () => <div>
    <Paragraph>{faker.lorem.sentences(3)}</Paragraph>
    <TextArea inlined rows={3} value={faker.lorem.sentences(5)} style={{ marginBottom: '1em' }} />
    <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
  </div>)
