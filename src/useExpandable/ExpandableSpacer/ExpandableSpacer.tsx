import React, { useRef, useEffect, useState, cloneElement } from 'react'
import styled, { css } from 'styled-components'
import { fromTheme } from '../../utils/styled'
import { ButtonProps } from '../../Button'

interface StyledExpandableSpacerProps {
  leftSpacerLine: number
  level: number
  distance: number
  spacing: number
}

export const StyledExpandableSpacer = styled.div<StyledExpandableSpacerProps>`
  margin-left: ${({ spacing, level }) => (spacing * 1.5) * level}px;
  height: 100%;

  ${({ leftSpacerLine, distance, spacing }) => css`&:after {
      position: relative;
      top: calc(-${(100 * distance)}% - 50%);
      right: ${spacing}px;
      border: solid ${fromTheme(theme => theme.colours.lightGray)};
      border-width: 0px 0px 1px ${leftSpacerLine}px;
      content: ' ';
      display: block;
      width: ${spacing}px;
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
  button?: React.ReactComponentElement<'button', ButtonProps> | null
  index: number
  level: number
  distance: number
  hasChildren: boolean
}

export const ExpandableSpacer: React.FC<ExpandableSpacerProps> = ({ children, index, level, distance, button, hasChildren }) => {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [left, setLeft] = useState(0)

  useEffect(() => {
    if (buttonRef.current) {
      setLeft((buttonRef.current.getBoundingClientRect().width))
    }
  }, [level])

  return (
    <StyledExpandableSpacer
      leftSpacerLine={index > 0 ? 1 : 0}
      level={level}
      spacing={left}
      distance={distance}>
      <Content >{!(!hasChildren && left !== 0) &&
        <div ref={buttonRef}>{button}</div>
      }{children}</Content>
    </StyledExpandableSpacer>
  )
}
