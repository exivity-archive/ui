import React, { useMemo } from 'react'
import styled from 'styled-components'
import { FixedSizeList } from 'react-window'
import { MdAdd, MdRemove } from 'react-icons/md'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { useExpandable, TreeListItem, Helpers } from '.'
import { FakeRecord, FLAT_LIST_TEST_DATA } from './stories/seed'
import { ExpandableSpacer, distanceBetweenEvenLevelItem } from './ExpandableSpacer'

import { StyledList } from '../Select/Select'
import { ListItem } from '../ListItem'
import { Button } from '../Button'
import { Icon } from '../Icon'

const getParent = (item: FakeRecord) => item.parentId

export default storiesOf('helpers|useExpandable', module)
  .add('default', () => <ExpandableList expandedKeys={[]}/>)
  .add('expandedKeys', () => <ExpandableList expandedKeys={['1', '101', '201']}/>)

const ExpandableList = ({ expandedKeys }: any) => {
  const [data, helpers] = useExpandable<FakeRecord>(FLAT_LIST_TEST_DATA, getParent, expandedKeys)

  return (
    <StyledList height={800} width={600} itemSize={50} itemData={[data, helpers]} itemCount={data.length}
      innerElementType='ul'>
      {ItemSpacer}
    </StyledList>
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

  const button = (item.children ?
    <Button round small success={!item.expanded} danger={item.expanded} onClick={item.expand}>
      <Icon>{item.expanded ? <MdRemove/> : <MdAdd/>}</Icon>
    </Button>
      : null
  )

  return useMemo(() => {
    return (
      <ListItem style={style} tabIndex={index + 1}>
        <ExpandableSpacer
          level={item.attributes.level}
          button={button}
          index={index}
          distance={distanceBetweenEvenLevelItem(items, index)}>
          <SpaceBetween>
            {item.value}
            {!item.expanded && item.children &&
              <Button tiny secondary onClick={() => helpers.expand.children(item)}>Expand all children</Button>}
            {item.expanded && item.children &&
              <Button tiny secondary outlined onClick={() => helpers.collapse.children(item)}>Collapse all children</Button>}
            {item.expanded && item.parent &&
              <Button tiny secondary outlined onClick={() => helpers.collapse.parents(item)}>Collapse all parents</Button>}
          </SpaceBetween>
        </ExpandableSpacer>
      </ListItem>
    )
  }, [item])
}
