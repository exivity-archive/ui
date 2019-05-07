import React from 'react'
import { Block, BlockProps } from '../Block'

import { Days } from './modes/Days'

export type onChangeDate = (selectDate: Date) => Date

export interface CalendarProps {
  value: Date
  onChange: onChangeDate
  mode?: string
}

const renderMode = (mode: string | undefined, value: Date, onChange: onChangeDate) => {
  switch (mode) {
    case 'days':
    default:
      return <Days date={value} onChange={onChange}/>
  }
}

export const Calendar = ({ value, onChange, mode, ...blockProps }: CalendarProps & BlockProps) => (
  <Block {...blockProps}>
    {renderMode(mode, value, onChange)}
  </Block>
)
