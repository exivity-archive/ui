import React, { useMemo, ReactElement } from 'react'
import { storiesOf } from '@storybook/react'

import { BranchSpacer } from './BranchSpacer'
import { FakeRecord, FLAT_LIST_TEST_DATA } from './stories/seed'
import { ListFocus, Flex, ListItem, Button } from '..'
import { StyledList } from '../SelectList/SelectList'
import { TreeItem, makeParentChildTree } from '../utils/makeParentChildTree'

storiesOf('molecules|BranchSpacer', module)
  .add('default', () => <List />)
  .add('with button', () => <List button={<Button />} />)

const parentKeyAccessor = (item: FakeRecord) => item.parentId

interface ListProps {
  button?: ReactElement
  spacing?: number
}

const List = ({ button, spacing }: ListProps) => {
  const parentChildData = makeParentChildTree(FLAT_LIST_TEST_DATA, parentKeyAccessor)

  return (
    <ListFocus>
      <StyledList height={800} width={600} itemSize={80} itemData={parentChildData} itemCount={parentChildData.length}
        innerElementType='ul'>
        {makeItemSpacer(button, spacing)}
      </StyledList>
    </ListFocus>
  )
}

interface ItemProps {
  data: TreeItem<FakeRecord>[]
  index: number
  style: object
}

const makeItemSpacer = (button?: ReactElement, spacing?: number) => {
  return ({ data, index, style }: ItemProps) => {
    const item = data[index]

    return useMemo(() => {
      return (
        <ListItem style={style}>
          <BranchSpacer data={data} index={index} button={button} spacing={spacing} >
            <Flex direction='row' justifyContent='space-between' alignItems='center' height='100%'>
            </Flex>
          </BranchSpacer>
        </ListItem>
      )
    }, [item])
  }
}
