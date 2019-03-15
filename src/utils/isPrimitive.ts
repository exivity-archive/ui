export const isPrimitive = (obj: any) =>
  typeof obj === 'string'
  || typeof obj === 'number'
  || typeof obj === 'boolean'
  || obj === null
  || obj === undefined
