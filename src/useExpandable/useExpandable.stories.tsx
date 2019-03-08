import React from 'react'
import { FixedSizeList } from 'react-window'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ExpandableSpacer, { distanceBetweenEvenLevelItem } from './ExpandableSpacer'
import useExpandable from './useExpandable'
import { FakeRecord, FLAT_LIST_TEST_DATA } from './__stories__/seed'

const getParent = (item: FakeRecord) => item.parentId

const ExpandableList = ({ item }) => {
  const data = useExpandable(FLAT_LIST_TEST_DATA, getParent)

  return (
    <FixedSizeList height={600} width={400} itemSize={50} itemData={data} itemCount={data.length}>
      {item}
    </FixedSizeList>
  )
}

export default storiesOf('helpers|useExpandable', module)
  .add('default', () => <ExpandableList item={Item} />)
  .add('with spacer', () => <ExpandableList item={ItemWithSpacer} />)

interface ItemProps {
  data: (FakeRecord & { expand: () => void, expanded: boolean, index: number })[],
  index: number,
  style: object
}

const Item = ({ data, index, style }: ItemProps) => {
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

const ItemWithSpacer = ({ data, index, style }: ItemProps) => {
  const item = data[index]
  return (
    <div style={style}>
      <ExpandableSpacer
        level={item.attributes.level}
        button={<button style={{ zIndex: 2 }} onClick={() => {
          item.expand()
          action('expand')(item)
        }}>Expand</button>}
        index={index}
        length={data.length}
        distance={distanceBetweenEvenLevelItem(data, index)}>
        {item.value}
      </ExpandableSpacer>
    </div>
  )
}
