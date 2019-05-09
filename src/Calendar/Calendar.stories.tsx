import React from 'react'
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { Calendar } from './Calendar'
import { Row } from '../utils/stories/components'
import { markdown } from '../utils/stories/markdown'

import { Modes } from './types'

storiesOf('interact|Calendar', module)
  .addDecorator(withState(new Date()))
  .add('overview', markdown(require('./README.md')))
  .add('default', ({ state, storeState }: any) => (
    <Calendar value={state} onChange={storeState}/>
  ))
  .add('controlled with mode', ({ state, storeState }: any) => (
    <Row columns={2} columnWidth={400}>
      <Calendar value={state} onChange={storeState}/>
      <Calendar value={state} onChange={storeState} mode={Modes.MONTHS} />
      <Calendar value={state} onChange={storeState} mode={Modes.QUARTERS}/>
      <Calendar value={state} onChange={storeState} mode={Modes.YEARS}/>
    </Row>
  ))
  .add('uncontrolled with initialMode and mode', ({ state, storeState }: any) => (
    <Row columns={2} columnWidth={400}>
      <Calendar value={state} onChange={storeState} initialMode={Modes.QUARTERS} width={300}/>
      <Calendar value={state} onChange={storeState} initialMode={Modes.YEARS} mode={[Modes.MONTHS, Modes.YEARS]} width={300}/>
    </Row>
  ))
