import React from 'react'
import { storiesOf } from '@storybook/react'

import { TreeList } from './TreeList'
import { FLAT_LIST_TEST_DATA } from './stories/seed'
import { FakeRecord } from '../useExpandable/stories/seed'
import { CustomItem, ModifiedDefaultItem } from './stories/Items'

const parentKeyAccessor = (item: FakeRecord) => item.parentId
const keyAccessor = (item: FakeRecord) => item.key

storiesOf('organisms|TreeList', module)
  .add('default', () => <TreeList data={FLAT_LIST_TEST_DATA} keyAccessor={keyAccessor} parentKeyAccessor={parentKeyAccessor} />)
  .add('custom item', () => {
    return (
      <TreeList data={FLAT_LIST_TEST_DATA} keyAccessor={keyAccessor} parentKeyAccessor={parentKeyAccessor}>
        {CustomItem}
      </TreeList>
    )
  })
  .add('modified item', () => {
    return (
      <TreeList data={FLAT_LIST_TEST_DATA} keyAccessor={keyAccessor} parentKeyAccessor={parentKeyAccessor}>
        {ModifiedDefaultItem}
      </TreeList>
    )
  })
  .add('auto height', () => {
    return (
      <TreeList
        maxItemsRendered='auto'
        height={300}
        data={FLAT_LIST_TEST_DATA}
        keyAccessor={keyAccessor}
        parentKeyAccessor={parentKeyAccessor} />
    )
  })
