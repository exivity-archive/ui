import React from 'react'
import { storiesOf } from '@storybook/react'

import { withState } from '../utils/tests/decorators/StateDecorator'
import { SelectList } from '../SelectList'
import { SelectInput } from '../SelectInput'
import { Row } from '../utils/stories/components'

import { Select } from '.'

const items = [
  { key: '1', value: 'one' },
  { key: '2', value: 'two' },
  { key: '3', value: 'three' },
  { key: '4', value: 'four' }
]

export default storiesOf('molecules/Select', module)
  .addDecorator(withState())
  // @ts-ignore
  .add('default', ({ state, storeState }: {state: {key: string, value: string, b: number}, storeState: any}) => (
    <Select
      selected={state}
      data={items}
      onChange={(v) => { storeState(v) }}
      placeholder='Choose an option'
    />
  ))
  .add('open by default', ({ state, storeState }: {state: {key: string, value: string, b: number}, storeState: any}) => (
    <Select
      selected={state}
      data={items}
      defaultOpen={true}
      onChange={(v) => { storeState(v) }}
      placeholder='Choose an option'
    />
  ))
  .add('custom options', ({ state, storeState }: any) => (
    <Select
      open={state ? state.open : false}
      selected={state ? state.value : ''}
      onToggle={(open) => storeState({ ...state, open })}
      placeholder='Choose an option'
    >
      <SelectList
        value={state}
        data={items.map((d: any) => ({ ...d, value: `Option: ${d.value}` }))}
        onChange={(v) => {
          storeState({ ...v, open: false })
        }}
      />
    </Select>
  ))
  .add('custom input component', ({ state, storeState }: any) => (
    <Row columns={4}>
      <Select
        selected={state}
        data={items}
        onChange={(v) => { storeState(v) }}
        placeholder='Choose an option'
        InputComponent={React.forwardRef((props, ref) => <SelectInput {...props} ref={ref} outlined />)}
      />
    </Row>
  ))
  .add('useTriggerComponentWidth = false', ({ state, storeState }: any) => (
    <Select
      selected={state}
      data={items}
      onChange={(v) => { storeState(v) }}
      placeholder='Choose an option'
      useInputComponentWidth={false}
    />
  ))
  .add('onOutsideClick', ({ state, storeState }: any) => (
    <Select
      selected={state}
      data={items}
      onChange={(v) => { storeState(v) }}
      placeholder='Choose an option'
      onOutsideClick={(isOpen, close) => {
        window.alert(`Clicked outside! Dropdown status: ${isOpen ? 'open' : 'closed'}`)
        close()
      }}
    />
  ))
  .add('disabled', ({ state, storeState }: any) => (
    <Select
      disabled
      selected={state}
      data={items}
      onChange={(v) => { storeState(v) }}
      placeholder='Choose an option'
    />
  ))
  .add('contolled', ({ state, storeState }: any) => {
    const [open, setOpen] = React.useState<boolean>(false)
    return (
      <Select
        selected={state && state.value ? state : undefined}
        data={items}
        open={open}
        onToggle={(open) => setOpen(open)}
        onChange={(v) => storeState(v)}
        placeholder='Choose an option'
      />
    )
  })
