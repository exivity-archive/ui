import React, { useMemo } from 'react'
import { MdAdd, MdDelete } from 'react-icons/md'
import { Flex } from '../Flex'

import { storiesOf } from '@storybook/react'

import { useDrilldown, DrilldownItem } from '.'
import { FakeRecord, FLAT_LIST_TEST_DATA } from './stories/seed'

import { SelectList } from '../SelectList/SelectList'
import { ListFocus } from '../ListFocus'
import { ListItem } from '../ListItem'
import { Icon } from '../Icon'
import { Select } from '../Select'

const getParent = (item: FakeRecord) => item.parentId

export default storiesOf('helpers|useDrilldown', module)
  .add('as default', () => <DrilldownList />)

const DrilldownList = () => {
  const data = useDrilldown<FakeRecord>(FLAT_LIST_TEST_DATA, getParent)

  return (
    <ListFocus>
      {data.map(item => <DrilldownListItem key={item.key} item={item} />)}
    </ListFocus>
  )
}

interface ItemProps {
  item: DrilldownItem<FakeRecord>,
}

const DrilldownListItem = ({ item }: ItemProps) => {

  const drilldownButton = (
    <button onClick={item.drilldown}>
      <Icon>{<MdAdd />}</Icon>
    </button>
  )

  const removeButton = (
    <button onClick={item.remove}>
      <Icon>{<MdDelete />}</Icon>
    </button>
  )

  return useMemo(() => {
    return (
      <ListItem >
        <Flex direction='row' justifyContent='space-between' alignItems='flex-start' height='100%'>
          <Flex.Item>
            {new Array(item.attributes.level).fill('  ---  ').join('|')}
            {item.hiddenChildren.length ? drilldownButton : '|---'}
          </Flex.Item>
          <Flex.Item>
            <Select value={item.value}>
              <SelectList data={item.getHiddenSiblings()} onChange={item.replace} />
            </Select>
          </Flex.Item>
          <Flex.Item>
            {item.level !== 1 && removeButton}
          </Flex.Item>
        </Flex>
      </ListItem>
    )
  }, [item])
}
