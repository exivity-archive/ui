import initStoryshots, { multiSnapshotWithOptions } from '@storybook/addon-storyshots'
import { styleSheetSerializer } from 'jest-styled-components/serializer'

initStoryshots({
  configPath: 'docs',
  storyKindRegex: /^((?!(docs)).)*$/,
  snapshotSerializers: [styleSheetSerializer],
  test: multiSnapshotWithOptions({})
})

window.matchMedia = window.matchMedia || function() {
  return {
    matches : false,
    addListener : function() {},
    removeListener: function() {}
  }
}