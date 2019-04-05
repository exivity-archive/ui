import React from 'react'
import { FixedSizeList } from 'react-window'

import { storiesOf } from '@storybook/react'

import useDynamicAttribute from '.'
import { FLAT_LIST_TEST_DATA } from './stories/seed'

export default storiesOf('helpers|useDynamicAttribute', module)
  .add('default', () => <CheckableList />)

const CheckableList = () => {
  const data = useDynamicAttribute(FLAT_LIST_TEST_DATA, 'checked', 'setChecked', true)

  return (
    <FixedSizeList height={600} width={400} itemSize={50} itemData={data} itemCount={data.length}>
      {Item}
    </FixedSizeList>
  )
}

const Item = ({ data, index, style }) => {
  const item = data[index]
  return (
    <div key={index} style={style}>
      {item.value}
    </div>
  )
}
