const childProcess = require('child_process')
const { fix, restore } = require('./fix-tsconfig')

fix()

process.on('exit', exitHandler)
process.on('SIGINT', exitHandler)
process.on('SIGUSR1', exitHandler)
process.on('SIGUSR2', exitHandler)
process.on('uncaughtException', exitHandler)

let status = 0
try {
  childProcess.execSync('yarn tsc --watch', {
    stdio: 'inherit'
  })
} catch (err) {
  status = 1
}

function exitHandler () {
  restore()
  process.exit(status)
}

