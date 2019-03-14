import React, { useMemo } from 'react'
import { FixedSizeList } from 'react-window'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { useExpandable, TreeListItem } from '.'
import { FakeRecord, FLAT_LIST_TEST_DATA } from './stories/seed'

const getParent = (item: FakeRecord) => item.parentId
const keys = ['1']
const ExpandableList = () => {
  console.time('start')
  const [data] = useExpandable<FakeRecord>(FLAT_LIST_TEST_DATA, getParent, keys)
  console.timeEnd('start')

  return (
    <FixedSizeList height={600} width={400} itemSize={50} itemData={data} itemCount={data.length} >
      {Item}
    </FixedSizeList>
  )
}

const Item = ({ data, index, style }: { data: TreeListItem<FakeRecord>[], index: number, style: object}) => {
  const item = data[index]
  const space = new Array(item.attributes.level)
  // // @ts-ignore
  // console.log(item.children)
  return useMemo(() => {
    return (
      <div onClick={item.expand} style={style}>
        {item
          ? space.join('|----  ') + '+  ' + String(item.value)
          : space.join('|----  ') + String(item.value)}
      </div>
    )
  }, [item])
}

storiesOf('helpers|useExpandable', module)
  .add('default', () => <ExpandableList />)
