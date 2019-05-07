import React from 'react'
import { setDate, getDate, isDate, getDaysInMonth } from 'date-fns'
import { mountWithTheme } from '../utils/tests/mountWithTheme'
import { StyledDay } from './styled'

import { Calendar } from '.'

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
    .find(StyledDay)

  expect(days.length).toBe(getDaysInMonth(date))
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
