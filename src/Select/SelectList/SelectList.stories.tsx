import React, { FC } from 'react'
import { storiesOf } from '@storybook/react'

import { withState } from '../../utils/tests/decorators/StateDecorator'

import { LONG_LIST } from './stories/seed'

import { SelectList } from '.'

const items = [
  { key: '1', value: 'one' },
  { key: '2', value: 'two' },
  { key: '3', value: 'three' },
  { key: '4', value: 'four' }
]

const CustomItem: FC = ({ data, style, index }: any) => {
  const { items, onChange, selectedItem } = data
  const item = items[index]

  const handleOnClick = () => onChange(item)

  return (
    <div style={{ ...style, backgroundColor: 'purple', color: 'white' }} onClick={handleOnClick}>
      {item.value} {selectedItem && item.key === selectedItem.key && 'selected'}
    </div>
  )
}

const customNoData = 'Custom noData item'

export default storiesOf('interact|Select/SelectList', module)
  .addDecorator(withState())
  .add('default', ({ state, storeState }: any) => (
    <SelectList data={items} value={state} onChange={storeState} />
  ))
  .add('Custom item', ({ state, storeState }: any) => (
    <SelectList data={items} value={state} onChange={storeState}>
      {CustomItem}
    </SelectList>
  ))
  .add('long', ({ state, storeState }: any) => (
    <SelectList data={LONG_LIST} value={state} onChange={storeState} />
  ))
  .add('no data', ({ state, storeState }: any) => (
    <SelectList data={[]} value={state} onChange={storeState} />
  ))
  .add('custom noDataText', ({ state, storeState }: any) => (
    <SelectList data={[]} noDataText={customNoData} value={state} onChange={storeState} />
  ))
  .add('custom width', ({ state, storeState }: any) => (
    <SelectList width='30%' data={LONG_LIST} value={state} onChange={storeState} />
  ))
