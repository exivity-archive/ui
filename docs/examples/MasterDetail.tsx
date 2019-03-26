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
  distanceBetweenEvenLevelItem,
  ExpandableSpacer,
  Flex,
  Helpers,
  Icon,
  ListFocus,
  ListItem,
  Searchbar,
  TreeListItem,
  useExpandable
} from '../../src'

const masterWidth = [200, 250, 250, 400]

const Container = styled(Flex)`
  height: calc(100vh - ${headerHeight}px);
`

const Master = styled(Flex.Item).attrs(props => ({
  width: masterWidth
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
  border-bottom: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.global.borderColor)};
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

const List: React.FC = (props) => {
  const accounts = useMemo(() => createFakeAccounts(), [])
  const [data, helpers] = useExpandable<Account>(accounts, (item: Account) => item.parent)

  return (
    <ListFocus {...props}>
      <AutoSizer>
        {({ height, width }: { height: number, width: number }) => (
          <StyledFixedSizeList
            height={height}
            width={width}
            itemSize={40}
            itemData={[data, helpers]}
            itemCount={data.length}
          >
            {Item}
          </StyledFixedSizeList>
        )}
      </AutoSizer>
    </ListFocus>
  )
}

const StyledList = styled(List)`
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
        <ExpandableSpacer
          level={item.attributes.level}
          button={button}
          index={index}
          distance={distanceBetweenEvenLevelItem(items, index)}>
          <Block pl={1}>
            {item.name}
          </Block>
        </ExpandableSpacer>
      </ListItem>
    ), [item]
  )
}

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
        <StyledList />
      </Master>
      <Detail>
        <div style={{ height: '150vh' }}>
          detail
        </div>
      </Detail>
    </Container>
  </App>
)
