import React, { useMemo } from 'react'
import { storiesOf } from '@storybook/react'
import { FixedSizeList } from 'react-window'

import { TreeItem, makeParentChildTree } from '../utils/makeParentChildTree'

import { BranchSpacer } from './BranchSpacer'
import { FakeRecord, FLAT_LIST_TEST_DATA } from './stories/seed'

import { ListFocus, ListItem } from '..'

storiesOf('molecules|BranchSpacer', module)
  .add('default', () => <BranchList />)
  .add('spacing', () => <BranchList spacing={60} />)
  .add('spacing and padding', () => <BranchList spacing={60} padding={10} />)

const parentKeyAccessor = (item: FakeRecord) => item.parentId

interface ListProps {
  spacing?: number;
  padding?: number;
}

const BranchList = ({ spacing, padding }: ListProps) => {
  const parentChildData = makeParentChildTree(FLAT_LIST_TEST_DATA, parentKeyAccessor)

  return (
    <ListFocus>
      <FixedSizeList height={800} width={600} itemSize={40} itemData={parentChildData} itemCount={parentChildData.length}
        innerElementType='ul'>
        {makeItemSpacer(spacing, padding)}
      </FixedSizeList>
    </ListFocus>
  )
}

interface ItemProps {
  data: TreeItem<FakeRecord>[];
  index: number;
  style: object;
}

const makeItemSpacer = (spacing?: number, padding?: number) => {
  return ({ data, index, style }: ItemProps) => {
    const item = data[index]

    return useMemo(() => {
      return (
        <ListItem style={style}>
          <BranchSpacer
            data={data}
            index={index}
            spacing={spacing}
            padding={padding}>
            X
          </BranchSpacer>
        </ListItem>
      )
    }, [item])
  }
}
