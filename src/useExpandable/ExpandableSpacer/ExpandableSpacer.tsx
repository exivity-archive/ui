import React from 'react'
import styled, { css } from 'styled-components'
import { fromTheme } from '../../utils/styled'

interface StyledExpandableSpacerProps {
  leftSpacerLine: number
  level: number
  distance: number
}

export const StyledExpandableSpacer = styled.div<StyledExpandableSpacerProps>`
  margin-left: ${({ level }) => (level * 40)}px;
  margin-right: 20px;
  height: 100%;

  ${({ leftSpacerLine, distance }) => css`&:after {
      position: relative;
      left: -20px;
      top: calc(-${(100 * distance)}% - 50%);
      border: solid ${fromTheme(theme => theme.colors.lightGray)};
      border-width: 0px 0px 1px ${leftSpacerLine}px;
      content: ' ';
      display: block;
      width: 20px;
      height: ${distance * 100}%;
      z-index: -1;
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
  button?: React.ReactComponentElement<'button', {}> | null
  index: number
  level: number
  distance: number
}

export const ExpandableSpacer: React.FC<ExpandableSpacerProps> = ({ button, children, index, level, distance }) => {
  return (
    <StyledExpandableSpacer
      leftSpacerLine={index > 0 ? 1 : 0}
      level={level}
      distance={distance}>
      <Content>{button}{children}</Content>
    </StyledExpandableSpacer>
  )
}
