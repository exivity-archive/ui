import React, { FC, useState } from 'react'
import styled, { css } from 'styled-components'
import { useTabsContext, TabsContext } from './helpers'
import { fromTheme } from '../utils/styled'
import { useIsUncontrolled } from '../useIsUncontrolled'

interface TabProps {
  isActive?: boolean
  tabIndex?: number
  onFocus?: () => void
  onBlur?: () => void
  onKeyDown?: (e: KeyboardEvent) => void
  onClick?: () => void
  test?: string
  children: React.ReactNode
}

const Tab = styled.li.attrs<TabProps>((props) => ({
  ['data-test']: props.test ? props.test : 'tabs-tab'
})) <TabProps>`
  display: inline-block;
  font-weight: bold;
  color: ${fromTheme(theme => theme.colors.gray)};
  list-style: none;
  padding: 0.5rem 0;
  margin: 0 10px -1px 10px;
  user-select: none;
  cursor: pointer;
  outline: none;

  &:first-child {
    margin-left: 0;
  }

  ${({ isActive }) => isActive && css`
    color: #6F6F6F;
    border-bottom: 4px solid #ccc;

    &:focus {
      border-bottom-color: #6F6F6F;
    }
  `}
`

const TabsList = styled.ol`
  border-bottom: 1px solid #ccc;
  padding-left: 0;
`

interface TabListProps {
  children: React.ReactElement<TabProps>[]
}

const TabList: FC<TabListProps> = ({ children }) => {
  const { activeIndex, setActiveIndex } = useTabsContext()
  const [focused, setFocused] = useState(false)

  const onFocus = () => setFocused(true)

  const onKeyDown = (e: KeyboardEvent) => {
    if (focused) {
      e.key === 'ArrowRight' && activeIndex < children.length - 1 && setActiveIndex(activeIndex + 1)
      e.key === 'ArrowLeft' && activeIndex > 0 && setActiveIndex(activeIndex - 1)
    }
  }

  return (
    <TabsList>
      {React.Children.map(children, (child: React.ReactElement<TabProps>, index) => (
        child && React.cloneElement(child, {
          isActive: activeIndex === index,
          tabIndex: activeIndex === index ? 0 : -1,
          onFocus,
          onBlur: () => { setFocused(false) },
          onKeyDown,
          onClick: () => { setActiveIndex(index) },
          ...child.props
        })
      ))}
    </TabsList>
  )
}

const StyledPanel = styled.div<{ animated?: boolean }>`
  ${props => props.animated && css`
    will-change: transform, opacity;

    @keyframes slidein {
      from {
        transform: translateX(-10px);
        opacity: 0;
      }

      to {
        transform: translateX(0px);
        opacity: 1;
      }
    }

    animation-duration: 0.3s;
    animation-name: slidein;
  `}
`

const TabPanel: FC<{ animated?: boolean, test?: string }> = ({ children, animated, test = 'tabs-panel' }) => {
  const { activeIndex } = useTabsContext()

  return <StyledPanel key={activeIndex} animated={animated} data-test={test}>{children}</StyledPanel>
}

interface TabPanelsProps {
  animated?: boolean
  children: React.ReactElement[]
}

const TabPanels: FC<TabPanelsProps> = ({ children, animated }) => {
  const { activeIndex } = useTabsContext()
  const activeChild = children[activeIndex]

  return React.cloneElement(activeChild, {
    animated,
    ...activeChild.props
  })
}

const StyledTabs = styled.div`
  font-family: ${fromTheme(theme => theme.global.fontFamily)};
`

interface TabsSubComponents {
  TabList: typeof TabList,
  Tab: typeof Tab,
  TabPanels: typeof TabPanels,
  TabPanel: typeof TabPanel
}

interface TabsProps {
  children: React.ReactNodeArray
  activeIndex?: number
  onActiveIndexChange?: (activeIndex: number) => void
}

type TabsComponent = FC<TabsProps> & TabsSubComponents

export const Tabs: TabsComponent = ({ children, onActiveIndexChange, ...rest }) => {
  const [activeIndex, setActiveIndex] = useIsUncontrolled(0, rest.activeIndex, onActiveIndexChange)
  const contextValue = { activeIndex, setActiveIndex }

  return (
    <TabsContext.Provider value={contextValue} >
      <StyledTabs>
        {children}
      </StyledTabs>
    </TabsContext.Provider>
  )
}

Tabs.TabList = TabList
Tabs.Tab = Tab
Tabs.TabPanels = TabPanels
Tabs.TabPanel = TabPanel
