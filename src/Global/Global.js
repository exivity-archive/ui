import { createGlobalStyle } from 'styled-components'

import normalize from './normalize'
import base from './base'

const Global = createGlobalStyle`${normalize} ${base}`

export default Global
