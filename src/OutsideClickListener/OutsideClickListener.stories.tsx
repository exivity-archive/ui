import React from 'react'
import styled from 'styled-components'

import { storiesOf } from '@storybook/react'
import { OutsideClickListener } from './OutsideClickListener'
import { fromTheme } from '../utils/styled'

const StyledOutside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 140px;
  padding: 40px 40px 60px 40px;
  background-color: ${fromTheme(theme => theme.colours.blue)};
  font-family: ${fromTheme(theme => theme.global.fontFamily)};
`

const StyledInside = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 400px;
  background-color: ${fromTheme(theme => theme.colours.lightGray)}
`

export default storiesOf('interact/OutsideClickListener', module)
  .add('default', ({ state, storeState }: any) => (
    <StyledOutside>
      outside
      <OutsideClickListener onOutsideClick={() => window.alert('You clicked OUTSIDE of the inside node!')}>
        <StyledInside>
            Inside (outsideListener on this node)
        </StyledInside>
      </OutsideClickListener>
    </StyledOutside>
  ))
