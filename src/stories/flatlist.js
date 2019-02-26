import React from 'react'
import { FixedSizeList, areEqual } from 'react-window'
import { createExpandedListItems } from '../components/molecules/List/useExpandableList/helpers'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import List, { Row } from '../components/molecules/List'
import { useExpandableList } from '../components/molecules/List/useExpandableList/useExpandableList'
import { FLAT_LIST_TEST_DATA } from './Faker/flatlist'

const getParent = (item) => item.parentId

const ExpandableList = () => {
  const props = useExpandableList(FLAT_LIST_TEST_DATA, getParent)

  return (
    <FixedSizeList height={600} width={400} itemSize={50} {...props}>
      {Item}
    </FixedSizeList>
  )
}

export default storiesOf('List hooks', module)
  .add('default', () =>  (
    <List height={800} width={400} data={FLAT_LIST_TEST_DATA} itemSize={50}>
      {Row}
    </List>
  ))
  .add('useExpandableList', () =>  <ExpandableList/>)
  .add('useSearchList', () => <ExpandableList/>)

const Item = ({ data, index, style }) => {
  const item = data[index]
  const space = new Array(item.attributes.level)

  return (
    <div onClick={item.expand} style={style}>
      {item ? space.join('|----  ') + '+  ' + String(item.value) : space.join('|----  ') +  String(item.value)}
    </div>
  )
}