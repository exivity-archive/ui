const path = require('path')

module.exports = async ({ config }) => {

  // Storysource
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [
      require.resolve('@storybook/addon-storysource/loader')
    ],
    enforce: 'pre'
  })

  // TypeScript docgen
  config.module.rules.push({
    test: /\.tsx$/,
    include: path.resolve(__dirname, '../src'),
    use: [
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          tsconfigPath:  path.resolve(__dirname, '../tsconfig.json')
        }
      }
    ]
  })

  return config
}
