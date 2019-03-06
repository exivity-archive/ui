import { shallow } from 'enzyme'
import * as React from 'react'

import { Widget } from '.'

test('Widget snapshot', () => {
  const widget = shallow(<Widget title='Widget title' subTitle='Widget subTitle'>Widget</Widget>)
  expect(widget).toMatchSnapshot()
})
