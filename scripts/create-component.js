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
const indexPath = path.resolve(__dirname, `../src/index.ts`)
const templateFiles = [
  'Component.tsx.stub',
  'Component.stories.tsx.stub',
  'Component.test.tsx.stub',
  'index.ts.stub'
]

if (existsSync(targetDir)) {
  console.error(`Directory ${targetDir} already exists.`)
  process.exit(1)
}

mkdirSync(targetDir)
console.log(`Created directory ${targetDir}.`)

templateFiles.forEach(templateFile => {
  const sourceFile = `${sourceDir}/${templateFile}`
  const targetFile = `${targetDir}/${templateFile.replace(/Component/g, componentName).replace('.stub', '')}`
  const contents = String(readFileSync(sourceFile)).replace(/{Component}/g, componentName)

  writeFileSync(targetFile, contents)
  console.log(`Written file ${targetFile}.`)
})

const indexContents = readFileSync(indexPath).toString()
const indexContentsMap = new Map()
indexContents.split('\n').forEach(line => {
  if (line.trim()) {
    const matches = line.match(/^export \* from '\.\/(.+)'/)
    if (!matches) {
      throw new Error('Couldn\'t parse index.ts')
    }
    const key = matches[1]
    indexContentsMap.set(key, line.trim())
  }
})
indexContentsMap.set(componentName, `export * from './${componentName}'`)
const newIndexContents = Array.from(indexContentsMap.keys()).sort().map(key => indexContentsMap.get(key))
writeFileSync(indexPath, `${newIndexContents.join('\n')}\n`)
console.log(`Added ${componentName} to index.ts.`)

console.log('Done.')
