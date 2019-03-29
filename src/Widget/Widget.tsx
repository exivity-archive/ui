import React, { FC, useState } from 'react'
import styled, { css } from 'styled-components'

import { fromTheme, hexToString, StyledProps } from '../utils/styled'
import { Heading } from '../Heading'
import { HeadingProps } from '../Heading/Heading'
import { MdEdit } from 'react-icons/md'
import { TextInput } from '../TextInput'
import { Button } from '../Button'

interface StyledWidgetProps {
  noPadding?: boolean
}

const StyledWidget = styled.div<StyledWidgetProps>`
  background: white;
  box-shadow: 1px 1px 0 rgba(${fromTheme(theme => hexToString(theme.global.purposes.primary))},0.4);
  padding: ${({ noPadding }) => noPadding ? 0 : fromTheme(theme => theme.global.baseSpacing * 1)}em;
  position: relative;
  box-sizing: border-box;
  border-radius: 3px;
  width: 100%;
`

const EditButton = styled(Button)`
 position: absolute;
 right: ${fromTheme(theme => theme.global.baseSpacing * 2)}em;
 top: ${fromTheme(theme => theme.global.baseSpacing * 1.225)}em;
`

interface StyledWidgetHeaderProps {
  padding?: boolean
}

const StyledWidgetHeader = styled.div<StyledWidgetHeaderProps>`
  ${({ padding }) => padding && css`
    padding: ${fromTheme(theme => theme.global.baseSpacing * 1)}em 0 0 ${fromTheme(theme => theme.global.baseSpacing * 1)}em;
  `}
  height: 40px;
`

const TitleInput = styled.div`
  max-width: 90%;
`

interface WidgetHeaderProps extends StyledWidgetHeaderProps, HeadingProps {
  editable?: boolean
  initialEdit?: boolean
  onChange?: (newValue: string) => void
  children: string
}

const WidgetHeader: FC<WidgetHeaderProps> = ({ padding = false, type, editable, initialEdit = false, onChange, children }) => {
  const [edit, setEdit] = useState(initialEdit)
  return (
    <StyledWidgetHeader padding={padding}>
      <Heading type={type}>{!edit ? children : <TitleInput><TextInput value={children} onChange={onChange} /></TitleInput>}
        {editable && <EditButton round tiny outlined onClick={() => setEdit(!edit)}><MdEdit /></EditButton>}</Heading>
    </StyledWidgetHeader >
  )
}

interface WidgetSubComponents {
  Header: typeof WidgetHeader
}

interface WidgetProps extends StyledProps {
  header?: string
  noPadding?: boolean
  test?: string
}

type WidgetComponent = FC<WidgetProps> & WidgetSubComponents

export const Widget: WidgetComponent = ({ children, header, noPadding, test = 'widget' }) => (
  <StyledWidget noPadding={noPadding} data-test={test}>
    {header && (
      <Widget.Header padding={noPadding}>
        {header}
      </Widget.Header>
    )}
    {children}
  </StyledWidget>
)

Widget.Header = WidgetHeader
