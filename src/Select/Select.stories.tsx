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

const CustomSelectList: React.FC<any> = ({ close, select, value, data }) => (
  <SelectList
    value={value}
    data={data.map((d: any) => ({ ...d, value: `Option: ${d.value}` }))}
    onChange={(item) => {
      select(item)
      close()
    }}
  />
)

const CustomInput = React.forwardRef((props, ref: any) => (
  <SelectInput {...props} ref={ref} outlined />
))

export default storiesOf('molecules/Select', module)
  .addDecorator(withState())
  // @ts-ignore
  .add('default', ({ state, storeState }: any) => (
    <Select
      value={state || undefined}
      data={items}
      onChange={storeState}
      placeholder='Choose an option'
    />
  ))
  .add('custom options', ({ state, storeState }: any) => {
    return (
      <Select
        value={state || undefined}
        data={items}
        onChange={storeState}
        placeholder='Choose an option'
        OptionsComponent={CustomSelectList}
      />
    )
  })
  .add('custom input component', ({ state, storeState }: any) => (
    <Row columns={4}>
      <Select
        value={state || undefined}
        data={items}
        onChange={storeState}
        placeholder='Choose an option'
        InputComponent={CustomInput}
      />
    </Row>
  ))
  .add('useTriggerComponentWidth = false', ({ state, storeState }: any) => (
    <Select
      value={state || undefined}
      useInputComponentWidth={false}
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
      onOutsideClick={(isOpen, close) => {
        window.alert(`Clicked outside! Dropdown status: ${isOpen ? 'open' : 'closed'}`)
        close()
      }}
    />
  ))
  .add('disabled', ({ state, storeState }: any) => (
    <Select
      disabled
      placeholder='Here is disabled select'
      value={state || undefined}
      data={items}
      onChange={storeState}
    />
  ))
