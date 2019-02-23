import React from 'react'
import { FixedSizeList, areEqual } from 'react-window'
import { FLAT_LIST_TEST_DATA } from './Faker/flatlist'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import List, { Row } from '../components/molecules/List'
import { useExpandableList } from '../components/molecules/List/useExpandableList'

const ExpandableList = () => {
  const props = useExpandableList(FLAT_LIST_TEST_DATA)

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
    <div onClick={item.onClick} style={style}>
      {item.children.length ? space.join('|----  ') + '+  ' + String(item.value) : space.join('|----  ') +  String(item.value)}
    </div>
  )
}