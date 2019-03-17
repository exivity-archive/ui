import { KeyboardEvent } from 'react'
import { SelectItem } from './Select'

export const NB_OF_ITEMS = 10
export const ITEM_HEIGHT = 30
export const MAX_HEIGHT = NB_OF_ITEMS * ITEM_HEIGHT

export const calculateHeight = (data: any[]) => {
  const totalHeight = data.length * ITEM_HEIGHT
  return totalHeight < MAX_HEIGHT ? totalHeight : MAX_HEIGHT
}

export const getSelectedItem = (key: string, data: SelectItem[]) => data.find((item) => item.key === key)

const PREVENT_DEFAULT_KEYS = [38, 40, 13]

export const handleKeyDownFocusListItem = (event: KeyboardEvent) => {
  const list = event.currentTarget.querySelector('ul')
  if (!list) return
  const first: HTMLLIElement | null = list.querySelector('li:first-child')
  const last: HTMLLIElement | null = list.querySelector('li:last-child')
  if (!first || !last) return
  const focused: HTMLLIElement | null = list.querySelector(':focus')

  // Prevent default action on our trigger keys (up/down arrow, enter)
  if (PREVENT_DEFAULT_KEYS.includes(event.which)) {
    event.preventDefault()
  }

  // Perform actions for trigger keys
  switch (event.which) {
    // Down arrow key
    case 40:
      const next = focused && focused.nextSibling as HTMLLIElement | null
      if (next) next.focus()
      if (first && !next) first.focus()
      break

    // Up arrow key
    case 38:
      const previous = focused && focused.previousSibling as HTMLLIElement | null
      if (previous) previous.focus()
      if (last && !previous) last.focus()
      break

    // Enter key
    case 13:
      focused && focused.click()
      break

    default:
  }
}
