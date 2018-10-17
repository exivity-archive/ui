#!/usr/bin/env node
const { readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs')
const path = require('path')

if (process.argv.length === 2) {
  console.error('Usage: create-components.js [Name]')
  process.exit(1)
}

const componentName = process.argv[2]
const targetDir = path.resolve(__dirname, `../src/${componentName}`)
const sourceDir = path.resolve(__dirname, `template`)
const templateFiles = [
  'Component.stub.js',
  'Component.stories.stub.js',
  'Component.test.stub.js',
  'index.stub.js'
]

if (existsSync(targetDir)) {
  console.error(`Directory ${targetDir} already exists.`)
  process.exit(1)
}

mkdirSync(targetDir)
console.log(`Created directory ${targetDir}.`)

templateFiles.forEach(templateFile => {
  const sourceFile = `${sourceDir}/${templateFile}`
  const targetFile = `${targetDir}/${templateFile.replace(/Component/g, componentName).replace('.stub.js', '.js')}`
  const contents = String(readFileSync(sourceFile)).replace(/{Component}/g, componentName)

  writeFileSync(targetFile, contents)
  console.log(`Written file ${targetFile}.`)
})

console.log('Done.')
