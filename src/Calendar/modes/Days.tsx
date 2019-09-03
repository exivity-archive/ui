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

function getRenderDay (value: Date, browseDate: Date, onChange: Function, nbOfPlaceholderDays: number) {
  return (_: undefined, index: number) => {
    const day = index + 1 - nbOfPlaceholderDays
    const thisDay = setDate(browseDate, day)
    const isActive = isSameDay(value, thisDay)

    if (index < nbOfPlaceholderDays) return <li key={index} />

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

  const placeholderDays = weekDayOffSet < 0
    ? 7 + weekDayOffSet
    : weekDayOffSet

  const nbOfDays = getDaysInMonth(browseDate) + placeholderDays
  const renderDay = getRenderDay(value, browseDate, updateDay, placeholderDays)

  return (
    <>
      <WeekDays/>
      <StyledDays>
        {new Array(nbOfDays).fill(null).map(renderDay)}
      </StyledDays>
    </>
  )
}
