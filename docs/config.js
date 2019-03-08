import { addDecorator, addParameters, configure } from '@storybook/react'
import { create } from '@storybook/theming'
import { CanvasDecorator } from '../src/utils/tests/decorators/CanvasDecorator'
import { ThemeDecorator } from '../src/utils/tests/decorators/ThemeDecorator'
import requireContext from 'require-context.macro'

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
    isFullscreen: false,
  },
});

// Automatically import all files ending in *.stories.js
const req = requireContext('../src', true, /.stories.(js|tsx)$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
