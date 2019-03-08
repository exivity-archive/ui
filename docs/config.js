import { addDecorator, addParameters, configure } from '@storybook/react'
import { create } from '@storybook/theming'
import { CanvasDecorator } from '../src/utils/tests/decorators/CanvasDecorator'
import { ThemeDecorator } from '../src/utils/tests/decorators/ThemeDecorator'

addDecorator(CanvasDecorator)
addDecorator(ThemeDecorator)

// Add options
addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: '@exivity/ui',
      brandUrl: 'https://exivity.github.io/ui/',
      brandImage: 'http://res.cloudinary.com/exivity/image/upload/v1512214049/exivity-path_oarztd.svg',
    }),
    panelPosition: 'right',
    isFullscreen: false,
  },
});

// Automatically import all files ending in *.stories.js
const docs = require.context('../docs', true, /.stories.(js|tsx)$/)
const src = require.context('../src', true, /.stories.(js|tsx)$/)

function loadStories () {
  docs.keys().forEach(filename => docs(filename))
  src.keys().forEach(filename => src(filename))
}

configure(loadStories, module)
