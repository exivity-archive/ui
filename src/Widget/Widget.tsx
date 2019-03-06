import * as React from 'react'
import styled from 'styled-components'
import { Theme } from '../defaultTheme/theme'
import { fromTheme } from '../utils/styled'

const WidgetTitle = styled.h4`
  letter-spacing: -0.025em;
  font-weight: 700;
  font-size: 22px;
  color: ${fromTheme(theme => theme.colours.blue)};
`

interface WidgetSubTitleProps {
  theme: Theme
}

const WidgetSubTitle = styled.span`
  color: ${(props: WidgetSubTitleProps) => props.theme.colours.gray};
  font-size: 0.8em;
  padding-left: 10px;
  font-weight: 500;
`

interface WidgetProps {
  className?: string
  children: React.ReactNode
  title?: string
  subTitle?: string
  theme: Theme
}

const PlainWidget: React.FC<WidgetProps> = ({ className, children, title, subTitle }) => (
  <div className={className}>
    {title &&
    <WidgetTitle>
      {title}
      {subTitle && <WidgetSubTitle>{subTitle}</WidgetSubTitle>}
    </WidgetTitle>}
    {children}
  </div>
)

const Widget = styled(PlainWidget)`
  background: white;
  box-shadow: 2px 2px 0 lightblue;
  padding: 20px 20px 100px;
  position: relative;
  box-sizing: border-box;
  border-radius: 3px;
  width: 100%;
`

export default Widget
