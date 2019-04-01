import { SelectListItem } from './SelectList'

export const NB_OF_ITEMS = 10
export const ITEM_HEIGHT = 30
export const MAX_HEIGHT = NB_OF_ITEMS * ITEM_HEIGHT

export const NO_DATA_KEY = 'nodata'
export const NO_DATA_TEXT = 'No items in this list...'

export const calculateHeight = (data: any[]) => {
  const totalHeight = data.length * ITEM_HEIGHT
  return totalHeight < MAX_HEIGHT ? totalHeight : MAX_HEIGHT
}

export const getNoDataPlaceholder = (data: SelectListItem[], noDataText?: string): SelectListItem[] => {
  if (!data.length) {
    return [{ key: NO_DATA_KEY, value: noDataText ? noDataText : NO_DATA_TEXT }]
  }

  return data
}
