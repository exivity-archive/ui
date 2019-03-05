import { addDecorator, configure } from '@storybook/react'
import { CanvasDecorator } from '../src/utils/tests/decorators/CanvasDecorator'
import { ThemeDecorator } from '../src/utils/tests/decorators/ThemeDecorator'

addDecorator(CanvasDecorator)
addDecorator(ThemeDecorator)

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.(js|tsx)$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
