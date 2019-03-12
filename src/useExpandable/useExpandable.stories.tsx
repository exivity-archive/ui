import React from 'react'
import { FixedSizeList } from 'react-window'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { useExpandable } from '.'
import { FakeRecord, FLAT_LIST_TEST_DATA } from './stories/seed'

const getParent = (item: FakeRecord) => item.parentId

const ExpandableList = () => {
  const data = useExpandable(FLAT_LIST_TEST_DATA, getParent)

  return (
    <FixedSizeList height={600} width={400} itemSize={50} itemData={data} itemCount={data.length}>
      {Item}
    </FixedSizeList>
  )
}

const Item = ({ data, index, style }: { data: FakeRecord[], index: number, style: object}) => {
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

storiesOf('helpers|useExpandable', module)
  .add('default', () => <ExpandableList />)
