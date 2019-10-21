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
  .add('default', ({ state, storeState }: {state: {key: string; value: string; b: number}; storeState: any}) => (
    <Select
      selected={state}
      data={items}
      placeholder='Choose an option'
      onChange={(v) => { storeState(v) }} />
  ))
  .add('open by default', ({ state, storeState }: {state: {key: string; value: string; b: number}; storeState: any}) => (
    <Select
      selected={state}
      data={items}
      defaultOpen
      placeholder='Choose an option'
      onChange={(v) => { storeState(v) }} />
  ))
  .add('custom options', ({ state, storeState }: any) => (
    <Select
      open={state ? state.open : false}
      selected={state ? state.value : ''}
      placeholder='Choose an option'
      onToggle={(open) => storeState({ ...state, open })}>
      <SelectList
        value={state}
        data={items.map((d: any) => ({ ...d, value: `Option: ${d.value}` }))}
        onChange={(v) => {
          storeState({ ...v, open: false })
        }} />
    </Select>
  ))
  .add('custom input component', ({ state, storeState }: any) => (
    <Row columns={4}>
      <Select
        selected={state}
        data={items}
        placeholder='Choose an option'
        inputComponent={(props) => <SelectInput {...props} outlined />}
        onChange={(v) => { storeState(v) }} />
    </Row>
  ))
  .add('useTriggerComponentWidth = false', ({ state, storeState }: any) => (
    <Select
      selected={state}
      data={items}
      placeholder='Choose an option'
      useInputComponentWidth={false}
      onChange={(v) => { storeState(v) }} />
  ))
  .add('onOutsideClick', ({ state, storeState }: any) => (
    <Select
      selected={state}
      data={items}
      placeholder='Choose an option'
      onChange={(v) => { storeState(v) }}
      onOutsideClick={(isOpen, close) => {
        window.alert(`Clicked outside! Dropdown status: ${isOpen ? 'open' : 'closed'}`)
        close()
      }} />
  ))
  .add('disabled', ({ state, storeState }: any) => (
    <Select
      disabled
      selected={state}
      data={items}
      placeholder='Choose an option'
      onChange={(v) => { storeState(v) }} />
  ))
  .add('contolled', ({ state, storeState }: any) => {
    const [open, setOpen] = React.useState<boolean>(false)
    return (
      <Select
        selected={state && state.value ? state : undefined}
        data={items}
        open={open}
        placeholder='Choose an option'
        onToggle={(open) => setOpen(open)}
        onChange={(v) => storeState(v)} />
    )
  })
