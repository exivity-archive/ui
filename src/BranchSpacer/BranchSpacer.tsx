import React, { FC } from 'react'
import styled, { css } from 'styled-components'

import { fromTheme } from '../utils/styled'
import { getDistanceFromSibling } from './helpers'
import { TreeItem, PARENT, CHILDREN } from '../utils/makeParentChildTree'

interface StyledBranchSpacerProps {
  level: number
  distance: number
  spacing: number
  padding: number
  firstChild: boolean
}

const StyledBranchSpacer = styled.div<StyledBranchSpacerProps>`
  margin-left: ${({ spacing, level }) => spacing * (level - 1)}px;
  height: 100%;

  ${({ distance, spacing, padding, level, firstChild }) => level > 1 && css`
    &:after {
      position: relative;
      top: calc(-${100 * distance}% - ${firstChild ? 0 : 50}%);
      border: solid ${fromTheme(theme => theme.colors.lightGray)};
      border-width: 0px 0px 2px 2px;
      content: ' ';
      display: block;
      right: ${spacing}px;
      width: ${spacing - padding}px;
      height: ${firstChild ? 50 : distance * 100}%;
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
  index: number
  data: TreeItem<any>[]

  spacing?: number
  padding?: number
}

export const BranchSpacer: FC<BranchSpacerProps> = ({
  children,
  index,
  data,
  spacing = 40,
  padding = 0
}) => {
  if (padding > spacing) {
    console.warn('BranchSpacer: Padding cannot be greater than spacing')
  }

  const item = data[index]
  const distance = getDistanceFromSibling(data, index)

  let firstChild = false
  if (item[PARENT]) {
    firstChild = item[PARENT][CHILDREN][0].key === item.key
  }

  return (
    <StyledBranchSpacer
      firstChild={firstChild}
      level={item.level}
      spacing={spacing}
      padding={Math.min(padding, spacing)}
      distance={distance}>
      <Content >
        {children}
      </Content>
    </StyledBranchSpacer>
  )
}
