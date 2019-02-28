import * as React from 'react'
import styled from 'styled-components'
import { Theme } from '../theme'

const WidgetTitle = styled.h4`
  letter-spacing: -0.025em;
  font-weight: 700;
  font-size: 22px;
  color: ${props => props.theme.colors.blue};
`

interface IWidgetSubTitleProps {
  theme: Theme
}

const WidgetSubTitle = styled.span`
  color: ${(props: IWidgetSubTitleProps) => props.theme.colors.gray};
  font-size: 0.8em;
  padding-left: 10px;
  font-weight: 500;
`

interface IWidget {
  className?: string
  children: React.ReactNode
  title?: string
  subTitle?: string
  theme: Theme
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
  width: 100%;
`
