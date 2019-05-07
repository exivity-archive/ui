import React from 'react'
import styled, { css } from 'styled-components'
import { getDaysInMonth, setDate, getDate } from 'date-fns'

import { fromTheme, globalFont } from '../../utils/styled'

const StyledWeekDays = styled.ul`
  ${globalFont}
  opacity: 0.6;
  margin: 0;
  padding: 10px 0;

  li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
  }
`

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

export const Day = styled.div<{ active: boolean }>`
  height: 100%;
  border-radius: 180px;
  padding: 5px;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: white;
    background-color: ${fromTheme(theme => theme.global.purposes.primary)};
  }

  ${({ active }) => active && css`
    color: white;
    background-color: ${fromTheme(theme => theme.global.purposes.primary)};
  `}
`

function getRenderDays (selectedDay: number, onChange: Function) {
  return (_: undefined, index: number) => {
    const day = index + 1

    return (
      <li>
        <Day active={selectedDay === day}
             onClick={() => onChange(day)}>
          {String(day)}
        </Day>
      </li>
    )
  }
}

const StyledDays = styled.ul`
  ${globalFont}

  padding: 10px 0;
  margin: 0;

  li {
    list-style-type: none;
    display: inline-block;
    width: calc(13.6% - 5px);
    text-align: center;
    margin-right: 5px;
    margin-bottom: 5px;
  }
`

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
