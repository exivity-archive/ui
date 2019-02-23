import fs from 'fs'
import ITheme from './ITheme'
import { DeepReadonly } from './utils/types'

export type Theme = DeepReadonly<ITheme>

const theme: Theme = JSON.parse(fs.readFileSync('./theme.json', { encoding: 'utf8' }))

export default theme
