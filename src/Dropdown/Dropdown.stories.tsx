import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { Dropdown } from '.'

storiesOf('molecules|Dropdown', module)
  .addDecorator(withState(false))
  .add('default', ({ state, storeState }: any) => {
    return (
      <div style={{ padding: '300px 0' }}>
        <Dropdown
          open={state}
          triggerComponent={
            <div onClick={() => storeState(!state)}>Click me</div>
          }>
          <div style={{ width: 500 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
          </div>
        </Dropdown>
      </div>
    )
  })
