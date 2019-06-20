import React, { FC } from 'react'

import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { LONG_LIST } from './stories/seed'

import { SelectList } from '.'

const items = [
  { key: '1', value: 'one' },
  { key: '2', value: 'two' },
  { key: '3', value: 'three' },
  { key: '4', value: 'four' }
]

const CustomItem: FC = ({ data, style, index }: any) => {
  const { items, onChange } = data
  const item = items[index]

  const handleOnClick = () => onChange(item)

  return <div style={{ ...style, backgroundColor: 'purple', color: 'white' }} onClick={handleOnClick}>
    {item.value}
  </div>
}

const customNoData = 'Custom noData item'

export default storiesOf('molecules/SelectList', module)
  .addDecorator(withState())
  .add('default', ({ state, storeState }: any) => (
    <SelectList value={state && state.key} onChange={storeState} data={items} />
  ))
  .add('Custom item', ({ state, storeState }: any) => (
    <SelectList value={state && state.key} onChange={storeState} data={items}>
      {CustomItem}
    </SelectList>
  ))
  .add('long', ({ state, storeState }: any) => (
    <SelectList value={state && state.key} onChange={storeState} data={LONG_LIST} />
  ))
  .add('no data', ({ state, storeState }: any) => (
    <SelectList value={state && state.key} onChange={storeState} data={[]} />
  ))
  .add('custom noDataText', ({ state, storeState }: any) => (
    <SelectList value={state && state.key} onChange={storeState} data={[]} noDataText={customNoData} />
  ))
  .add('custom height', ({ state, storeState }: any) => (
    <SelectList height={800} value={state && state.key} onChange={storeState} data={LONG_LIST} />
  ))
  .add('custom width', ({ state, storeState }: any) => (
    <SelectList width='30%' value={state && state.key} onChange={storeState} data={LONG_LIST} />
  ))
