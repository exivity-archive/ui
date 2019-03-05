import React from 'react'

import { storiesOf } from '@storybook/react'
import { withState } from '../utils/testing/decorators/StateDecorator'
import { storeAndAction } from '../utils/testing/storeAndAction'
import TextArea from './TextArea'

export default storiesOf('forms|TextArea', module)
  .addDecorator(withState(''))
  .add('default', ({ state, storeState }) => <TextArea
    rows={5}
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('outlined', ({ state, storeState }) => <TextArea
    rows={5}
    value={state}
    outlined
    onChange={storeAndAction(storeState, 'onChange')} />)



