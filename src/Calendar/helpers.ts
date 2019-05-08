import { addMonths, subMonths, addQuarters, subQuarters, addYears, subYears } from 'date-fns'

export function browseReducer (date: Date, type: string) {
  switch (type) {
    case 'addMonth':
      return addMonths(date, 1)
    case 'addQuarter':
      return addQuarters(date, 1)
    case 'addYear':
      return addYears(date, 1)
    case 'subMonth':
      return subMonths(date, 1)
    case 'subQuarter':
      return subQuarters(date, 1)
    case 'subYear':
      return subYears(date, 1)
    default:
      throw new Error()
  }
}

export function createBrowsers (dispatch: Function, mode: string | undefined) {
  const create = (prev: string, next: string) => [() => dispatch(prev), () => dispatch(next)]

  switch (mode) {
    case 'quarters':
      return create('subQuarter', 'addQuarter')

    case 'years':
      return create('subYear', 'addYear')

    case 'days':
    case 'months':
    default:
      return create('subMonth', 'addMonth')
  }
}
