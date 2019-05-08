import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import { globalFont } from '../utils/styled'

const StyledBrowser = styled.div`
  ${globalFont}

  box-sizing: border-box;
  padding: 10px 25px;
  width: 100%;
  text-align: center;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  ul li {
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .prev, .next {
    user-select: none;
    cursor: pointer;
  }

  .prev {
    float: left;
  }

  .next {
    float: right;
  }
`

interface BrowserProps {
  onNext: () => void
  onPrev: () => void
  children: string | FunctionComponent
}

export const Browser = ({ children, onNext, onPrev, ...otherProps }: BrowserProps) => (
  <StyledBrowser {...otherProps}>
    <ul>
      <li className='prev' onClick={onPrev}>&#10094;</li>
      <li className='next' onClick={onNext}>&#10095;</li>
      <li>
        {children}
      </li>
    </ul>
  </StyledBrowser>
)
