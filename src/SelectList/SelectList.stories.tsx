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
  .add('default', () => (
    <SelectList data={items} />
  ))
  .add('Custom item', () => (
    <SelectList data={items}>
      {CustomItem}
    </SelectList>
  ))
  .add('long', () => (
    <SelectList data={LONG_LIST} />
  ))
  .add('no data', () => (
    <SelectList data={[]} />
  ))
  .add('custom noDataText', () => (
    <SelectList data={[]} noDataText={customNoData} />
  ))
  .add('custom width', () => (
    <SelectList width='30%' data={LONG_LIST} />
  ))
