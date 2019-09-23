import React from 'react'

import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'

import { Select } from '.'
import { SelectList } from '../SelectList'
import { SelectInput } from '../SelectInput'
import { Row } from '../utils/stories/components'

const items = [
  { key: '1', value: 'one' },
  { key: '2', value: 'two' },
  { key: '3', value: 'three' },
  { key: '4', value: 'four' }
]

export default storiesOf('molecules/Select', module)
  .addDecorator(withState())
  // @ts-ignore
  .add('default', ({ state, storeState }: any) => (
    <Select
      value={state || undefined}
      data={items}
      onChange={storeState}
      placeholder='Choose option'
    />
  ))
  .add('custom options', ({ state, storeState }: any) => (
    <Select
      value={state || undefined}
      data={items}
      placeholder='Choose option'
    >
      {({ close, value, data }) => (
        <SelectList
          value={value}
          data={data.map((d) => ({ ...d, value: `Option: ${d.value}` }))}
          onChange={(newState) => {
            storeState(newState)
            close()
          }}
        />
      )}
    </Select>
  ))
  .add('custom triggerComponent', ({ state, storeState }: any) => (
    <Row columns={4}>
      <Select
        value={state || undefined}
        data={items}
        onChange={storeState}
        triggerComponent={<SelectInput placeholder='Choose option' outlined />}
      />
    </Row>
  ))
  .add('useTriggerComponentWidth = false', ({ state, storeState }: any) => (
    <Select
      value={state || undefined}
      useTriggerComponentWidth={false}
      placeholder='Choose option'
      onChange={storeState}
      data={items}
    />
  ))
  .add('onOutsideClick (dropdown)', ({ state, storeState }: any) => (
    <Select
      placeholder='Click on me or outside'
      value={state || undefined}
      onChange={storeState}
      data={[{ key: '1 ', value: 'click outside' }]}
      useTriggerComponentWidth={false}
      onOutsideClick={(isOpen) => {
        window.alert(`Clicked outside! Dropdown status: ${isOpen ? 'open' : 'closed'}`)
      }}
    />
  ))
  .add('disabled', ({ state, storeState }: any) => (
    <Select
      disabled
      value={state || undefined}
      data={items}
      onChange={storeState}
      triggerComponent={<SelectInput success placeholder='Choose option' />}
    />
  ))
