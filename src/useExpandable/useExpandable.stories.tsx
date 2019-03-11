import React from 'react'
import { FixedSizeList } from 'react-window'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { useExpandable } from '.'
import { useSelectable } from '../useSelect'
import { FakeRecord, FLAT_LIST_TEST_DATA } from './stories/seed'

const getParent = (item: FakeRecord) => item.parentId

const ExpandableList = () => {
  const data = useExpandable(FLAT_LIST_TEST_DATA, getParent)
  const [selected, selectableData] = useSelectable(data)
  // console.log(selectableData, selected)

  return (
    <FixedSizeList height={600} width={400} itemSize={50} itemData={selectableData} itemCount={selectableData.length}>
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
      item.select()
      action('expand')(item)
    }} style={style}>
      {item ? space.join('|----  ') + '+  ' + String(item.value) : space.join('|----  ') + String(item.value)}
    </div>
  )
}

storiesOf('helpers|useExpandable', module)
  .add('default', () => <ExpandableList />)
