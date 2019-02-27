import * as React from 'react'
import styled from 'styled-components';
import theme, { Theme } from '../theme'

const SubLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  min-width: 250px;
`

const TopLabel = styled.span`
  font-weight: 600;
  color: #444444;
`
interface ISublabelProps {
  theme: Theme
}

const SubLabel = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: ${(p: ISublabelProps) => p.theme.colors.gray};
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
      <SubLabel theme={theme}>{description}</SubLabel>
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