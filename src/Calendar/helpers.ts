import { useState } from 'react'
import { addMonths, addQuarters, addYears, format, subMonths, subQuarters, subYears } from 'date-fns'

import { BrowseTypes, Modes } from './types'

export function browseReducer (date: Date, type: BrowseTypes) {
  switch (type) {
    case BrowseTypes.ADD_MONTH:
      return addMonths(date, 1)

    case BrowseTypes.SUB_MONTH:
      return subMonths(date, 1)

    case BrowseTypes.ADD_QUARTER:
      return addQuarters(date, 1)

    case BrowseTypes.SUB_QUARTER:
      return subQuarters(date, 1)

    case BrowseTypes.ADD_YEAR:
      return addYears(date, 1)

    case BrowseTypes.SUB_YEAR:
      return subYears(date, 1)

    case BrowseTypes.ADD_YEARS:
      return addYears(date, 12)

    case BrowseTypes.SUB_YEARS:
      return subYears(date, 12)

    default:
      throw new Error()
  }
}

export function createBrowsers (dispatch: Function, mode: Modes) {
  const create = (prev: string, next: string) => [() => dispatch(prev), () => dispatch(next)]

  switch (mode) {
    case Modes.YEARS:
      return create(BrowseTypes.SUB_YEARS, BrowseTypes.ADD_YEARS)

    case Modes.MONTHS:
    case Modes.QUARTERS:
      return create(BrowseTypes.SUB_YEAR, BrowseTypes.ADD_YEAR)

    case Modes.DAYS:
    default:
      return create(BrowseTypes.SUB_MONTH, BrowseTypes.ADD_MONTH)
  }
}

export function formatDateHeader (browseDate: Date, mode: Modes) {
  switch (mode) {
    case Modes.YEARS:
      return format(subYears(browseDate, 6), 'YYYY') + ' - ' +
        format(addYears(browseDate, 5), 'YYYY')

    case Modes.MONTHS:
    case Modes.QUARTERS:
      return format(browseDate, 'YYYY')

    case Modes.DAYS:
    default:
      return format(browseDate, 'MMMM YYYY')
  }
}

export function getNextIndex (index: number, array: any[]): number {
  return index === array.length - 1
    ? 0
    : index + 1
}

export function useMode (initialMode: Modes | undefined, mode: Modes | Modes[] | undefined) {
  let index = 0
  const modes = initialMode && mode
    ? mode as Modes[]
    : Object.values(Modes)

  if (initialMode && mode && !Array.isArray(mode)) {
    throw new Error('When using initialMode and mode together, mode should be an array with options.')
  }

  if (initialMode) {
    index = modes.findIndex(modeName => modeName === initialMode)
  }

  if (index === -1) {
    throw new Error('initialMode does not exist.')
  }

  const [selectedIndex, setIndex] = useState(index)
  const nextIndex = getNextIndex(selectedIndex, modes)

  return (initialMode && mode) || initialMode
    ? [modes[selectedIndex], () => setIndex(nextIndex)] as [Modes, () => void | undefined]
    : [mode, undefined] as [Modes, undefined]
}
