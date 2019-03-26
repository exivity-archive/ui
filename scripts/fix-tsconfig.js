const fs = require('fs')

let original

module.exports = {
  fix: function() {
    original = fs.readFileSync('tsconfig.json')
    const tsconfig = JSON.parse(original.toString())

    tsconfig.compilerOptions.allowJs = false
    tsconfig.compilerOptions.isolatedModules = false
    tsconfig.compilerOptions.noEmit = false
    tsconfig.compilerOptions.declaration = true
    tsconfig.compilerOptions.jsx = 'react'

    fs.writeFileSync('tsconfig.json',
      JSON.stringify(tsconfig, undefined, 2))

    console.log('tsconfig.json fixed')
  },
  restore: function() {
    fs.writeFileSync('tsconfig.json', original)

    console.log('tsconfig.json restored')
  }
}
