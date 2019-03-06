import React from 'react'
import styled, { css } from 'styled-components'
import { fromTheme } from '../../utils/theme'

interface ExpandableSpacerProps {
  length: number
  index: number
  level: number
  button?: React.ReactComponentElement<'button', {}>
  className?: string
  distance: number
}

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ExpandableSpacer: React.FC<ExpandableSpacerProps> = ({ button, className, children }) => {
  return <div className={className}><Content>{button}{children}</Content></div>
}

export default styled(ExpandableSpacer)`
  margin-left: ${props => (props.level * 40)}px;
  margin-right: 20px;
  height: 100%;
  z-index: 1;

  ${({ level, length, index, distance }) => css`&:after {
      position: relative;
      left: -20px;
      top: calc(-${(100 * distance)}% - 50%);
      border: solid ${fromTheme(theme => theme.colours.lightGray)};
      border-width: ${level === 1 ? `${index === 0 ? 0 : 1}px 0 ${index === length - 1 ? 1 : 0}px ${index === 0 ? 0 : 1}px` : '0 0 1px 1px'};
      content: ' ';
      display: block;
      width: 20px;
      height: ${distance * 100}%;
    }`
  }
`
