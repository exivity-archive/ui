import * as React from 'react'

import Widget from '.'
import { shallow } from 'enzyme';

test('the widget renders with text inside', () => {
  const widget = shallow(<Widget>hello</Widget>)
  expect(widget).toMatchSnapshot()
})

test('widget renders with jsx element inside', () => {
  const widget = shallow(<Widget><div>hello</div></Widget>)
  expect(widget).toMatchSnapshot()
})

test('widget can take in a title and a subtitle', () => {
  const widget = shallow(<Widget title='Hey' subTitle="bye">hello</Widget>)
  expect(widget).toMatchSnapshot()
})