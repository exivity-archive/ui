import React from 'react'
import { FixedSizeList } from 'react-window'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { useExpandable } from './useExpandable'
import Button from '../Button'
import ExpandableSpacer, { distanceBetweenEvenLevelItem } from './ExpandableSpacer'
import { FLAT_LIST_TEST_DATA } from './__stories__/seed'

const getParent = (item) => item.parentId

const ExpandableList = ({ item }) => {
  const data = useExpandable(FLAT_LIST_TEST_DATA, getParent)

  return (
    <FixedSizeList height={600} width={400} itemSize={50} itemData={data} itemCount={data.length}>
      {item}
    </FixedSizeList>
  )
}

export default storiesOf('List hooks', module)
  .add('useExpandable', () => <ExpandableList item={Item} />)
  .add('expandable spacer', () => <ExpandableList item={ItemWithSpacer} />)

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

const ItemWithSpacer = ({ data, index, style }) => {
  const item = data[index]
  return (
    <div style={style}>
      <ExpandableSpacer
        level={item.attributes.level}
        button={<Button style={{ zIndex: 2 }} onClick={() => {
          item.expand()
          action('expand')(item)
        }}>Expand</Button>}
        index={index}
        length={data.length}
        distance={distanceBetweenEvenLevelItem(data, index)}>
        {item.value}
      </ExpandableSpacer>
    </div>
  )
}