export function merge (...objects: {}[]) {
  return objects.reduce((acc, curr) => ({ ...acc, ...curr }))
}
