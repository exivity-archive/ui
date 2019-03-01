import { shallow } from 'enzyme'
import React from 'react'
import Label from '.'

test('Label snapshot', () => {
  const label = shallow(<Label name='Label name' description='Label description' />)
  expect(label).toMatchSnapshot()
})
