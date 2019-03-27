import React, { useMemo } from 'react'
import styled from 'styled-components'
import { MdAdd, MdRemove } from 'react-icons/md'

import { storiesOf } from '@storybook/react'

import { useExpandable, TreeListItem, Helpers } from '.'
import { FakeRecord, FLAT_LIST_TEST_DATA } from './stories/seed'
import { ExpandableSpacer, distanceBetweenEvenLevelItem } from './ExpandableSpacer'

import { StyledList } from '../SelectList/SelectList'
import { ListFocus } from '../ListFocus'
import { ListItem } from '../ListItem'
import { Button } from '../Button'
import { Icon } from '../Icon'

const getParent = (item: FakeRecord) => item.parentId

export default storiesOf('helpers|useExpandable', module)
  .add('default', () => <ExpandableList expandedKeys={[]} />)
  .add('expandedKeys', () => <ExpandableList expandedKeys={['1', '101', '201']} />)

const ExpandableList = ({ expandedKeys }: any) => {
  const [data, helpers] = useExpandable<FakeRecord>(FLAT_LIST_TEST_DATA, getParent, expandedKeys)

  return (
    <ListFocus>
      <StyledList height={800} width={800} itemSize={80} itemData={[data, helpers]} itemCount={data.length}
        innerElementType='ul'>
        {ItemSpacer}
      </StyledList>
    </ListFocus>
  )
}

const SpaceBetween = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 20px;
  width: 100%;
`

interface ItemProps {
  data: [TreeListItem<FakeRecord>[], Helpers<FakeRecord>],
  index: number,
  style: object
}

const ItemSpacer = ({ data, index, style }: ItemProps) => {
  const [items, helpers] = data
  const item = items[index]

  const button = (
    <Button success={!item.expanded} danger={item.expanded} onClick={item.expand}>
      <Icon>{item.expanded ? <MdRemove /> : <MdAdd />}</Icon>
    </Button>
  )

  return useMemo(() => {
    return (
      <ListItem style={style}>
        <ExpandableSpacer
          level={item.attributes.level}
          button={button}
          index={index}
          hasChildren={!!item.children}
          distance={distanceBetweenEvenLevelItem(items, index)}>
          <SpaceBetween>
            {item.value}
            {!item.expanded && item.children &&
              <Button small secondary onClick={() => helpers.expand.children(item)}>Expand all children</Button>}
            {item.expanded && item.children &&
              <Button small secondary outlined onClick={() => helpers.collapse.children(item)}>Collapse all children</Button>}
            {item.expanded && item.parent &&
              <Button small secondary outlined onClick={() => helpers.collapse.parents(item)}>Collapse all parents</Button>}
          </SpaceBetween>
        </ExpandableSpacer>
      </ListItem>
    )
  }, [item])
}
