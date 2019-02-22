import React from 'react'
import renderer from 'react-test-renderer'

import Label from '.'
import { shallow } from 'enzyme';

test('renders label', () => {
  const label = renderer.create(<Label name="test" />)
  expect(label).toMatchSnapshot()
})
