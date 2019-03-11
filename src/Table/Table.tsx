import styled from 'styled-components'
import { fromTheme, globalFont, StyledProps } from '../utils/styled'
import { preciseEm } from '../utils/styled/isolated'

interface TableProps extends StyledProps {
  compact?: boolean
}

export const Table = styled.table<TableProps>`
  ${globalFont};

  table-layout: fixed;
  border-collapse: collapse;
  line-height: 200%;

  tbody,
  td,
  th,
  tfoot,
  thead,
  tr {

  }

  thead tr,
  tbody tr:not(:last-child) {
    border-bottom: 1px solid ${fromTheme(theme => theme.colours.lightGray)};
  }

  tfoot tr {
    border-top: 1px solid ${fromTheme(theme => theme.colours.lightGray)};
  }

  caption {
    text-transform: uppercase;
    font-size: ${preciseEm(0.9)}em;
    color: ${fromTheme(theme => theme.colours.gray)};
  }

  td,
  th {
    padding: ${props => props.compact ? preciseEm(0) : preciseEm(0.2)}em 0;
    vertical-align: middle;

    &:not(:first-child) {
      padding-left: ${props => props.compact ? preciseEm(0.1) : preciseEm(0.4)}em;
    }

    &:not(:last-child) {
      padding-right: ${props => props.compact ? preciseEm(0.1) : preciseEm(0.4)}em;
    }
  }

  th {
    font-weight: bold;
    text-align: left;
  }
`

Table.displayName = 'Table'
