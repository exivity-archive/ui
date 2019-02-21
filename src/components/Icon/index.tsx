import React, { Fragment } from 'react'
import MainIcon from './MainIcon';
import SubIcon from './SubIcon';

interface IIconProps {
  children: string
  subIcon?: string
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

const Icon: React.FC<IIconProps> = ({ children, subIcon, onClick }) => (
  <Fragment>
    <MainIcon onClick={onClick} subIcon={subIcon}>{children}</MainIcon>
    {!!subIcon && <SubIcon onClick={onClick}>{subIcon}</SubIcon>}
  </Fragment>
)

export default Icon
