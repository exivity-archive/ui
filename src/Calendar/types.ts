export type onChangeDate = (selectDate: Date) => Date

export enum Modes {
  DAYS = 'days',
  MONTHS = 'months',
  QUARTERS = 'quarters',
  YEARS = 'years'
}

export enum BrowseTypes {
  ADD_MONTH = 'addMonth',
  SUB_MONTH = 'subMonth',
  ADD_QUARTER = 'addQuarter',
  SUB_QUARTER = 'subQuarter',
  ADD_YEAR = 'addYear',
  SUB_YEAR = 'subYear',
  ADD_YEARS = 'addYears',
  SUB_YEARS = 'subYears'
}
