import React from 'react'
import { storiesOf } from '@storybook/react'

import { TreeList } from './TreeList'
import { FLAT_LIST_TEST_DATA } from './stories/seed'
import { FakeRecord } from '../useExpandable/stories/seed'
import { CustomItem } from './stories/CustomItem'

const parentKeyAccessor = (item: FakeRecord) => item.parentId

storiesOf('organisms|TreeList', module)
  .add('default', () => (
    <TreeList data={FLAT_LIST_TEST_DATA} parentKeyAccessor={parentKeyAccessor}/>
  ))
  .add('custom item', () => {
    return (
      <TreeList data={FLAT_LIST_TEST_DATA} parentKeyAccessor={parentKeyAccessor}>
        {CustomItem}
      </TreeList>
    )
  })
