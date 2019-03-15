import React from 'react'

const NB_OF_ITEMS = 10
export const ITEM_HEIGHT = 30
export const MAX_HEIGHT = NB_OF_ITEMS * ITEM_HEIGHT

export const calculateHeight = (data: any) => {
  const totalHeight = data.length * ITEM_HEIGHT
  return totalHeight < MAX_HEIGHT ? totalHeight : MAX_HEIGHT
}

export const getSelectedItem = (key: string, data: any[]) => data.find((item: any) => item.key === key)

export const handleKeyDown = (event: any) => {
  const list = event.currentTarget.querySelector('ul')
  const first = list.querySelector('li:first-child')
  const last = list.querySelector('li:last-child')
  const focused = list.querySelector(':focus')

  // Prevent default action on our trigger keys (up/down arrow, enter)
  if ([38, 40, 13].indexOf(event.which) !== -1) {
    event.preventDefault()
  }

  // Perform actions for trigger keys
  switch (event.which) {
    // Down arrow key
    case 40:
      if (focused) {
        const next = focused.nextSibling
        if (!next) first.focus()
        if (next) {
          next.focus()
        } else {
          first && first.focus()
        }
      } else {
        first && first.focus()
      }
      break

    // Up arrow key
    case 38:
      if (focused) {
        const previous = focused.previousSibling
        if (previous) {
          previous.focus()
        } else {
          last && last.focus()
        }
      } else {
        last && last.focus()
      }
      break

    // Enter key
    case 13:
      if (focused) {
        focused.click()
      }
      break

    default:
  }
}
