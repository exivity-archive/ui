import React from 'react'
import { isSameMonth, setDate, setMonth, format } from 'date-fns'

import { StyledTimeUnit, StyledMonths } from '../styled'
import { CommonPeriodProps } from './Days'

function getRenderMonth (value: Date, browseDate: Date, onChange: Function) {
  return (_: undefined, index: number) => {
    const month = index
    const thisMonth = setMonth(browseDate, month)
    const isActive = isSameMonth(value, thisMonth)

    return (
      <li key={index}>
        <StyledTimeUnit active={isActive}
                   onClick={() => onChange(setDate(thisMonth, 1))}>
          {format(thisMonth, 'MMM')}
        </StyledTimeUnit>
      </li>
    )
  }
}

export const Months = ({ value, browseDate, onChange }: CommonPeriodProps) => {
  const renderMonth = getRenderMonth(value, browseDate, onChange)

  return (
    <>
      <StyledMonths>
        {new Array(12).fill(null).map(renderMonth)}
      </StyledMonths>
    </>
  )
}
