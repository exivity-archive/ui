import * as React from 'react'
import styled, { css } from 'styled-components';

interface IDropdownContentProps {
  horizontal: 'left' | 'right'
  vertical: 'top' | 'bottom'
}


const DropdownContent = styled.div<IDropdownContentProps>`
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1);
  padding: 20px;
  padding-right: 10%;
  margin-top: 5px;
  ${props => props.horizontal === 'right' 
    ? css`right: 0;
      background: black;` 
    : css`left: 0;
      background: blue;`
}
`

interface IDropdownProps {
  className?: string
  button: React.ReactNode
  opened: boolean
  layout: {
    horizontal?: 'left' | 'right' | 'auto'
    vertical: 'top' | 'bottom' | 'auto'
  }
}

const Dropdown: React.FC<IDropdownProps> = ({ className, button, children, opened, layout }) => {
    const dropdownRef = React.useRef(null)
    const [horizontal, setHorizontal] = React.useState<'left' | 'right'>('right')
    const [vertical, setVertical] = React.useState<'top' | 'bottom'>('bottom')

    React.useLayoutEffect(() => {
        if(dropdownRef !== null && dropdownRef.current !== null) {
          const rect = dropdownRef!.current!.getBoundingClientRect()

          const closeToRightBound = window.innerWidth - 20 < rect.left + rect.width
          horizontal = layout.horizontal === 'auto' && closeToRightBound ? 'left' : 'right'
          setHorizontal(horizontal)
          
          const closeToBottomBound = window.innerHeight - 20 < rect.top + rect.height
          vertical = layout.vertical === 'auto' && closeToBottomBound ? 'top' : 'bottom'
          setVertical(vertical)
        }
    }, [dropdownRef])

  return (
    <div className={className}>
      {button}
      {opened && <DropdownContent vertical={vertical} horizontal={horizontal} ref={dropdownRef}>{children}</DropdownContent>}
    </div>
  )
}

Dropdown.defaultProps = {
  layout: {
    vertical: 'auto',
    horizontal: 'auto'
  }

}

export default styled(Dropdown)`
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0px;
`

