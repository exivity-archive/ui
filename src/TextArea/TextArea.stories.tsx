import React from 'react'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/testing/decorators/StateDecorator'
import { storeAndAction } from '../utils/testing/storeAndAction'
import TextArea from './TextArea'

export default storiesOf('forms|TextArea', module)
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
