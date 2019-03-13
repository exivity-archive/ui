import React from 'react'
import styled, { css } from 'styled-components'
import { fromTheme } from '../../utils/styled'
import { makeSpacerLines, SpacerLines } from './helpers'

interface StyledExpandableSpacerProps {
  spacerLines: SpacerLines
  level: number
  distance: number
}

export const StyledExpandableSpacer = styled.div<StyledExpandableSpacerProps>`
  margin-left: ${({ level }) => (level * 40)}px;
  margin-right: 20px;
  height: 100%;
  z-index: 1;

  ${({ spacerLines, distance }) => css`&:after {
      position: relative;
      left: -20px;
      top: calc(-${(100 * distance)}% - 50%);
      border: solid ${fromTheme(theme => theme.colours.lightGray)};
      border-width: ${spacerLines.top}px ${spacerLines.right}px ${spacerLines.bottom}px ${spacerLines.left}px;
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
      spacerLines={makeSpacerLines(level, index, length)}
      level={level}
      distance={distance}>
      <Content>{button}{children}</Content>
    </StyledExpandableSpacer>
  )
}
