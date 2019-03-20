import React from 'react'
import { storiesOf } from '@storybook/react'

import { Link } from '.'

storiesOf('atoms|Link', module)
  .add('default', () => <Link href='https://github.com/exivity/ui'>Visit GitHub repository</Link>)
