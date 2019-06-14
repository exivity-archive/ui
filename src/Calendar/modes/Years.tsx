import React from 'react'
import { isSameYear, setYear, getYear, startOfYear, format } from 'date-fns'

import { StyledTimeUnit, StyledMonths } from '../styled'
import { CommonPeriodProps } from './Days'

function getRenderYear (value: Date, browseDate: Date, onChange: Function) {
  return (_: undefined, index: number) => {
    const browseYearMiddle = getYear(browseDate)

    const year = index <= 6
      ? browseYearMiddle - (6 - index)
      : browseYearMiddle + (index - 6)

    const thisYear = setYear(browseDate, year)
    const isActive = isSameYear(value, thisYear)

    return (
      <li key={index}>
        <StyledTimeUnit active={isActive}
                        onClick={() => onChange(startOfYear(thisYear))}>
          {format(thisYear, 'YYYY')}
        </StyledTimeUnit>
      </li>
    )
  }
}

export const Years = ({ value, browseDate, onChange }: CommonPeriodProps) => {
  const renderYear = getRenderYear(value, browseDate, onChange)

  return (
    <>
      <StyledMonths>
        {new Array(12).fill(null).map(renderYear)}
      </StyledMonths>
    </>
  )
}
