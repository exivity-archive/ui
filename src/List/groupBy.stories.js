import React from 'react'
import { FixedSizeList } from 'react-window'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { groupBy } from '.'
import { FLAT_LIST_TEST_DATA } from './__stories__/seed'

const GroupedList = () => {
  const data = groupBy(FLAT_LIST_TEST_DATA, 'group')

  return (
    <FixedSizeList height={600} width={400} itemSize={50} itemData={data} itemCount={data.length}>
      {Item}
    </FixedSizeList>
  )
}

export default storiesOf('List hooks', module)
  .add('groupBy', () => <GroupedList />)

const Item = ({ data, index, style }) => {
  const item = data[index]

  if (item.group) {
    return (
      <div style={style}>
        <h4>{item.group.toUpperCase()}</h4>
      </div>
    )
  }

  return (
    <div style={style}>
      {item.value}
    </div>
  )
}
