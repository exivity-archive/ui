import React, { FC, useState } from 'react'
import styled, { css } from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { useTabsContext, TabsContext } from './useTabsContext'

interface TabProps {
  isActive?: boolean
  tabIndex?: number
  onFocus?: () => void
  onBlur?: () => void
  onKeyDown?: (e: KeyboardEvent) => void
  onClick?: () => void
  'data-test'?: 'tab'
  children: React.ReactNode
}

const Tab = styled.li<TabProps>`
  display: inline-block;
  font-weight: bold;
  color: #A2A2A2;
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
  `}
`

const TabsList = styled.ol`
  border-bottom: 1px solid #ccc;
  padding-left: 0;
`

interface TabListProps {
  children: JSX.Element[]
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
      {React.Children.map(children, (child, index) => (
        child && React.cloneElement(child as any, {
          isActive: activeIndex === index,
          tabIndex: -1,
          onFocus,
          onBlur: () => { setFocused(false) },
          onKeyDown,
          onClick: () => { setActiveIndex(index) },
          'data-test': 'tab'
        })
      ))}
    </TabsList>
  )
}

const TabPanel: FC = ({ children }) => {
  const { activeIndex } = useTabsContext()
  const [lastActiveIndex, setLastActiveIndex] = useState(activeIndex)

  const animation = useSpring({
    to: { opacity: 1, transform: 'translateX(0px)' },
    from: { opacity: 0, transform: 'translateX(-10px)' },
    reset: activeIndex !== lastActiveIndex,
    onStart: () => {
      setLastActiveIndex(activeIndex)
    }
  })

  return (
    <animated.div style={animation} data-test='tab-panel'>
      {children}
    </animated.div>
  )
}
interface TabPanelsProps {
  children: React.ReactNodeArray
}

const TabPanels: FC<TabPanelsProps> = ({ children }) => {
  const { activeIndex } = useTabsContext()

  return <TabPanel data-test='tab-panels'>{children[activeIndex]}</TabPanel>
}

interface TabsSubComponents {
  TabList: typeof TabList,
  Tab: typeof Tab,
  TabPanels: typeof TabPanels,
  TabPanel: typeof TabPanel
}

interface TabsProps {
  children: React.ReactNodeArray
}

type TabsComponent = FC<TabsProps> & TabsSubComponents

export const Tabs: TabsComponent = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const contextValue = { activeIndex, setActiveIndex, initialized: true }

  return (
    <TabsContext.Provider value={contextValue} >
      {children}
    </TabsContext.Provider>
  )
}

Tabs.TabList = TabList
Tabs.Tab = Tab
Tabs.TabPanels = TabPanels
Tabs.TabPanel = TabPanel
