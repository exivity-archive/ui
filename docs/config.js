import { addDecorator, configure } from '@storybook/react'
import { CanvasDecorator } from '../src/utils/testing/decorators/CanvasDecorator'
import { ThemeDecorator } from '../src/utils/testing/decorators/ThemeDecorator'

addDecorator(CanvasDecorator)
addDecorator(ThemeDecorator)

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.(js|tsx)$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
