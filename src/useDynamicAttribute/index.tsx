import React from 'react'

function useDynamicAttribute<T extends object, V> (data: T, key: string, itemAccessor: V | ((item: T) => V)): any {
  return 'hi'
}
