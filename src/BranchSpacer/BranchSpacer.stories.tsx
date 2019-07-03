import React, { useMemo } from 'react'
import { storiesOf } from '@storybook/react'

import { BranchSpacer } from './BranchSpacer'
import { FakeRecord, FLAT_LIST_TEST_DATA } from './stories/seed'
import { ListFocus, ListItem } from '..'
import { StyledList } from '../SelectList/SelectList'
import { TreeItem, makeParentChildTree } from '../utils/makeParentChildTree'

storiesOf('molecules|BranchSpacer', module)
  .add('default', () => <List />)
  .add('spacing', () => <List spacing={60} />)

const parentKeyAccessor = (item: FakeRecord) => item.parentId

interface ListProps {
  spacing?: number
}

const List = ({ spacing }: ListProps) => {
  const parentChildData = makeParentChildTree(FLAT_LIST_TEST_DATA, parentKeyAccessor)

  return (
    <ListFocus>
      <StyledList height={800} width={600} itemSize={40} itemData={parentChildData} itemCount={parentChildData.length}
        innerElementType='ul'>
        {makeItemSpacer(spacing)}
      </StyledList>
    </ListFocus>
  )
}

interface ItemProps {
  data: TreeItem<FakeRecord>[],
  index: number,
  style: object
}

const makeItemSpacer = (spacing?: number) => {
  return ({ data, index, style }: ItemProps) => {
    const item = data[index]

    return useMemo(() => {
      return (
        <ListItem style={style}>
          <BranchSpacer data={data} index={index} spacing={spacing} >
            {'X'}
          </BranchSpacer>
        </ListItem>
      )
    }, [item])
  }
}
