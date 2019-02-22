import React, { Fragment } from 'react'
import MainIcon from './MainIcon';
import SubIcon from './SubIcon';

interface IIconProps {
  icon: JSX.Element
  subIcon?: JSX.Element
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

const Icon: React.FC<IIconProps> = ({ icon, subIcon, onClick }) => (
  <Fragment>
    <MainIcon onClick={onClick} icon={icon} subIcon={subIcon} />
    {!!subIcon && <SubIcon onClick={onClick} icon={subIcon} />}
  </Fragment>
)

export default Icon
