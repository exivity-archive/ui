import styled from 'styled-components'
import { fromTheme } from '../utils'
import { Content } from '../Dropdown/styles'

export const TooltipContent = styled(Content)`
    min-width: 0;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px 0px, rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;
    border-radius: 5px;
    padding: 6px 10px;
`

export const Arrow = styled.div`
  position: absolute;
  color: ${fromTheme(t => t.colors.white)};
  font-size: 8px;
  user-select: none;
  &[data-placement*='bottom'] {
    top: -5px;
    margin: 0px 8px;
    transform: rotate(180deg) scaleX(2);
    text-shadow: rgb(235, 239, 245) 0px 2px 0px;
  }
  &[data-placement*='top'] {
    bottom: -5px;
    margin: 0px 8px;
    text-shadow: rgb(235, 239, 245) 0px 2px 0px, rgba(0, 0, 0, 0.3) 0px 4px 2px;
    transform: rotate(0deg) scaleX(2);
  }
  &[data-placement*='right'] {
    left: -3px;
    margin: 8px 0px;
    text-shadow: rgb(235, 239, 245) 0px 2px 0px, rgba(0, 0, 0, 0.3) 0px 3px 1px;
    transform: rotate(90deg) scaleX(2);
  }
  &[data-placement*='left'] {
    right: -4px;
    margin: 8px 0px;
    transform: rotate(-90deg) scaleX(2);
    text-shadow: rgb(235, 239, 245) 0px 2px 0px, rgba(0, 0, 0, 0.3) 0px 3px 1px;
  }
`
