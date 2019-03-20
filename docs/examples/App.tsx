import { MdDashboard, MdInsertChart, MdLibraryBooks } from 'react-icons/md'
import { Block } from '../../src/Block'
import { Icon } from '../../src/Icon'
import { Link } from '../../src/Link'

const headerHeight = 60
const sidebarWidth = 250

const layout = `
  "logo header" ${headerHeight}px
  "nav main" 1fr / ${sidebarWidth}px 1fr
`

export const App = () => (
  <Grid template={layout} style={{
    position: 'fixed',
    left: '0',
    top: '0',
    height: '100vh',
    width: '100vw'
  }}>
    <Grid.Item as='header' area='logo' palette='primary' tone={2} opaque>
      <Image src='http://acmelogos.com/images/logo-8.svg' width={sidebarWidth} height={headerHeight} padding={10} />
    </Grid.Item>
    <Grid.Item as={[Ellipsis, Header, 'header']} area='header' palette='primary' opaque>
      Header
    </Grid.Item>
    <Grid.Item as='nav' area='nav' palette='grayscale' tone={1} opaque style={{ overflow: 'auto' }}>
      <Navigation>
        <Hidden.Container>
          {hidden => (
            <Block as={StyledItem}>
              <StyledToggle {...hidden} palette='white'>
                <Icon><MdDashboard /></Icon>
                Dashboard
              </StyledToggle>
              <Navigation.Hidden {...hidden}>
                <StyledSubItem>
                  <Link palette='white' href='../docs'>Accounts</Link>
                </StyledSubItem>
                <StyledSubItem>
                  <Link palette='white' href='../docs'>Services</Link>
                </StyledSubItem>
                <StyledSubItem>
                  <Link palette='white' href='../docs'>Instances</Link>
                </StyledSubItem>
              </Navigation.Hidden>
            </Block>
          )}
        </Hidden.Container>
        <Hidden.Container>
          {hidden => (
            <Block as={StyledItem}>
              <StyledToggle {...hidden} palette='white'>
                <Icon><MdInsertChart /></Icon>
                Reports
              </StyledToggle>
              <Navigation.Hidden {...hidden}>
                <StyledSubItem>
                  <Link palette='white' href='../docs'>Accounts</Link>
                </StyledSubItem>
                <StyledSubItem>
                  <Link palette='white' href='../docs'>Services</Link>
                </StyledSubItem>
                <StyledSubItem>
                  <Link palette='white' href='../docs'>Instances</Link>
                </StyledSubItem>
              </Navigation.Hidden>
            </Block>
          )}
        </Hidden.Container>
        <StyledItem>
          <Link palette='white' href='../docs'>
            <Icon><MdLibraryBooks /></Icon>
            Catalogue
          </Link>
        </StyledItem>
      </Navigation>
    </Grid.Item>
    <Grid.Item as='main' area='main' style={{ overflow: 'auto' }}>
      Main
      <div style={{ height: '150vh' }} />
    </Grid.Item>
  </Grid>
)
