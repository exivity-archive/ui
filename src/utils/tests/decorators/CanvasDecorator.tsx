import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 12px; // plus 8px body margin
`

export const CanvasDecorator = (storyFn: any) => (
  <Wrapper>
    {storyFn()}
  </Wrapper>
)
