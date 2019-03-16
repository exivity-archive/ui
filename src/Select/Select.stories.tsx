import React from 'react'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { Row } from '../utils/stories/components'
import { SelectInput } from '../SelectInput'
import { LONG_LIST } from './stories/seed'
import { mockFn } from '../utils/stories/mocks'

import { Select } from './'

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

export default storiesOf('molecules/Select', module)
  .addDecorator(withState({ key: '1', value: 'one' }))
  .add('default', ({ state, storeState }: any) => <Select value={state.key} onChange={storeState} data={items}/>)
  .add('custom valueComponent', ({ state, storeState }: any) => (
    <Row columns={4}>
      <Select valueComponent={<SelectInput onChange={mockFn} primary/>}
        value={state.key} onChange={storeState} data={items}/>
      <Select valueComponent={<SelectInput onChange={mockFn} secondary/>}
              value={state.key} onChange={storeState} data={items}/>
      <Select valueComponent={<SelectInput onChange={mockFn} success/>}
              value={state.key} onChange={storeState} data={items}/>
      <Select valueComponent={<SelectInput onChange={mockFn} danger/>}
              value={state.key} onChange={storeState} data={items}/>
      <Select valueComponent={<SelectInput onChange={mockFn} primary outlined/>}
              value={state.key} onChange={storeState} data={items}/>
      <Select valueComponent={<SelectInput onChange={mockFn} secondary outlined/>}
              value={state.key} onChange={storeState} data={items}/>
      <Select valueComponent={<SelectInput onChange={mockFn} success outlined/>}
              value={state.key} onChange={storeState} data={items}/>
      <Select valueComponent={<SelectInput onChange={mockFn} danger outlined/>}
              value={state.key} onChange={storeState} data={items}/>
    </Row>
  ))
  .add('Custom item', ({ state, storeState }: any) => (
    <Select value={state.key} onChange={storeState} data={items}>
      {CustomItem}
    </Select>
  ))
  .add('long', ({ state, storeState }: any) => <Select value={state.key} onChange={storeState} data={LONG_LIST}/>)
