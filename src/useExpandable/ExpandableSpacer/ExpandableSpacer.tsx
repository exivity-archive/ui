import React from 'react'
import styled, { css } from 'styled-components'
import { fromTheme } from '../../utils/styled'

interface StyledExpandableSpacerProps {
  length: number
  index: number
  level: number
  distance: number
}

const StyledExpandableSpacer = styled.div<StyledExpandableSpacerProps>`
  margin-left: ${({ level }) => (level * 40)}px;
  margin-right: 20px;
  height: 100%;
  z-index: 1;

  ${({ level, length, index, distance }) => css`&:after {
      position: relative;
      left: -20px;
      top: calc(-${(100 * distance)}% - 50%);
      border: solid ${fromTheme(theme => theme.colours.lightGray)};
      border-width: ${
        level === 1
          ? `${index === 0 ? 0 : 1}px 0 ${index === length - 1 ? 1 : 0}px ${index === 0 ? 0 : 1}px`
          : '0 0 1px 1px'};
      content: ' ';
      display: block;
      width: 20px;
      height: ${distance * 100}%;
    }`
  }
`

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

interface ExpandableSpacerProps {
  button?: React.ReactComponentElement<'button', {}>
  length: number
  index: number
  level: number
  distance: number
}

export const ExpandableSpacer: React.FC<ExpandableSpacerProps> = ({ button, children, length, index, level, distance }) => {
  return (
    <StyledExpandableSpacer
      length={length}
      index={index}
      level={level}
      distance={distance}>
      <Content>{button}{children}</Content>
    </StyledExpandableSpacer>
  )
}
