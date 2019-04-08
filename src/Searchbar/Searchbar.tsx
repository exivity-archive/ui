import React from 'react'
import { MdSearch } from 'react-icons/md'
import styled, { css } from 'styled-components'
import { InputProps } from '../AbstractInput/AbstractInput'
import { BlockProps, blockStyles } from '../Block'
import { TextInputWithIcon } from '../TextInputWithIcon'
import { fromTheme } from '../utils/styled'

interface SearchbarOwnProps {
  animated?: boolean
}

export type SearchbarProps =
  & InputProps
  & BlockProps
  & SearchbarOwnProps

const StyledTextInputWithIcon = styled(TextInputWithIcon)`
  ${blockStyles};

  background-color: #fff;
  border-color: transparent;

  &:hover, &:focus {
    border-color: transparent;
  }

  ${(props: SearchbarProps) => props.animated && css`
    will-change: padding-left;
    transition: padding-left .1s ease;

    &:hover, &:focus {
      padding-left: 1em;
    }
  `}

  ${(props: SearchbarProps) => !props.flat && css`
    &:hover, :focus {
      background-color: ${fromTheme(theme => theme.colors.lightGray)};
    }
  `}
`

export const Searchbar = (props: SearchbarProps) => (
  <StyledTextInputWithIcon
    icon={<MdSearch />}
    {...props}
  />
)
