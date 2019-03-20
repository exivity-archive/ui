import React, { FunctionComponentElement } from 'react'
import styled from 'styled-components'
import { globalBlockSpacing } from '../utils/styled'
import { FieldProps } from './Field'

type FieldElement = FunctionComponentElement<any>

interface ContainerProps extends FieldProps {
  children?: FieldElement | FieldElement[]
}

const Wrapper = styled.div`
  ${globalBlockSpacing};
`

export const Container: React.FC<ContainerProps> = ({ children, ...otherProps }) => {
  return children
    ? <Wrapper>
      {React.Children.map(children, (child: FieldElement) => {
        return React.cloneElement(child, otherProps)
      })}
    </Wrapper>
    : null
}

Container.displayName = 'Field.Container'
