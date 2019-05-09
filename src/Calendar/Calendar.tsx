import React, { useReducer } from 'react'
import { Block, BlockProps } from '../Block'

import { Browser } from './Browser'
import { Years } from './modes/Years'
import { Quarters } from './modes/Quarters'
import { Months } from './modes/Months'
import { Days } from './modes/Days'
import { StyledHeader } from './styled'
import { browseReducer, createBrowsers, formatDateHeader, useMode } from './helpers'

import { onChangeDate, Modes } from './types'

export interface CalendarProps {
  value: Date
  onChange: onChangeDate
  initialMode?: Modes
  mode?: Modes | Modes[]
}

const renderMode = (mode: Modes, value: Date, browseDate: Date, onChange: onChangeDate) => {
  switch (mode) {
    case Modes.YEARS:
      return <Years value={value} browseDate={browseDate} onChange={onChange}/>

    case Modes.QUARTERS:
      return <Quarters value={value} browseDate={browseDate} onChange={onChange}/>

    case Modes.MONTHS:
      return <Months value={value} browseDate={browseDate} onChange={onChange}/>

    case Modes.DAYS:
    default:
      return <Days value={value} browseDate={browseDate} onChange={onChange}/>
  }
}

export const Calendar = ({ value, onChange, initialMode, mode, ...blockProps }: CalendarProps & BlockProps) => {
  const [selectedMode, selectNextMode] = useMode(initialMode, mode)
  const [browseDate, dispatch] = useReducer(browseReducer, value)
  const [onPrev, onNext] = createBrowsers(dispatch, selectedMode)

  return (
    <Block {...blockProps}>
      <Browser onPrev={onPrev} onNext={onNext}>
        <StyledHeader onClick={selectNextMode}>
          {formatDateHeader(browseDate, selectedMode)}
        </StyledHeader>
      </Browser>
      {renderMode(selectedMode, value, browseDate, onChange)}
    </Block>
  )
}
