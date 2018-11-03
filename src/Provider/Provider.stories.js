import React from 'react'
import { storiesOf } from '@storybook/react'

import Provider from './Provider'
import theme from '../theme'

storiesOf('atoms|Provider', module)
  .add('base', () => <Provider>
    base
  </Provider>)
  .add('normalize', () => <Provider base={false} normalize>
    normalize
  </Provider>)
  .add('scrollbar', () => <Provider base={false} scrollbar>
    scrollbar
    <div style={{ height: '150vh' }} />
  </Provider>)
  .add('font', () => <Provider base={false} font>
    <div style={{
      fontFamily: theme.type.fonts.base.family
    }}>
      font-family: {theme.type.fonts.base.family};
    </div>
  </Provider>)
