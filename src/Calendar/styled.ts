import styled, { css } from 'styled-components'
import { fromTheme, globalFont } from '../utils/styled'

export const StyledWeekDays = styled.ul`
  ${globalFont}
  opacity: 0.6;
  margin: 0;
  padding: 10px 0;

  li {
    display: inline-block;
    width: 14.28%;
    text-align: center;
  }
`

export const StyledDays = styled.ul`
  ${globalFont}

  padding: 10px 0;
  margin: 0;

  li {
    list-style-type: none;
    display: inline-block;
    width: calc(14.28% - 5px);
    text-align: center;
    margin-right: 5px;
    margin-bottom: 5px;
  }
`

export const StyledDay = styled.div<{ active: boolean }>`
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
