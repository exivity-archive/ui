import * as React from 'react'
import styled from 'styled-components'

const MaxWidthDiv = styled.div`
  max-width: 50rem;
`

export const MaxWidth = (storyFn: any) => (
  <MaxWidthDiv>
    {storyFn()}
  </MaxWidthDiv>
)
