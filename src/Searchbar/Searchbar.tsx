import React from 'react'
import styled, { css } from 'styled-components'
import { MdSearch } from 'react-icons/md'

import { BlockProps, blockStyles } from '../Block'
import { Input, InputProps } from '../Input'
import { fromTheme, toRgbString } from '../utils/styled'
import { Adornment } from '../Adornment'

interface SearchbarOwnProps {
  animated?: boolean
  dark?: boolean
}

export type SearchbarProps =
  & InputProps
  & BlockProps
  & SearchbarOwnProps

function getLightgray (props: SearchbarProps) {
  return fromTheme(theme => toRgbString(theme.colors.lightGray))(props)
}

const StyledInput = styled(Input)`
  ${blockStyles};

  border-color: transparent;
  background-color: ${(props) => props.dark
    ? `rgba(${getLightgray(props)}, 0.7)`
    : '#fff'
  };

  &:hover, &:focus {
    border-color: transparent;
  }

  ${(props: SearchbarProps) => props.animated && css`
    will-change: padding-left;
    transition: padding-left .1s ease;

    &:hover, &:focus {
      padding-left: 1em !important;
    }
  `}

  ${(props: SearchbarProps) => !props.flat && css`
    &:hover, :focus {
      background-color: ${fromTheme(theme => theme.colors.lightGray)};
    }
  `}
`

export function Searchbar (props: SearchbarProps) {
  return (
    <Adornment right={<MdSearch />} >
      <StyledInput {...props} />
    </Adornment>
  )
}
