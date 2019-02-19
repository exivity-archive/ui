import React, { FC } from 'react'
import styled from 'styled-components'

export interface ButtonProps {
  /**
   * Enable nice pink color
   */
  pink?: boolean
  className: string
}

const BaseButton: FC<ButtonProps> = (props) => <button {...props}/>

BaseButton.defaultProps = {
  pink: false
}

export const Button = styled(BaseButton)`
  padding: 10px;
  background-color: ${p => p.pink ? 'hotpink' : 'silver'};
`

export default Button
