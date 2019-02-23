import * as React from 'react'
import styled from 'styled-components';

export type HeaderLevels = 1 | 2 | 3 | 4 | 5 | 6

interface IHeaderProps {
  level: HeaderLevels
  className?: string
}

const LeveledHeader: React.FC<IHeaderProps> = ({ level, children, className }) => {
  switch(level){
    case 1:
      return <h1 className={className}>{children}</h1>
    case 2:
      return <h2 className={className}>{children}</h2>
    case 3:
      return <h3 className={className}>{children}</h3>
    case 4:
      return <h4 className={className}>{children}</h4>
    case 5:
      return <h5 className={className}>{children}</h5>
    case 6:
      return <h6 className={className}>{children}</h6>
  }
}

export default styled(LeveledHeader)`
  margin-left: ${p => `${-(10 * (6 - p.level))}px`};
`