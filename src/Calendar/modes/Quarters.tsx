import React from 'react'
import { isSameQuarter, startOfQuarter, setQuarter, format } from 'date-fns'

import { StyledTimeUnit, StyledQuarters } from '../styled'
import { CommonPeriodProps } from './Days'

function getRenderQuarter (value: Date, browseDate: Date, onChange: Function) {
  return (_: undefined, index: number) => {
    const quarter = index + 1
    const thisQuarter = setQuarter(browseDate, quarter)
    const isActive = isSameQuarter(value, thisQuarter)

    return (
      <li key={index}>
        <StyledTimeUnit active={isActive}
                   onClick={() => onChange(startOfQuarter(thisQuarter))}>
          {format(thisQuarter, 'Qo')}
        </StyledTimeUnit>
      </li>
    )
  }
}

export const Quarters = ({ value, browseDate, onChange }: CommonPeriodProps) => {
  const renderQuarter = getRenderQuarter(value, browseDate, onChange)

  return (
    <>
      <StyledQuarters>
        {new Array(4).fill(null).map(renderQuarter)}
      </StyledQuarters>
    </>
  )
}
