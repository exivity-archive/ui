import React from 'react'
import { FixedSizeList } from 'react-window'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { useExpandableList } from '../useExpandableList'
import { FLAT_LIST_TEST_DATA } from './Faker/flatlist'
import useDynamicAttribute from '../useDynamicAttribute';

const getParent = (item) => item.parentId

const ExpandableList = () => {
  const data = useExpandableList(FLAT_LIST_TEST_DATA, getParent)

  return (
    <FixedSizeList height={600} width={400} itemSize={50} itemData={data} itemCount={data.length}>
      {ExpandableItem}
    </FixedSizeList>
  )
}

const CheckableList = () => {
  const data = useDynamicAttribute(FLAT_LIST_TEST_DATA, 'checked', 'setChecked', true) 

  return (
    <FixedSizeList height={600} width={400} itemSize={50} itemData={data} itemCount={data.length}>
      {CheckableItem}
    </FixedSizeList>
  )
}

export default storiesOf('List hooks', module)
  .add('useExpandableList', () =>  <ExpandableList/>)
  .add('useDynamicAttribute', () => <CheckableList/>)

const ExpandableItem = ({ data, index, style }) => {
  const item = data[index]
  const space = new Array(item.attributes.level)

  return (
    <div onClick={() => {
      item.expand()
      action('expand')(item)
    }} style={style}>
      {item ? space.join('|----  ') + '+  ' + String(item.value) : space.join('|----  ') +  String(item.value)}
    </div>
  )
}

const CheckableItem = ({ data, index, style }) => {
  const item = data[index]
  console.log(index, item.checked)
  return (
    <div key={index}>
      <input type='checkbox' checked={item.checked} onChange={(e) => item.setChecked(e.target.checked, data)}></input>
    </div>
  )
}
