import React from 'react'
import { storiesOf } from '@storybook/react'

import { TreeList } from './TreeList'
import { FLAT_LIST_TEST_DATA } from './stories/seed'
import { FakeRecord } from '../useExpandable/stories/seed'

const parentKeyAccessor = (item: FakeRecord) => item.parentId

console.log(FLAT_LIST_TEST_DATA)
storiesOf('organisms|TreeList', module)
  .add('default', () => <TreeList data={FLAT_LIST_TEST_DATA} parentKeyAccessor={parentKeyAccessor} />)
