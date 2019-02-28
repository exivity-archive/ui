import React from 'react'
import { shallow } from 'enzyme'
import Label from '.'

test('Label snapshot', () => {
  const label = shallow(<Label name='Label name' description='Label description'/>)
  expect(label).toMatchSnapshot()
})
