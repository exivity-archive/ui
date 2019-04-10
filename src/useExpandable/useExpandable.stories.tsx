import React, { useMemo } from 'react'
import { MdAdd, MdRemove } from 'react-icons/md'
import { Flex } from '../Flex'

// import { storiesOf } from '@storybook/react'

import { useExpandable, TreeListItem, Helpers } from '.'
import { FakeRecord, FLAT_LIST_TEST_DATA } from './stories/seed'

import { StyledList } from '../SelectList/SelectList'
import { ListFocus } from '../ListFocus'
import { ListItem } from '../ListItem'
import { Button } from '../Button'
import { Icon } from '../Icon'

const getParent = (item: FakeRecord) => item.parentId

// export default storiesOf('helpers|useExpandable', module)
//   .add('as default', () => <ExpandableList expandedKeys={[]} />)
//   .add('with expandedKeys', () => <ExpandableList expandedKeys={['1', '101', '201']} />)

const ExpandableList = ({ expandedKeys }: any) => {
  const [data, helpers] = useExpandable<FakeRecord>(FLAT_LIST_TEST_DATA, getParent, expandedKeys)

  return (
    <ListFocus>
      <StyledList height={800} width={600} itemSize={80} itemData={[data, helpers]} itemCount={data.length}
        innerElementType='ul'>
        {ItemSpacer}
      </StyledList>
    </ListFocus>
  )
}

interface ItemProps {
  data: [TreeListItem<FakeRecord>[], Helpers<FakeRecord>],
  index: number,
  style: object
}

const ItemSpacer = ({ data, index, style }: ItemProps) => {
  const [items, helpers] = data
  const item = items[index]
  const button = (
    <button onClick={item.expand}>
      <Icon>{item.expanded ? <MdRemove /> : <MdAdd />}</Icon>
    </button>
  )

  return useMemo(() => {
    return (
      <ListItem style={style}>
        <Flex direction='row' justifyContent='space-between' alignItems='center' height='100%'>
          <Flex.Item>
            {new Array(item.attributes.level).fill('  ---  ').join('|')}
            {item.children ? button : '|---'}
            {' ' + item.value}
          </Flex.Item>
          <Flex direction='row' alignItems='center' justifyContent='space-between' py={1}>
            {!item.expanded && item.children &&
              <Button small secondary onClick={() => helpers.expand.children(item)}>Expand all children</Button>}
            {item.expanded && item.children &&
              <Button small secondary outlined onClick={() => helpers.collapse.children(item)}>Collapse all
              children</Button>}
            {item.expanded && item.parent &&
              <Button small secondary outlined onClick={() => helpers.collapse.parents(item)}>Collapse all
              parents</Button>}
          </Flex>
        </Flex>
      </ListItem>
    )
  }, [item])
}
