import React, { FC } from 'react'
import styled from 'styled-components'

export interface ButtonProps {
  /**
   * Enable nice pink color
   * @default "false"
   */
  pink?: boolean
  className: string
}

const BaseButton: FC<ButtonProps> = ({
  children,
  className
}) => <button className={className}>{children}</button>

export const Button = styled(BaseButton)`
  padding: 10px;
  background-color: ${p => p.pink ? 'hotpink' : 'silver'};
`

export default Button
