import React, { FC } from 'react'
import styled, { css } from 'styled-components'

import { fromTheme } from '../utils/styled'
import { getDistanceFromSibling } from './helpers'
import { TreeItem } from '../utils/makeParentChildTree'

interface StyledBranchSpacerProps {
  level: number
  distance: number
  spacing: number
}

const StyledBranchSpacer = styled.div<StyledBranchSpacerProps>`
  margin-left: ${({ spacing, level }) => spacing * (level - 1)}px;
  height: 100%;

  ${({ distance, spacing, level }) => level > 1 && css`&:after {
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
  index: number
  data: TreeItem<any>[]

  spacing?: number
}

export const BranchSpacer: FC<BranchSpacerProps> = ({ children, index, data, spacing = 40 }) => {
  const item = data[index]
  const distance = getDistanceFromSibling(data, index)

  return (
    <StyledBranchSpacer
      level={item.level}
      spacing={spacing}
      distance={distance}>
      <Content >
        {children}
      </Content>
    </StyledBranchSpacer>
  )
}
