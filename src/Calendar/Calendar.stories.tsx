import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { withState } from '../utils/tests/decorators/StateDecorator'
import { Row } from '../utils/stories/components'
import { markdown } from '../utils/stories/markdown'

import { Calendar } from './Calendar'
import { Modes } from './types'

storiesOf('interact|Calendar', module)
  .addDecorator(withState(new Date()))
  .add('overview', markdown(require('./README.md')))
  .add('default', ({ state, storeState }: any) => (
    <Calendar value={state} onChange={storeState} />
  ))
  .add('controlled with mode', ({ state, storeState }: any) => (
    <Row columns={2} columnWidth={400}>
      <Calendar value={state} onChange={storeState} />
      <Calendar value={state} mode={Modes.MONTHS} onChange={storeState} />
      <Calendar value={state} mode={Modes.QUARTERS} onChange={storeState} />
      <Calendar value={state} mode={Modes.YEARS} onChange={storeState} />
    </Row>
  ))
  .add('controlled with headerClick', ({ state, storeState }: any) => (
    <Calendar value={state} onChange={storeState} onHeaderClick={action('clicked header')} />
  ))
  .add('uncontrolled with initialMode and mode', ({ state, storeState }: any) => (
    <Row columns={2} columnWidth={400}>
      <Calendar value={state} initialMode={Modes.QUARTERS} width={300} onChange={storeState} />
      <Calendar value={state} initialMode={Modes.YEARS} mode={[Modes.MONTHS, Modes.YEARS]} width={300} onChange={storeState} />
    </Row>
  ))
