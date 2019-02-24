import * as React from 'react'
import styled from 'styled-components';

const WidgetTitle = styled.h4`
  font-weight: 200;
`
const WidgetSubTitle = styled.span`
  color: #999;
  font-size: 0.8em;
  padding-left: 10px;
`

interface IWidget {
  className?: string
  children: JSX.Element | string
  title?: string
  subTitle?: string
}

const Widget: React.FC<IWidget> = ({ className, children, title, subTitle }) => (
  <div className={className}>
    {title && 
      <WidgetTitle>
        {title}
        {subTitle && <WidgetSubTitle>{subTitle}</WidgetSubTitle>}
      </WidgetTitle>}
    {children}
  </div>
)

export default styled(Widget)`
  background: white;
  box-shadow: 2px 2px 0 lightblue;
  padding: 20px;
  padding-bottom: 100px;
  position: relative;
  box-sizing: border-box;
  border-radius: 3px;
  width: 65%
`