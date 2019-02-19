const { createConfig, babel, typescript } = require('webpack-blocks')
const { getDefaultExportForFile } = require('react-docgen-typescript')

const parserOptions = {
  propFilter: {
    skipPropsWithName: [
      'as',
      'className',
      'theme'
    ],
    skipPropsWithoutDoc: false
  },
  componentNameResolver: (exp, source) => {
    return exp.getName() === 'StyledComponentClass' && getDefaultExportForFile(source)
  }
}

module.exports = {
  title: "@exivity/ui",
  components: 'src/**/[A-Z]*.{ts,tsx}',
  webpackConfig: {
    ...createConfig([babel(), typescript()]),
    cache: false // see https://github.com/styleguidist/react-styleguidist/issues/1206
  },
  pagePerSection: true,
  usageMode: 'expand',
  exampleMode: 'expand',
  propsParser: require('react-docgen-typescript')
    .withDefaultConfig(parserOptions).parse

}
