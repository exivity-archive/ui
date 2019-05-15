import React, { useMemo } from 'react'
import { MdAdd, MdRemove } from 'react-icons/md'
import styled from 'styled-components'
import faker from 'faker'
// @ts-ignore
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import { randomId } from '../../src/utils/randomId'
import { fromTheme, globalScrollbar } from '../../src/utils/styled'
import { App, headerHeight } from './partials/App'
import {
  Block,
  Button,
  Flex,
  Heading,
  Helpers,
  Icon,
  ListFocus,
  KeyedItem,
  Searchbar,
  TreeListItem,
  useExpandable
} from '../../src'

const masterWidth = [200, 250, 250, 400]
const detailWidth = ['100%', '100%', '100%', 800]

const Container = styled(Flex)`
  height: calc(100vh - ${headerHeight}px);
`

const Master = styled(Flex.Item).attrs(props => ({
  width: masterWidth,
  bg: 'white'
}))`
  display: flex;
  flex-direction: column;
  border-right: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.global.borderColor)};
`

const Search = styled(Block).attrs(props => ({
  as: Searchbar,
  placeholder: 'Search...',
  padding: 2,
  flat: true
}))`
  flex-shrink: 1;
  border-bottom: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.global.borderColor)} !important;
`

interface Account {
  key: string,
  name: string,
  parent: string | null,
  attributes: {
    level: number
  }
}

function createFakeAccount (depth: number = 0, parent?: Account) {
  let items: Account[] = [{
    key: randomId(),
    name: faker.company.companyName(),
    parent: parent ? parent.key : null,
    attributes: {
      level: depth + 1
    }
  }]

  const children = (depth < 3) ? Math.floor(Math.random() * 5) : 0

  for (let i = 0; i < children; i++) {
    items = items.concat(createFakeAccount(depth + 1, items[0]))
  }

  return items
}

function createFakeAccounts (items = 100) {
  let data: Account[] = []

  for (let i = 0; i < items; i++) {
    data = data.concat(createFakeAccount())
  }

  return data
}

const StyledFixedSizeList = styled(FixedSizeList)`
  ${globalScrollbar};
`

const List: React.FC = ({ data, ...rest }: any) => {
  const [expandableData, helpers] = useExpandable<Account>(data, (item: Account) => item.parent)

  return (
    <ListFocus {...rest}>
      <AutoSizer>
        {({ height, width }: { height: number, width: number }) => (
          <StyledFixedSizeList
            height={height}
            width={width}
            itemSize={34}
            itemData={[expandableData, helpers]}
            itemCount={expandableData.length}
          >
            {Item}
          </StyledFixedSizeList>
        )}
      </AutoSizer>
    </ListFocus>
  )
}

const StyledList = styled(List)<any>`
  flex-grow: 1;
`

interface ItemProps {
  data: [TreeListItem<Account>[], Helpers<Account>],
  index: number,
  style: object
}

const Item = ({ data, index, style }: ItemProps) => {
  const [items, helpers] = data
  const item = items[index]

  const button = (item.children ?
      <Button round tiny secondary onClick={item.expand}>
        <Icon>{item.expanded ? <MdRemove/> : <MdAdd/>}</Icon>
      </Button>
      : null
  )

  return useMemo(() => (
      <ListItem style={style}>
        <Block p={1}>
          {item.name}
        </Block>
      </ListItem>
    ), [item]
  )
}

const Detail = styled(Flex.Item).attrs(props => ({
  as: Block,
  padding: 2,
  grow: 1,
  maxWidth: detailWidth,
  bg: 'white'
}))`
  ${globalScrollbar};
  overflow-y: scroll;
  overflow-x: hidden;
`

export const MasterDetail = () => {
  const accounts = useMemo(() => createFakeAccounts(), [])

  return (
    <App title='Master/Detail'>
      <Container>
        <Master>
          <Search />
          <StyledList data={accounts} />
        </Master>
        <Detail>
          <div style={{ height: '150vh' }}>
            <Heading type='section'>
              Dibbert - Considine
            </Heading>
          </div>
        </Detail>
      </Container>
    </App>
  )
}
