import React from 'react'
import styled, { css } from 'styled-components'
import { ExpandableItem } from '../useExpandable'

interface ExpandableSpacerProps {
  length: number
  index: number
  level: number
  button?: React.ReactComponentElement<'button', {}>
  className?: string
  distance: number
}

const ExpandableSpacer: React.FC<ExpandableSpacerProps> = ({ button, className, children }) => {
  return <React.Fragment><div className={className}>{button} {children}</div></React.Fragment>
}

export default styled(ExpandableSpacer)`
  margin-left: ${props => (props.level * 40)}px;
  height: 100%;
  float: left;
  z-index: 1;

  ${({ level, length, index, distance }) => css`&:after {
      position: relative;
      left: -20px;
      top: -${(100 * distance) + 50}%;
      border: solid #000;
      border-width: ${level === 1 ? `1px 0 ${index === length - 1 ? '1px' : '0'} ${index === 0 ? '0' : '1px'}` : '0 0 1px 1px'};
      content: ' ';
      display: block;
      width: 20px;
      height: ${distance * 100}%;
    }`
  }
`
