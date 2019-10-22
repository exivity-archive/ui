import React from 'react'
import styled from 'styled-components'
import { Searchbar as UISearchbar, SearchbarProps } from '../'

const StyledSearchbar = styled(UISearchbar)`
  background-color: #F4F4F4;
`

export const SearchBar = (props: SearchbarProps) => (
  <StyledSearchbar {...props}
     placeholder={
       props.placeholder
         ? props.placeholder.toUpperCase()
         : undefined
     } />
)
