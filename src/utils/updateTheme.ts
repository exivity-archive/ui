import { AnyObject } from './types'
import * as request from 'superagent'

export const updateTheme = (theme: AnyObject<string>) => {
  return request.post('http://localhost:3000/theme').set('Content-Type', 'application/json').send(theme).then(console.log)
}

