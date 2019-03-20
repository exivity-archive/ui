import { DeepReadonly } from '../utils/types'
import { lightTheme } from './lightTheme'

export { lightTheme } from './lightTheme'
export const defaultTheme = lightTheme
export type Theme = DeepReadonly<typeof defaultTheme>
