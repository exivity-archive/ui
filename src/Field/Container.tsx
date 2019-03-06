import React, { FunctionComponentElement } from 'react'
import { FieldProps } from './Field'

type FieldElement = FunctionComponentElement<any>

interface ContainerProps extends FieldProps {
  children?: FieldElement | FieldElement[]
}

export const Container: React.FC<ContainerProps> = ({ children, ...otherProps }) => {
  return children ? <div>
    {React.Children.map(children, (child: FieldElement) => {
      return React.cloneElement(child, otherProps)
    })}
  </div> : null
}

Container.displayName = 'Field.Container'
