import React, { useRef, useState, useMemo } from 'react'
import styled from 'styled-components'
import { MdSearch } from 'react-icons/md'
import { useSpring } from 'react-spring'

import { fromTheme } from '../utils/styled'
import { BlockProps, Block } from '../Block'
import { TextInputWithIcon } from '../TextInputWithIcon'

export interface SearchbarProps extends BlockProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

const config = {
  mass: 1,
  tension: 500,
  friction: 14,
  clamp: true
}

const StyledTextInputWithIcon = styled(TextInputWithIcon)`
  background-color: #FFF;
  will-change: transform;
  border: none;

  &:hover, :focus {
    background-color: ${fromTheme(theme => theme.colors.lightGray)};
    border-bottom: none;
  }
`

const INITIAL_SPRING = () => ({ padding: 0, config })
const INCREASE_PADDING = { padding: 10 }
const RESET_PADDING = { padding: 0 }

export const Searchbar = ({
  value,
  onChange,
  placeholder,
  ...blockProps
}: SearchbarProps) => {
  const myRef = useRef<HTMLDivElement>(null)
  const [isFocused, setFocus] = useState(false)
  const [animation, set] = useSpring<{ padding: number }>(INITIAL_SPRING)

  const style = useMemo(() => ({
    transform: animation.padding.interpolate(value => `translateX(${value}px)`),
    width: animation.padding.interpolate((value) => myRef.current && myRef.current.getBoundingClientRect().width - Number(value))
  }), [animation.padding, myRef.current])

  return (
    <Block ref={myRef} {...blockProps}>
      <StyledTextInputWithIcon value={value} placeholder={placeholder} icon={<MdSearch/>} style={style}
                     onChange={onChange}
                     onFocus={() => setFocus(true)}
                     onBlur={() => {
                       setFocus(false)
                       set(RESET_PADDING)
                     }}
                     onMouseEnter={() => set(INCREASE_PADDING)}
                     onMouseOut={() => !isFocused && set(RESET_PADDING)}/>
    </Block>
  )
}
