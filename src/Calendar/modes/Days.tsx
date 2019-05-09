import React from 'react'
import { getDaysInMonth, setDate, isSameDay } from 'date-fns'

import { StyledWeekDays, StyledDays, StyledTimeUnit } from '../styled'

export const WeekDays = () => (
  <StyledWeekDays>
    <li>Mo</li>
    <li>Tu</li>
    <li>We</li>
    <li>Th</li>
    <li>Fr</li>
    <li>Sa</li>
    <li>Su</li>
  </StyledWeekDays>
)

function getRenderDay (value: Date, browseDate: Date, onChange: Function) {
  return (_: undefined, index: number) => {
    const day = index + 1
    const thisDay = setDate(browseDate, day)
    const isActive = isSameDay(value, thisDay)

    return (
      <li key={index}>
        <StyledTimeUnit active={isActive}
             onClick={() => onChange(day)}>
          {String(day)}
        </StyledTimeUnit>
      </li>
    )
  }
}

export interface CommonPeriodProps {
  value: Date
  browseDate: Date
  onChange: (value: Date) => Date
}

export const Days = ({ value, browseDate, onChange }: CommonPeriodProps) => {
  const updateDay = (day: number) => onChange(setDate(browseDate, day))

  const renderDay = getRenderDay(value, browseDate, updateDay)
  const nbOfDays = getDaysInMonth(browseDate)

  return (
    <>
      <WeekDays/>
      <StyledDays>
        {new Array(nbOfDays).fill(null).map(renderDay)}
      </StyledDays>
    </>
  )
}
