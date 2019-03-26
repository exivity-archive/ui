import React from 'react'
import styled from 'styled-components'
import { fromTheme, globalScrollbar } from '../../src/utils/styled'
import { App, headerHeight } from './partials/App'
import { Block, Flex, Searchbar } from '../../src'

const masterWidth = [200, 250, 250, 400]

const Container = styled(Flex)`
  height: calc(100vh - ${headerHeight}px);
`

const Master = styled(Flex.Item).attrs(props => ({
  width: masterWidth
}))`
  border-right: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.global.borderColor)};
`

const Search = styled(Block).attrs(props => ({
  as: Searchbar,
  placeholder: 'Search...',
  padding: 2,
  flat: true
}))`
  border-bottom: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.global.borderColor)};
`

const Detail = styled(Flex.Item).attrs(props => ({
  as: Block,
  padding: 2,
  grow: 1
}))`
  ${globalScrollbar};
  overflow-y: scroll;
  overflow-x: hidden;
`

export const MasterDetail = () => (
  <App title='Master/Detail'>
    <Container>
      <Master>
        <Search />
      </Master>
      <Detail>
        <div style={{ height: '150vh' }}>
          detail
        </div>
      </Detail>
    </Container>
  </App>
)
