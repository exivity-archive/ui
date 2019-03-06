import React from 'react'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { TextArea } from '.'

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
