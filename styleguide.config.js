const { createConfig, babel, typescript } = require('webpack-blocks')

module.exports = {
  components: 'src/**/[A-Z]*.{ts,tsx}',
  webpackConfig: {
    ...createConfig([babel(), typescript()]),
    cache: false // see https://github.com/styleguidist/react-styleguidist/issues/1206
  }
}
