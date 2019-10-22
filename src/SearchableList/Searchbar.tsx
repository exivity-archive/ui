import React from 'react'
import styled from 'styled-components'
import { Searchbar as UISearchbar, SearchbarProps } from '../Searchbar'

const StyledSearchbar = styled(UISearchbar)`
  background-color: #F4F4F4;
`

export function SearchBar (props: SearchbarProps) {
  return (
    <StyledSearchbar {...props}
       placeholder={
         props.placeholder
           ? props.placeholder.toUpperCase()
           : undefined
       } />
  )
}
