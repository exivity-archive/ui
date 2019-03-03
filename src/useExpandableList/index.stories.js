import React from 'react'
import { FixedSizeList } from 'react-window'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { useExpandableList } from '../useExpandableList'
import { FLAT_LIST_TEST_DATA } from './__stories__/seed'

const getParent = (item) => item.parentId

const ExpandableList = () => {
  const data = useExpandableList(FLAT_LIST_TEST_DATA, getParent)

  return (
    <FixedSizeList height={600} width={400} itemSize={50} itemData={data} itemCount={data.length}>
      {Item}
    </FixedSizeList>
  )
}

export default storiesOf('List hooks', module)
  .add('useExpandableList', () => <ExpandableList />)

const Item = ({ data, index, style }) => {
  const item = data[index]
  const space = new Array(item.attributes.level)

  return (
    <div onClick={() => {
      item.expand()
      action('expand')(item)
    }} style={style}>
      {item ? space.join('|----  ') + '+  ' + String(item.value) : space.join('|----  ') + String(item.value)}
    </div>
  )
}
