import React from 'react'
import { render } from '@testing-library/react'

import { Adornment } from './Adornment'
import { Text, Input } from '../'

describe('<Adornment/>', () => {
  test('Doesn\'t throw when used correctly', () => {
    render(<Adornment leftComponent={<Text>Eur</Text>}><Input /></Adornment>)
  })

  test('Throws an error when child isn\'t a ReactElement', () => {
    const adornment = (
      <Adornment leftComponent={<Text>Eur</Text>}>
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
})
