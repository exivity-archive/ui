import React from 'react'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { Row } from '../utils/stories/components'
import { SelectInput } from '../SelectInput'

import { Select } from './'

const items = [
  { key: '1', value: 'one' },
  { key: '2', value: 'two' },
  { key: '3', value: 'three' },
  { key: '4', value: 'four' }
]

export default storiesOf('molecules/Select', module)
  .addDecorator(withState({ key: '1', value: 'one' }))
  .add('default', ({ state, storeState }) => <Select value={state.key} onChange={storeState} data={items}/>)
  .add('custom valueComponent', ({ state, storeState }) => (
    <Row columns={4}>
      <Select valueComponent={<SelectInput primary/>}
        value={state.key} onChange={storeState} data={items}/>
      <Select valueComponent={<SelectInput secondary/>}
              value={state.key} onChange={storeState} data={items}/>
      <Select valueComponent={<SelectInput success/>}
              value={state.key} onChange={storeState} data={items}/>
      <Select valueComponent={<SelectInput danger/>}
              value={state.key} onChange={storeState} data={items}/>
      <Select valueComponent={<SelectInput primary outlined/>}
              value={state.key} onChange={storeState} data={items}/>
      <Select valueComponent={<SelectInput secondary outlined/>}
              value={state.key} onChange={storeState} data={items}/>
      <Select valueComponent={<SelectInput success outlined/>}
              value={state.key} onChange={storeState} data={items}/>
      <Select valueComponent={<SelectInput danger outlined/>}
              value={state.key} onChange={storeState} data={items}/>
    </Row>
  ))
