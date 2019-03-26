import { addDecorator, addParameters, configure } from '@storybook/react'
import { create } from '@storybook/theming'
import { CanvasDecorator } from '../src/utils/tests/decorators/CanvasDecorator'
import { ThemeDecorator } from '../src/utils/tests/decorators/ThemeDecorator'
import requireContext from 'require-context.macro'

// Our own decorators
addDecorator(CanvasDecorator)
addDecorator(ThemeDecorator)

// Add options
addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: '@exivity/ui',
      brandUrl: 'https://exivity.github.io/ui/',
      brandImage: 'logo.svg',
    }),
    panelPosition: 'right',
    isFullscreen: false,
  },
});

// Automatically import all files ending in *.stories.js
const docs = requireContext('../docs', true, /.stories.(js|tsx)$/)
const src = requireContext('../src', true, /.stories.(js|tsx)$/)

function loadStories () {
  docs.keys().forEach(filename => docs(filename))
  src.keys().forEach(filename => src(filename))
}

configure(loadStories, module)
