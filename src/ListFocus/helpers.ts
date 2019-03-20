import { KeyboardEvent } from 'react'

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

  handleFocus(event.which, focused, first, last)
}

export const focusElement = (sibling: HTMLLIElement | null, fallback: HTMLLIElement | null) => {
  if (sibling) sibling.focus()
  if (fallback && !sibling) fallback.focus()
}

export const handleFocus = (
  key: number,
  focused: HTMLLIElement | null,
  first: HTMLLIElement | null,
  last: HTMLLIElement | null
) => {
  // Perform actions for trigger keys
  switch (key) {
    // Down arrow key
    case 40:
      const next = focused && focused.nextSibling as HTMLLIElement | null
      focusElement(next, first)
      break

    // Up arrow key
    case 38:
      const previous = focused && focused.previousSibling as HTMLLIElement | null
      focusElement(previous, last)
      break

    // Enter key
    case 13:
      focused && focused.click()
      break

    default:
  }
}
