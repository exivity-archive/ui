import React, { useReducer } from 'react'

import { Block, BlockProps } from '../Block'

import { Browser, StyledBrowser } from './Browser'
import { Years } from './modes/Years'
import { Quarters } from './modes/Quarters'
import { Months } from './modes/Months'
import { Days } from './modes/Days'
import { StyledHeader, StyledDays, StyledMonths, StyledWeekDays, StyledQuarters } from './styled'
import { browseReducer, createBrowsers, formatDateHeader, useMode } from './helpers'
import { onChangeDate, Modes } from './types'

export interface CalendarProps {
  value: Date
  onChange: onChangeDate
  onHeaderClick?: () => void
  initialMode?: Modes
  mode?: Modes | Modes[]
}

const renderMode = (mode: Modes, value: Date, browseDate: Date, onChange: onChangeDate) => {
  switch (mode) {
    case Modes.YEARS:
      return <Years value={value} browseDate={browseDate} onChange={onChange} />

    case Modes.QUARTERS:
      return <Quarters value={value} browseDate={browseDate} onChange={onChange} />

    case Modes.MONTHS:
      return <Months value={value} browseDate={browseDate} onChange={onChange} />

    case Modes.DAYS:
    default:
      return <Days value={value} browseDate={browseDate} onChange={onChange} />
  }
}

export const Calendar = ({ value, onChange, onHeaderClick, initialMode, mode, ...blockProps }: CalendarProps & BlockProps) => {
  const [selectedMode, selectNextMode] = useMode(initialMode, mode)
  const [browseDate, dispatch] = useReducer(browseReducer, value)
  const [onPrev, onNext] = createBrowsers(dispatch, selectedMode)

  return (
    <Block {...blockProps}>
      <Browser onPrev={onPrev} onNext={onNext}>
        <StyledHeader onClick={onHeaderClick || selectNextMode}>
          {formatDateHeader(browseDate, selectedMode)}
        </StyledHeader>
      </Browser>
      {renderMode(selectedMode, value, browseDate, onChange)}
    </Block>
  )
}

// CSS selectors for styled-components
Calendar.Browser = StyledBrowser
Calendar.Header = StyledHeader
Calendar.Years = StyledMonths
Calendar.Quarters = StyledQuarters
Calendar.Months = StyledMonths
Calendar.Days = StyledDays
Calendar.Weekdays = StyledWeekDays
