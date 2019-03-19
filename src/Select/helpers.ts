import { SelectItem } from './Select'

export const NB_OF_ITEMS = 10
export const ITEM_HEIGHT = 30
export const MAX_HEIGHT = NB_OF_ITEMS * ITEM_HEIGHT

export const calculateHeight = (data: any[]) => {
  const totalHeight = data.length * ITEM_HEIGHT
  return totalHeight < MAX_HEIGHT ? totalHeight : MAX_HEIGHT
}

export const getSelectedItem = (key: string, data: SelectItem[]) => data.find((item) => item.key === key)
