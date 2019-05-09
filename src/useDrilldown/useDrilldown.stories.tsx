import React, { useMemo } from 'react'
import { MdAdd, MdRemove } from 'react-icons/md'
import { Flex } from '../Flex'

import { storiesOf } from '@storybook/react'

import { useDrilldown, DrilldownItem } from '.'
import { FakeRecord, FLAT_LIST_TEST_DATA } from './stories/seed'

import { StyledList } from '../SelectList/SelectList'
import { ListFocus } from '../ListFocus'
import { ListItem } from '../ListItem'
import { Icon } from '../Icon'

const getParent = (item: FakeRecord) => item.parentId

export default storiesOf('helpers|useDrilldown', module)
  .add('as default', () => <DrilldownList />)

const DrilldownList = () => {
  const data = useDrilldown<FakeRecord>(FLAT_LIST_TEST_DATA, getParent)

  return (
    <ListFocus>
      <StyledList height={800} width={600} itemSize={80} itemData={data} itemCount={data.length}
        innerElementType='ul'>
        {ItemSpacer}
      </StyledList>
    </ListFocus>
  )
}

interface ItemProps {
  data: DrilldownItem<FakeRecord>[],
  index: number,
  style: object
}

const ItemSpacer = ({ data, index, style }: ItemProps) => {
  const item = data[index]
  const button = (
    <button onClick={item.drilldown}>
      <Icon>{item.drilldown ? <MdRemove /> : <MdAdd />}</Icon>
    </button>
  )

  return useMemo(() => {
    return (
      <ListItem style={style}>
        <Flex direction='row' justifyContent='space-between' alignItems='center' height='100%'>
          <Flex.Item>
            {new Array(item.attributes.level).fill('  ---  ').join('|')}
            {item.hiddenChildren.length ? button : '|---'}
            {' ' + item.value}
          </Flex.Item>
        </Flex>
      </ListItem>
    )
  }, [item])
}
