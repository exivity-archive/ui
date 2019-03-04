import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`

export const CanvasDecorator = (storyFn: any) => (
  <Wrapper>
    <style>
      {`body { margin: 0; }`}
    </style>
    {storyFn()}
  </Wrapper>
)
