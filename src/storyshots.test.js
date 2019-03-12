import initStoryshots, { multiSnapshotWithOptions, Stories2SnapsConverter } from '@storybook/addon-storyshots'

initStoryshots({
  configPath: 'docs',
  storyKindRegex: /^((?!(docs)).)*$/,
  suite: 'Snapshot for',
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotsDirName: '__snapshots__',
    snapshotExtension: '.snap',
    storiesExtensions: ['.stories.jsx']
  }),
  test: multiSnapshotWithOptions()
})
