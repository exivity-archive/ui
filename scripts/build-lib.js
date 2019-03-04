const fs = require('fs')
const childProcess = require('child_process')

const original = fs.readFileSync('tsconfig.json')
const tsconfig = JSON.parse(original.toString())

tsconfig.compilerOptions.allowJs = false
tsconfig.compilerOptions.isolatedModules = false
tsconfig.compilerOptions.noEmit = false
tsconfig.compilerOptions.declaration = true

fs.writeFileSync('tsconfig.json',
  JSON.stringify(tsconfig, undefined, 2))

let status = 0
try {
  childProcess.execSync('yarn tsc', {
    stdio: 'inherit'
  })
} catch (err) {
  status = 1
}

fs.writeFileSync('tsconfig.json', original)

process.exit(status)

