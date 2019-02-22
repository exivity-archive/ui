import React from 'react'
import renderer from 'react-test-renderer'

import Label from '.'

test('renders label', () => {
  const label = renderer.create(<Label name="test" />)
  expect(label.toJSON()).toMatchSnapshot()
})
