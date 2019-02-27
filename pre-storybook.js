const fs = require('fs')

const theme = fs.readFileSync('src/theme.json', { encoding: 'utf8' })
fs.writeFileSync('src/ITheme.ts', `/*This is a generated file. Do not edit pls.*/\nexport default interface ITheme ${theme}\n`)


