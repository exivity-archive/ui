import initStoryshots, { multiSnapshotWithOptions, Stories2SnapsConverter } from '@storybook/addon-storyshots'
import { styleSheetSerializer } from 'jest-styled-components/serializer'

initStoryshots({
  configPath: 'docs',
  storyKindRegex: /^((?!(docs)).)*$/,
  snapshotSerializers: [styleSheetSerializer],
  test: multiSnapshotWithOptions({}),
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotsDirName: '__snapshots__',
    snapshotExtension: '.snap',
    storiesExtensions: ['.ts', '.tsx'],
  })
})
