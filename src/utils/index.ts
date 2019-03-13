import { Omit } from './types'

export type Item<T> = T

export type ListItem<T> = Item<T> & {
  key: string
}

export interface Map<T> {
  [index: string]: T
}

export function createMap<T> (data: ListItem<T>[]): Map<ListItem<T>> {
  const map: Map<ListItem<T>> = {}

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

export const tuple = <T extends string[]>(...args: T) => args
