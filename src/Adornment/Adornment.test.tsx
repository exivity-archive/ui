import React from 'react'
import { render } from '@testing-library/react'

import { Adornment, ADORNMENT_DISPLAY_NAME, Position } from './Adornment'
import { Text } from '../'
import { Input } from '../Input'
import styled from 'styled-components'

describe('<Adornment/>', () => {
  test('Doesn\'t throw when used correctly', () => {
    render(<Adornment component={<Text>Eur</Text>}><Input /></Adornment>)
  })

  test('Throws an error when it recieves more than one child', () => {
    const adornment = (
      <Adornment component={<Text>Eur</Text>}>
        <Input />
        <Input />
      </Adornment>
    )

    let error
    try {
      render(adornment)
    } catch (err) {
      error = err
    }

    expect(error).toBeDefined()
  })

  test('Throws an error when child isn\'t a ReactElement', () => {
    const adornment = (
      <Adornment component={<Text>Eur</Text>}>
        {null}
      </Adornment>
    )

    let error
    try {
      render(adornment)
    } catch (err) {
      error = err
    }

    expect(error).toBeDefined()
  })

  test('passes extraPadding to child Adornment with added width', () => {
    let recievedExtraPadding

    const Component = (props: any) => {
      recievedExtraPadding = props.extraPadding
      return <div />
    }
    Component.displayName = ADORNMENT_DISPLAY_NAME

    const AdornmentComponent = styled.div`width: 100px;`

    const adornment = (
      <Adornment component={<AdornmentComponent />} extraPadding={{ [Position.LEFT]: 10, [Position.RIGHT]: 10 }} position={Position.LEFT}>
        <Component />
      </Adornment>
    )

    render(adornment)

    expect(recievedExtraPadding[Position.LEFT]).toBe(10)
  })
})
