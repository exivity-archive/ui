import React, { ReactNode, cloneElement, ReactElement } from 'react'
import styled, { css } from 'styled-components'

import { useClientRect } from '../useClientRect'
import { BlockProps, Block } from '../Block'
import { matchThemeProp } from '../utils/styled'

interface StyledAdornmentProps {
  position: 'left' | 'right'
  inset: number | string
}

const StyledAdornment = styled.span <StyledAdornmentProps>`
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  top: 0;
  font-size: ${
  matchThemeProp(
    theme => theme.global.sizes,
    { modifier: (em: number) => em * 20 }
  )}px;

  ${props => props.position === 'left'
    ? css`left: ${props.inset}px;`
    : css`right: ${props.inset}px;`
  }
`

export const AdornmentWrapper = styled(Block)`
  position: relative;
`

type AdornmentProps = {
  children: ReactElement<any>

  left?: ReactNode
  right?: ReactNode
  inset?: number
  test?: string
}

export const Adornment = ({
  left,
  right,
  children,
  inset = 10,
  test = 'adornment',
  ...blockProps
}: AdornmentProps & BlockProps) => {

  const [leftRect, leftRef] = useClientRect()
  const [rightRect, rightRef] = useClientRect()

  const paddingLeft = leftRect ? (leftRect.width + inset) : 0
  const paddingRight = rightRect ? (rightRect.width + inset) : 0

  const newProps = {
    ...children.props,
    style: {
      paddingRight,
      paddingLeft,
      width: '100%',
      ...children.props.style || {}
    }
  }

  const clonedChild = cloneElement(children, newProps)

  return (
    <AdornmentWrapper {...blockProps} data-test={`${test}-wrapper`}>
      {clonedChild}
      <StyledAdornment ref={leftRef} inset={inset} position='left' data-test={`left-${test}`}>
        {left}
      </StyledAdornment>
      <StyledAdornment ref={rightRef} inset={inset} position='right' data-test={`right-${test}`}>
        {right}
      </StyledAdornment>
    </AdornmentWrapper>
  )
}
