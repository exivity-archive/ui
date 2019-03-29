import React, { useRef, useEffect, useState, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { fromTheme } from '../../utils/styled'
import { ButtonProps } from '../../Button'
import { TreeListItem, iterateAllChildren } from '../helpers'
import { distanceBetweenNextSibling, makeBorderWidth } from './helpers'

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
}

export const ExpandableSpacer: React.FC<ExpandableSpacerProps> = ({ children, index, button, data }) => {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [left, setLeft] = useState(0)
  const item = data[index]
  const distance = distanceBetweenNextSibling(data, index)

  useEffect(() => {
    if (buttonRef.current) {
      setLeft((buttonRef.current.getBoundingClientRect().width))
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
      spacing={left}
      distance={distance}>
      <Content >{!(!item.children && left !== 0) &&
        <div ref={buttonRef}>{button}</div>
      }{children}</Content>
    </StyledExpandableSpacer>
  )
}
