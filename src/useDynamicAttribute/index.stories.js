import React from 'react'
import { FixedSizeList } from 'react-window'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import useDynamicAttribute from '.'
import { FLAT_LIST_TEST_DATA } from './__stories__/seed'

import useExpandable from '../useExpandable'
const getParent = (item) => item.parentId

const CheckableList = () => {
  const data1 = useExpandable(FLAT_LIST_TEST_DATA, getParent)
  const data = useDynamicAttribute(data1, 'checked', 'setChecked', item => item.checked)

  return (
    <FixedSizeList height={600} width={400} itemSize={50} itemData={data} itemCount={data.length}>
      {Item}
    </FixedSizeList>
  )
}

export default storiesOf('List hooks', module)
  .add('useDynamicAttribute', () => <CheckableList />)

const Item = ({ data, index, style }) => {
  const item = data[index]
  return (
    <div key={index} style={style}>
      {item.value}:
      <input type='checkbox' checked={item.checked} onChange={(e) => {
        item.setChecked(e.target.checked)
        action(`toggle checkbox for ${item.value}'`, e.target.checked)
      }
      }></input>
    </div>
  )
}
