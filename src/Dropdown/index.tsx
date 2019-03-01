import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import styled, { css } from 'styled-components'

interface IPosition {
  left?: 0
  right?: 0
  top?: number
  bottom?: number
}

interface IContentProps extends IPosition {
  open: boolean
}

const Content = styled.div<IContentProps>`
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  padding: 20px;
  padding-right: 10%;
  visibility: ${({ open }) => open ? 'visible' : 'hidden'};
  ${ ({ left, right, top, bottom }) => css`
    ${typeof left !== 'undefined' && css`
      left: ${left};
    `}
    ${typeof right !== 'undefined' && css`
      right: ${right};
    `}
    ${typeof top !== 'undefined' && css`
      top: ${top}px;
      margin-top: 5px;
    `}
    ${typeof bottom !== 'undefined' && css`
      bottom: ${bottom}px;
      margin-bottom: 5px;
    `}
  `}
`

type Vertical = 'top' | 'bottom' | 'auto'
type Horizontal = 'left' | 'right' | 'auto'
interface ILayout {
  horizontal: Horizontal
  vertical: Vertical,
}
interface IDropdownProps {
  className?: string
  button: React.ReactNode
  open: boolean
  vertical?: Vertical
  horizontal?: Horizontal
}

const Dropdown: React.FC<IDropdownProps> = ({
  className,
  button,
  children,
  open,
  vertical = 'auto',
  horizontal = 'auto'
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<IPosition>({})

  const getPosition = () => {
    if (vertical !== 'auto' && horizontal !== 'auto') {
      return position
    } else if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const parentRect = ref.current.parentElement!.getBoundingClientRect()

      const makePosition = ({ horizontal, vertical }: ILayout): IPosition => ({
        [horizontal === 'left' ? 'right' : 'left']: 0,
        [vertical === 'top' ? 'bottom' : 'top']: parentRect.height
      })

      const breakDistance = 20
      const layout: Partial<ILayout> = {}

      if (vertical === 'auto') {
        const closeToBottomBound = parentRect.bottom + rect.height > window.innerHeight - breakDistance
        layout.vertical = closeToBottomBound ? 'top' : 'bottom'
      }
      if (horizontal === 'auto') {
        const closeToRightBound = parentRect.left + rect.width > window.innerWidth - breakDistance
        layout.horizontal = closeToRightBound ? 'left' : 'right'
      }

      return makePosition(layout as ILayout)
    }
    return {}
  }

  const handlePosition = () => setPosition(getPosition())

  useEffect(() => {
    window.addEventListener('resize', handlePosition)
    return () => window.removeEventListener('resize', handlePosition)
  }, [])

  useLayoutEffect(handlePosition, [])

  return (
    <div className={className} data-test='dropdown'>
      {button}
        <Content
          data-test='dropdown-content'
          ref={ref}
          {...position}
          open={open}>

          {children}
        </ Content>
    </div>
  )
}

export default styled(Dropdown)`
  position: relative;
`
