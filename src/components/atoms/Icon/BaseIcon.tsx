import * as React from 'react'

import styled from "styled-components";

interface IBaseIconProps {
  className?: string
  extraClassName?: string
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  icon: JSX.Element
}
 
const BaseIcon: React.FC<IBaseIconProps> = ({ className, extraClassName, icon, onClick }) => {
  return <span className={className + ' ' + extraClassName} onMouseDown={onClick}>{icon}</span>
}

export default styled(BaseIcon)`
  cursor: auto;
  font-family: ${props => `Material Icons, ${props.theme.global.font}`};
  font-weight: normal;
  font-style: normal;
  font-size: 24px;

  line-height: 1;
  vertical-align: middle;

  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;

  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
 
`
