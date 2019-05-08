export function disableEnumerable (item: object, property: string): void {
  Object.defineProperty(item, property, {
    enumerable: false,
    configurable: true
  })
}
