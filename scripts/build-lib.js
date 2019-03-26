const childProcess = require('child_process')
const { fix, restore } = require('./fix-tsconfig')

fix()

let status = 0
try {
  childProcess.execSync('yarn tsc', {
    stdio: 'inherit'
  })
} catch (err) {
  status = 1
}

restore()

process.exit(status)

