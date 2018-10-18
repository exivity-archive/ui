import React from 'react'
import { storiesOf } from '@storybook/react'

import Global from './Global'
import theme from '../theme'

storiesOf('atoms|Global', module)
  .add('base', () => <React.Fragment>
    <Global />
    base
  </React.Fragment>)
  .add('normalize', () => <React.Fragment>
    <Global base={false} normalize />
    normalize
  </React.Fragment>)
  .add('scrollbar', () => <React.Fragment>
    <Global base={false} scrollbar />
    scrollbar
    <div style={{ height: '150vh' }} />
  </React.Fragment>)
  .add('font', () => <React.Fragment>
    <Global base={false} font />
    <div style={{
      fontFamily: theme.type.fonts.base.family
    }}>
      font-family: {theme.type.fonts.base.family};
    </div>
  </React.Fragment>)
