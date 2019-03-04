import React, { FunctionComponentElement } from 'react'
import { FieldProps } from './Field'

type FieldElement = FunctionComponentElement<any>

interface ContainerProps extends FieldProps {
  children: FieldElement | FieldElement[]
}

const Container: React.FC<ContainerProps> = ({ children, ...otherProps }) => {
  return <>
    {React.Children.map(children, (child: FieldElement) => {
      return React.cloneElement(child, otherProps)
    })}
  </>
}

Container.displayName = 'Field.Container'

export default Container
