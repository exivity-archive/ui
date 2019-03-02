import * as React from 'react'
import styled from 'styled-components'
import { StyledProps } from '../utils/types'

const SubLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  min-width: 250px;
`

const TopLabel = styled.span`
  font-family: ${(p: StyledProps) => p.theme.global.fontFamily};
  color: ${(p: StyledProps) => p.theme.colors.dark};
`

const SubLabel = styled.div`
  font-family: ${(p: StyledProps) => p.theme.global.fontFamily};
  margin-top: 5px;
  font-size: 12px;
  color: ${(p: StyledProps) => p.theme.colors.gray};
`

const LabelContent = styled.div`
  padding-left: 40px;
`

interface ILabelProps {
  name: string
  description?: string
  className?: string
}

const Label: React.FC<ILabelProps> = ({ name, description, children, className }) => (
  <div className={className}>
    <SubLabelWrapper>
      <TopLabel>{name}</TopLabel>
      <SubLabel>{description}</SubLabel>
    </SubLabelWrapper>
    <LabelContent>
      {children}
    </LabelContent>
  </div>
)

export default styled(Label)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 40px 0;
`
