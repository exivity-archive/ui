export function addKey<Data> (item: Data, keyAccessor: (item: Data) => string) {
  return { ...item, key: keyAccessor(item) }
}

export const calculateHeight = (data: any[], itemHeight: number, maxItemsRendered: number) => {
  const maxHeight = maxItemsRendered * itemHeight
  const totalHeight = data.length * itemHeight
  return Math.min(totalHeight, maxHeight)
}
