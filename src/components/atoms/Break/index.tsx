import * as React from 'react'
import styled from 'styled-components';

interface IBreakProps {
  className?: string
}

const Break: React.FC<IBreakProps> = ({ className }) => (
  <div className={className}></div>
)

export default styled(Break)`
    background: #ccc;
    position: relative;
    width: 100%;
    height: 1px;
  
`