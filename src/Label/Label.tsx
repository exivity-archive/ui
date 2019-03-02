import * as React from 'react'
import styled from 'styled-components'
import defaultStyledProps from '../utils/testing/defaultStyledProps'
import { StyledProps } from '../utils/types'

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  min-width: 250px;
`

const TopLabel = styled.div`
  font-family: ${(p: StyledProps) => p.theme.global.fontFamily};
  color: ${(p: StyledProps) => p.theme.colors.dark};
`
TopLabel.defaultProps = defaultStyledProps

const SubLabel = styled.div`
  font-family: ${(p: StyledProps) => p.theme.global.fontFamily};
  margin-top: 5px;
  font-size: 12px;
  color: ${(p: StyledProps) => p.theme.colors.gray};
`
SubLabel.defaultProps = defaultStyledProps

const LabelContent = styled.div`
  padding-left: 40px;
`

const LabelWithContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 40px 0;
`

interface ILabelProps extends StyledProps {
  name?: string
  description?: string
}

const Label: React.FC<ILabelProps> = ({ name, description, children }) => {
  const label = <LabelWrapper>
    <TopLabel>{name}</TopLabel>
    <SubLabel>{description}</SubLabel>
  </LabelWrapper>

  if (!children) {
    return label
  }

  return <LabelWithContentWrapper>
    {label}
    <LabelContent>
      {children}
    </LabelContent>
  </LabelWithContentWrapper>
}
Label.defaultProps = defaultStyledProps

export default Label
