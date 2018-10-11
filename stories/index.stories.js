import React, { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'

import { addDecorator, storiesOf } from '@storybook/react'
import { select, withKnobs } from '@storybook/addon-knobs'

import Button from '../src/Button'
import Progress from '../src/Progress'
import WithStyle from '../src/WithStyle'
import defaultTheme, * as themeConstants from '../src/WithStyle/defaultTheme'

const withStyle = (storyFn) => {
  const theme = {
    ...defaultTheme,
    size: select('Base size', {
      [themeConstants.SIZE_SMALL]: 'small',
      [themeConstants.SIZE_DEFAULT]: 'default',
      [themeConstants.SIZE_LARGE]: 'large'
    }, defaultTheme.size, 'theme'),
    spacing: select('Spacing', {
      [themeConstants.SPACING_SMALL]: 'small',
      [themeConstants.SPACING_DEFAULT]: 'default',
      [themeConstants.SPACING_LARGE]: 'large'
    }, defaultTheme.spacing, 'theme')
  }

  return <WithStyle theme={theme}>
    {storyFn()}
  </WithStyle>
}
addDecorator(withStyle)
addDecorator(withKnobs)

storiesOf('Welcome', module)
  .add('Introduction', () => <div>
    <h1>Getting started</h1>
    <p>@todo</p>
  </div>)
  .add('Installation', () => <div>
    <h1>Installation</h1>
    <p>@todo</p>
  </div>)
  .add('Using theme', () => <div>
    <h1>Using theme</h1>
    <h2></h2>
  </div>)

storiesOf('atoms/Progress', module)
  .add('default', () => <Progress />)
  .add('100%', () => <Progress progress={1} />)

storiesOf('atoms/Button', module)
  .add('default', () => <Button>Default</Button>)
  .add('primary', () => <Button primary>Primary</Button>)
  .add('test', () => <Fragment>
    <Button primary>Primary</Button>)
    <ThemeProvider theme={{
      size: 12
    }}>
      <Button primary>Primary</Button>
    </ThemeProvider>
  </Fragment>)
