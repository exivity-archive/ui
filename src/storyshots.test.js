import initStoryshots from '@storybook/addon-storyshots'

initStoryshots({
  configPath: 'docs',
  storyKindRegex: /^((?!(docs)).)*$/
})
