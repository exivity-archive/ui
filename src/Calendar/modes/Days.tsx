import React from 'react'
import { getDaysInMonth, setDate, isSameDay, getDay, startOfMonth } from 'date-fns'

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

function getRenderDay (value: Date, browseDate: Date, onChange: Function, offSet: number) {
  return (_: undefined, index: number) => {
    const day = index + 1 - offSet
    const thisDay = setDate(browseDate, day)
    const isActive = isSameDay(value, thisDay)

    if (index < offSet) return <li key={index} />

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
  onChange: (value: Date) => void
}

export const Days = ({ value, browseDate, onChange }: CommonPeriodProps) => {
  const updateDay = (day: number) => onChange(setDate(browseDate, day))
  const weekDayOffSet = getDay(startOfMonth(browseDate)) - 1
  const nbOfDays = getDaysInMonth(browseDate) + weekDayOffSet

  const renderDay = getRenderDay(value, browseDate, updateDay, weekDayOffSet)

  return (
    <>
      <WeekDays/>
      <StyledDays>
        {new Array(nbOfDays).fill(null).map(renderDay)}
      </StyledDays>
    </>
  )
}
