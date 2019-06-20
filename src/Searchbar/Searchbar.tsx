import React from 'react'
import styled, { css } from 'styled-components'
import { MdSearch } from 'react-icons/md'

import { BlockProps, blockStyles } from '../Block'
import { Input, InputProps } from '../Input/Input'
import { fromTheme } from '../utils/styled'
import { Adornment } from '../Adornment'

interface SearchbarOwnProps {
  animated?: boolean
}

export type SearchbarProps =
  & InputProps
  & BlockProps
  & SearchbarOwnProps

const StyledInput = styled(Input)`
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
  <Adornment right={<MdSearch />} >
    <StyledInput {...props} />
  </Adornment>
)
