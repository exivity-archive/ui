import React, { FC } from 'react'
import styled from 'styled-components'

export interface ButtonProps {
  pink?: boolean
  className?: string
}

const BaseButton: FC<ButtonProps> = (props) => <button {...props}/>

BaseButton.defaultProps = {
  pink: false
}

/** @component */
export default styled(BaseButton)`
  padding: 10px;
  background-color: ${p => p.pink ? 'hotpink' : 'silver'};
`
