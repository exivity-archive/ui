import * as React from 'react'
import styled from 'styled-components';
import theme, { Theme } from '../../../theme'

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: 650px;
  margin: 25px 0;
`

const SubLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
`

const TopLabel = styled.span`
  margin-top: -4px;
  font-weight: 600;
  color: #444444;
`
interface ISublabelProps {
  	theme: Theme
}

const SubLabel = styled.div`
  font-size: small;
  color: ${(p: ISublabelProps) => p.theme.colors.gray};
  margin-top: -4px;
`

interface ILabelProps {
  name: string
  description?: string
}

const Label: React.FC<ILabelProps> = ({ name, description, children }) => (
  <LabelWrapper>
    <SubLabelWrapper>
      <TopLabel>{name}</TopLabel>
      <SubLabel theme={theme}>{description}</SubLabel>
    </SubLabelWrapper>
    {children}
  </ LabelWrapper>
)



export default Label