import * as React from 'react'
import styled from 'styled-components';
import { Theme } from '../../../theme';

interface IBreakLineProps {
  hasText: boolean;
}

const BreakLine = styled.div`
  background: #ccc;  
  height: 1px;
  margin: auto;
  width: ${(props: IBreakLineProps) => props.hasText ? '75%' : '100%'};
`

const BreakText = styled.div`
  width: 25%;
  font-size: 26px;
  font-stretch: 0.1em;
  color: ${props => props.theme.colors.gray};
  transform: scaleY(1.2);
  font-weight: 100;
`

interface IBreakProps {
  className?: string,
  text: string
  theme?: Theme
}

const Break: React.FC<IBreakProps> = ({ className, text }) => (
  <div className={className}>{!!text && <BreakText>{text}</BreakText>}<BreakLine hasText={!!text} /></div>
)

export default styled(Break)`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-top: 50px;
`