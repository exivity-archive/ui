import { Omit } from './types'

export type KeyedItem<T> = T & {
  key: string
}

export interface Map<T> {
  [index: string]: T
}

export function createMap<T> (data: KeyedItem<T>[]): Map<KeyedItem<T>> {
  const map: Map<KeyedItem<T>> = {}

  data.forEach((item) => {
    map[item.key] = item
  })

  return map
}

export function omit<T, E extends keyof T> (obj: T, keys: E[]): Omit<T, E> {
  return Object.entries(obj)
    .filter(([key]) => !keys.includes(key as E))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {}) as Omit<T, E>
}

export const tuple = <T extends string[]> (...args: T) => args

export function ensureString (test: any) {
  return typeof test === 'string' ? test : ''
}

export * from './styled'
export * from './types'
