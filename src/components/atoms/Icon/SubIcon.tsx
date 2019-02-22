import * as React from 'react'
import styled from 'styled-components';
import BaseIcon from './BaseIcon';

interface ISubIconProps {
  icon: JSX.Element
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  className?: string
}

const SubIcon: React.FC<ISubIconProps> = ({ icon, onClick, className }) => {
  return <BaseIcon onClick={onClick} icon={icon} extraClassName={className} />
}

export default styled(SubIcon)`
  /* Zero out the line-height so that it doesn't
    interfere with the positioning that follows */
  line-height: 0;

  /* Where the magic happens: makes all browsers position
    the sup/sup properly, relative to the surrounding text */
  position: relative;

  /* Note that if you're using Eric Meyer's reset.css, this
    is already set and you can remove this rule */
  vertical-align: baseline;

  /* Move the subscripted text down, but only
       half as far down as the superscript moved up */
  bottom: -.3em;
  margin-left: -.4em;

  font-size: 10px;

`