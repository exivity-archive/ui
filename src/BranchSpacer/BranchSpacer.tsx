import React, { useMemo, cloneElement, FC, ReactElement } from 'react'
import styled, { css } from 'styled-components'

import { fromTheme } from '../utils/styled'
import { getDistanceFromSibling } from './helpers'
import { iterateAllChildren, TreeItem } from '../utils/makeParentChildTree'
import { useClientRect } from '../useClientRect'

interface StyledBranchSpacerProps {
  level: number
  distance: number
  spacing: number
}

const StyledBranchSpacer = styled.div<StyledBranchSpacerProps>`
  margin-left: ${({ spacing, level }) => spacing * level}px;
  height: 100%;

  ${({ distance, spacing }) => css`&:after {
      position: relative;
      top: calc(-${100 * distance}% - 50%);
      right: ${spacing}px;
      border: solid ${fromTheme(theme => theme.colors.lightGray)};
      border-width: 0px 0px 2px 2px;
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

interface BranchSpacerProps {
  button: ReactElement<any>
  index: number
  data: TreeItem<{}>[]
  spacing?: number
}

export const BranchSpacer: FC<BranchSpacerProps> = ({ children, index, button, data, spacing }) => {
  const item = data[index]
  const distance = getDistanceFromSibling(data, index)
  const [buttonRect, buttonRef] = useClientRect()

  const buttonWidth = buttonRect
    ? buttonRect.width
    : 0

  const childCount = useMemo(() => {
    let n = 0
    iterateAllChildren(item, () => { n++ })
    return n
  }, [data])

  return (
    <StyledBranchSpacer
      level={item.level}
      spacing={spacing || buttonWidth}
      distance={distance}>
      <Content >
        {cloneElement(button, { ...button.props, ref: buttonRef, style: { visibility: childCount > 0 ? 'visible' : 'hidden' } })}
        {children}
      </Content>
    </StyledBranchSpacer>
  )
}
