import React from 'react'
import { shallow } from 'enzyme'
import Label from '../Label'

test('Label snapshot', () => {
  const label = shallow(<Label name='Label name' description='Label description'/>)
  expect(label).toMatchSnapshot()
})