const fs = require('fs')
const childProcess = require('child_process')

const original = fs.readFileSync('tsconfig.json')
const tsconfig = JSON.parse(original.toString())

tsconfig.compilerOptions.noEmit = false

fs.writeFileSync('tsconfig.json',
  JSON.stringify(tsconfig, undefined, 2))

childProcess.execSync('yarn tsc', {
  stdio: 'inherit'
})

fs.writeFileSync('tsconfig.json', original)

