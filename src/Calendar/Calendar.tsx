import React, { useReducer } from 'react'
import { Block, BlockProps } from '../Block'
import { format } from 'date-fns'

import { Browser } from './Browser'
import { Days } from './modes/Days'
import { browseReducer, createBrowsers } from './helpers'

export type onChangeDate = (selectDate: Date) => Date

export interface CalendarProps {
  value: Date
  onChange: onChangeDate
  mode?: string
}

const renderMode = (mode: string | undefined, value: Date, browseDate: Date, onChange: onChangeDate) => {
  switch (mode) {
    case 'days':
    default:
      return <Days value={value} browseDate={browseDate} onChange={onChange}/>
  }
}

export const Calendar = ({ value, onChange, mode, ...blockProps }: CalendarProps & BlockProps) => {
  const [browseDate, dispatch] = useReducer(browseReducer, value)
  const [onPrev, onNext] = createBrowsers(dispatch, mode)

  return (
    <Block {...blockProps}>
      <Browser onPrev={onPrev} onNext={onNext}>
        {format(browseDate, 'MMMM YYYY')}
      </Browser>
      {renderMode(mode, value, browseDate, onChange)}
    </Block>
  )
}
