import { Rect } from '../useClientRect'

export function addKey<Data> (item: Data, keyAccessor: (item: Data) => string) {
  return { ...item, key: keyAccessor(item) }
}

export function autoCalculateHeight (data: any[], containerRect: Rect | null, itemHeight: number) {
  const maxHeight = containerRect
    ? itemHeight * Math.floor(containerRect.height / itemHeight)
    : 0
  const totalHeight = data.length * itemHeight
  return Math.min(totalHeight, maxHeight)
}

export const calculateHeight = (data: any[], itemHeight: number, maxItemsRendered: number) => {
  const maxHeight = maxItemsRendered * itemHeight
  const totalHeight = data.length * itemHeight
  return Math.min(totalHeight, maxHeight)
}
