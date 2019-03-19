import React from 'react'

import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { Row } from '../utils/stories/components'
import { SelectInput } from '../SelectInput'
import { LONG_LIST } from './stories/seed'
import { mockFn } from '../utils/stories/mocks'

import { Select } from '.'

const items = [
  { key: '1', value: 'one' },
  { key: '2', value: 'two' },
  { key: '3', value: 'three' },
  { key: '4', value: 'four' }
]

const CustomItem: React.FC = ({ data, style, index }: any) => {
  const { items, setIsOpen, onChange } = data
  const item = items[index]

  const handleOnClick = () => {
    setIsOpen(false)
    onChange(item)
  }

  return <div style={{ ...style, backgroundColor: 'purple', color: 'white' }} onClick={handleOnClick}>
    {item.value}
  </div>
}

const customNoData = 'Custom noData item'

export default storiesOf('molecules/Select', module)
  .addDecorator(withState())
  .add('default', ({ state, storeState }: any) => (
    <Select name='Select' placeholder='Choose option' value={state && state.key} onChange={storeState} data={items}/>
  ))
  .add('custom valueComponent', ({ state, storeState }: any) => (
    <Row columns={4}>
      <Select name='Select' placeholder='Choose option' valueComponent={<SelectInput onChange={mockFn} primary/>}
        value={state && state.key} onChange={storeState} data={items}/>
      <Select name='Select' placeholder='Choose option' valueComponent={<SelectInput onChange={mockFn} secondary/>}
              value={state && state.key} onChange={storeState} data={items}/>
      <Select name='Select' placeholder='Choose option' valueComponent={<SelectInput onChange={mockFn} success/>}
              value={state && state.key} onChange={storeState} data={items}/>
      <Select name='Select' placeholder='Choose option' valueComponent={<SelectInput onChange={mockFn} danger/>}
              value={state && state.key} onChange={storeState} data={items}/>
      <Select name='Select' placeholder='Choose option' valueComponent={<SelectInput onChange={mockFn} primary outlined/>}
              value={state && state.key} onChange={storeState} data={items}/>
      <Select name='Select' placeholder='Choose option' valueComponent={<SelectInput onChange={mockFn} secondary outlined/>}
              value={state && state.key} onChange={storeState} data={items}/>
      <Select name='Select' placeholder='Choose option' valueComponent={<SelectInput onChange={mockFn} success outlined/>}
              value={state && state.key} onChange={storeState} data={items}/>
      <Select name='Select' placeholder='Choose option' valueComponent={<SelectInput onChange={mockFn} danger outlined/>}
              value={state && state.key} onChange={storeState} data={items}/>
    </Row>
  ))
  .add('Custom item', ({ state, storeState }: any) => (
    <Select name='Select' placeholder='Choose option' value={state && state.key} onChange={storeState} data={items}>
      {CustomItem}
    </Select>
  ))
  .add('long', ({ state, storeState }: any) => (
    <Select name='Select' placeholder='Choose option' value={state && state.key} onChange={storeState} data={LONG_LIST}/>
  ))
  .add('no data', ({ state, storeState }: any) => (
    <Select name='Select' placeholder='Choose option' value={state && state.key} onChange={storeState} data={[]}/>
  ))
  .add('custom noDataText', ({ state, storeState }: any) => (
    <Select name='Select' value={state && state.key} onChange={storeState} data={[]} noDataText={customNoData}/>
  ))
