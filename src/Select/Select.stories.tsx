import React from 'react'

import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'

import { Select } from '.'
import { SelectList } from '../SelectList'
import { TextInput } from '../TextInput'
import { SelectInput } from '../SelectInput'
import { Row } from '../utils/stories/components'

const items = [
  { key: '1', value: 'one' },
  { key: '2', value: 'two' },
  { key: '3', value: 'three' },
  { key: '4', value: 'four' }
]

export default storiesOf('molecules/Select', module)
  .addDecorator(withState())
  .add('default', ({ state, storeState }: any) => (
    <Select value={state && state.value}>
      <SelectList value={state && state.key} onChange={storeState} data={items}/>
    </Select>
  ))
  .add('Custom valueComponent', ({ state, storeState }: any) => (
    <Row columns={4}>
      <Select value={state && state.value} valueComponent={<TextInput placeholder='Choose option' outlined/>}>
        <SelectList value={state && state.key} onChange={storeState} data={items}/>
      </Select>
      <Select value={state && state.value} valueComponent={<TextInput secondary placeholder='Choose option' outlined/>}>
        <SelectList value={state && state.key} onChange={storeState} data={items}/>
      </Select>
      <Select value={state && state.value} valueComponent={<TextInput danger placeholder='Choose option' outlined/>}>
        <SelectList value={state && state.key} onChange={storeState} data={items}/>
      </Select>
      <Select value={state && state.value} valueComponent={<TextInput success placeholder='Choose option' outlined/>}>
        <SelectList value={state && state.key} onChange={storeState} data={items}/>
      </Select>
      <Select value={state && state.value} valueComponent={<SelectInput placeholder='Choose option'/>}>
        <SelectList value={state && state.key} onChange={storeState} data={items}/>
      </Select>
      <Select value={state && state.value} valueComponent={<SelectInput placeholder='Choose option'/>}>
        <SelectList value={state && state.key} onChange={storeState} data={items}/>
      </Select>
      <Select value={state && state.value} valueComponent={<SelectInput danger placeholder='Choose option'/>}>
        <SelectList value={state && state.key} onChange={storeState} data={items}/>
      </Select>
      <Select value={state && state.value} valueComponent={<SelectInput success placeholder='Choose option'/>}>
        <SelectList value={state && state.key} onChange={storeState} data={items}/>
      </Select>
    </Row>
  ))
  .add('useTriggerComponentWidth = false', ({ state, storeState }: any) => (
    <Select value={state && state.value} useTriggerComponentWidth={false}>
      <SelectList value={state && state.key} onChange={storeState} data={items}/>
    </Select>
  ))
