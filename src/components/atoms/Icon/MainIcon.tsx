import * as React from 'react'
import styled, { css } from 'styled-components';
import BaseIcon from './BaseIcon';

interface IMainIconProps {
  subIcon?: JSX.Element
  icon: JSX.Element
  className?: string
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

const MainIcon: React.FC<IMainIconProps> = ({ icon, className, onClick }) => {
  return <BaseIcon extraClassName={className} icon={icon} onClick={onClick} />
}

export default styled(MainIcon)`
  ${props => props.subIcon && css`
    /* Zero out the line-height so that it doesn't
      interfere with the positioning that follows */
      line-height: 0;

      /* Where the magic happens: makes all browsers position
        the sup/sup properly, relative to the surrounding text */
      position: relative;

      /* Note that if you're using Eric Meyer's reset.css, this
        is already set and you can remove this rule */
      vertical-align: baseline;

      /* Move the superscripted text up */
      top: -.2em;

      font-size: 16px;
  `}
  ${props => !props.children && props.subIcon && css`
      width: 16px;
      height: 16px;
  `}
`

