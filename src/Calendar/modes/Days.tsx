import React from 'react'
import { getDaysInMonth, setDate, getDate } from 'date-fns'

import { StyledWeekDays, StyledDays, StyledDay } from '../styled'

export const WeekDays = () => (
  <StyledWeekDays id='weekdays'>
    <li>Mo</li>
    <li>Tu</li>
    <li>We</li>
    <li>Th</li>
    <li>Fr</li>
    <li>Sa</li>
    <li>Su</li>
  </StyledWeekDays>
)

function getRenderDays (selectedDay: number, onChange: Function) {
  return (_: undefined, index: number) => {
    const day = index + 1

    return (
      <li key={index}>
        <StyledDay active={selectedDay === day}
             onClick={() => onChange(day)}>
          {String(day)}
        </StyledDay>
      </li>
    )
  }
}

export interface DaysProps {
  date: Date
  onChange: (date: Date) => Date
}

export const Days = ({ date, onChange }: DaysProps) => {
  const updateDay = (day: number) => onChange(setDate(date, day))

  const renderDays = getRenderDays(getDate(date), updateDay)
  const nbOfDays = getDaysInMonth(date)

  return (
    <>
      <WeekDays/>
      <StyledDays id='days'>
        {new Array(nbOfDays).fill(null).map(renderDays)}
      </StyledDays>
    </>
  )
}
