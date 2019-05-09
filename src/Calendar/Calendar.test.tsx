import React from 'react'
import { getDate, getDaysInMonth, isDate, setDate } from 'date-fns'
import { mountWithTheme } from '../utils/tests/mountWithTheme'
import { StyledTimeUnit } from './styled'

import { Calendar, Modes } from '.'

test('value gets changed after an onClick event', () => {
  const onChangeMock = jest.fn(x => x)
  const date = setDate(new Date(), 2)

  const calendar = mountWithTheme(
    <Calendar value={date} onChange={onChangeMock}/>
  )

  calendar
    .find({ active: false })
    .first()
    .simulate('click')

  const returnedDate = onChangeMock.mock.results[0].value

  expect(onChangeMock).toHaveBeenCalled()
  expect(getDate(returnedDate)).toBe(1)
  expect(isDate(returnedDate)).toBe(true)
})

test('renders all days of the month', () => {
  const onChangeMock = jest.fn(x => x)
  const date = setDate(new Date(), 2)

  const calendar = mountWithTheme(
    <Calendar value={date} onChange={onChangeMock}/>
  )

  const days = calendar
    .find(StyledTimeUnit)

  expect(days.length).toBe(getDaysInMonth(date))
})

test('renders all months of the year', () => {
  const onChangeMock = jest.fn(x => x)
  const date = setDate(new Date(), 2)

  const calendar = mountWithTheme(
    <Calendar value={date} onChange={onChangeMock} mode={Modes.MONTHS}/>
  )

  const months = calendar
    .find(StyledTimeUnit)

  expect(months.length).toBe(12)
})

test('renders all quarters of the year', () => {
  const onChangeMock = jest.fn(x => x)
  const date = setDate(new Date(), 2)

  const calendar = mountWithTheme(
    <Calendar value={date} onChange={onChangeMock} mode={Modes.QUARTERS}/>
  )

  const quarters = calendar
    .find(StyledTimeUnit)

  expect(quarters.length).toBe(4)
})

test('renders all 12 years with years mode', () => {
  const onChangeMock = jest.fn(x => x)
  const date = setDate(new Date(), 2)

  const calendar = mountWithTheme(
    <Calendar value={date} onChange={onChangeMock} mode={Modes.YEARS}/>
  )

  const years = calendar
    .find(StyledTimeUnit)

  expect(years.length).toBe(12)
})

test('value represents active day', () => {
  const onChangeMock = jest.fn(x => x)

  const calendar = mountWithTheme(
    <Calendar value={new Date()} onChange={onChangeMock}/>
  )

  const days = calendar
    .find({ active: true })

  // Per active day you will have two components with active set to true
  expect(days).toHaveLength(2)
})
