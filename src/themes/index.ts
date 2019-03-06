import { DeepReadonly } from '../utils/types'
import { lightTheme } from './lightTheme'

export { lightTheme } from './lightTheme'
export type Theme = DeepReadonly<typeof lightTheme>
