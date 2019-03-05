import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/testing/decorators/StateDecorator'
import { storeAndAction } from '../utils/testing/storeAndAction'
import TextInput from './TextInput'
import Checkbox from '../Checkbox'
import Dropdown from '../Dropdown'

const Row = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(10, fit-content(200px));
`

export default storiesOf('forms|TextInput', module)
  .addDecorator(withState(''))
  .add('default', ({ state, storeState }) => <TextInput
    placeholder='Type something...'
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('purposes', () => <Row>
    <TextInput primary value='Primary'/>
    <TextInput secondary value='Secondary'/>
    <TextInput success value='Success'/>
    <TextInput danger value='Danger'/>
  </Row>)
  .add('sizes', () => <Row>
    <TextInput small value='Small'/>
    <TextInput value='Default'/>
    <TextInput large value='Large'/>
  </Row>)

storiesOf('Checkbox', module)
  .addDecorator(withState(true))
  .add('Checkbox', ({ state, storeState }) => {
    return <Checkbox checked={state} onClick={storeAndAction(storeState, 'toggle checkbox')} />
  })

storiesOf('Dropdown', module)
  .addDecorator(withState(false))
  .add('Dropdown', ({ state, storeState }) => {
    return (
      <div style={{ padding: '300px 0' }}>
        <Dropdown
          open={state}
          button={
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
