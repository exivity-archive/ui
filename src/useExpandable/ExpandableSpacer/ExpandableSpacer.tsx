import React, { useRef, useEffect, useState, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { fromTheme } from '../../utils/styled'
import { ButtonProps } from '../../Button'
import { TreeListItem } from '../helpers'
import { getAmountVisibleChildren, makeBorderWidth } from './helpers'
import { iterateAllChildren } from '../../utils/makeParentChildTree'

interface StyledExpandableSpacerProps {
  borderWidth: string
  level: number
  distance: number
  spacing: number
}

export const StyledExpandableSpacer = styled.div<StyledExpandableSpacerProps>`
  margin-left: ${({ spacing, level }) => spacing * level}px;
  height: 100%;

  ${({ borderWidth, distance, spacing }) => css`&:after {
      position: relative;
      top: calc(-${(100 * distance)}% - 50%);
      right: ${(spacing * 0.5)}px;
      border: solid ${fromTheme(theme => theme.colors.lightGray)};
      border-width: ${borderWidth}
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
  data: TreeListItem<{}>[]
  spacing?: number
  useButtonSpacing?: boolean
}

export const ExpandableSpacer: React.FC<ExpandableSpacerProps> = ({ children, index, button, data, ...rest }) => {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [spacing, setSpacing] = useState(rest.spacing !== undefined ? rest.spacing : 0)
  const item = data[index]
  const distance = getAmountVisibleChildren(data, index)

  useEffect(() => {
    if (rest.spacing === undefined && buttonRef.current) {
      setSpacing(buttonRef.current.getBoundingClientRect().width)
    }
  }, [buttonRef.current])

  const childCount = useMemo(() => {
    let n = 0
    iterateAllChildren(item, () => { n++ })
    return n
  }, [data])

  const isOnlyRootParent = index === 0 && (childCount === 0 || childCount > data.length - 2)
  const borderWidth = makeBorderWidth(index, isOnlyRootParent)

  return (
    <StyledExpandableSpacer
      borderWidth={borderWidth}
      level={item.level}
      spacing={spacing}
      distance={distance}>
      <Content >{
        <div
          ref={buttonRef}
          style={{ visibility: item.children ? 'visible' : 'hidden' }}>
          {button}
        </div>}
        {children}
      </Content>
    </StyledExpandableSpacer>
  )
}
