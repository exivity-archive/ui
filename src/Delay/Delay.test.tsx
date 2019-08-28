import React from 'react'
import { render } from '@testing-library/react'

import { Delay } from './Delay'

test('Shows children after a certain amount of time.', async (done) => {
  const delay = 100
  const text = 'test'

  const { getByText } = render(<Delay wait={delay}><div>{text}</div></Delay>)

  setTimeout(() => {

    expect(() => {
      getByText(text)
    }).toThrowError()

  }, 50)

  setTimeout(() => {

    expect(() => {
      getByText(text)
    }).not.toThrowError()

    done()
  }, 150)
})
