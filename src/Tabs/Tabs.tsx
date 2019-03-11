import React, { createContext, FC, useContext, useState } from 'react'
import styled, { css } from 'styled-components'
import { useSpring, animated } from 'react-spring'

interface TabsContextShape {
  activeIndex: number
  setActiveIndex: (index: number) => void
}

const TabsContext = createContext<TabsContextShape>({ activeIndex: 0, setActiveIndex: (i: number) => 0 })

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs compound components must be rendered within the Tabs component ')
  }
  return context
}

interface TabProps {
  isActive?: boolean
  hasFocus?: () => void
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
  children: any
}

const TabList: FC<TabListProps> = ({ children }) => {
  const { activeIndex, setActiveIndex } = useTabsContext()
  return (
    <TabsList>
      {React.Children.map(children, (child, index) => (
        child && React.cloneElement(child, {
          isActive: activeIndex === index,
          onClick: () => {
            console.log(index)
            setActiveIndex(index)
          }
        })
      ))}
    </TabsList>
  )
}

const TabPanel = animated.div

interface TabPanelsProps {
  children: React.ReactNodeArray
}

const animationDef = { opacity: 1, transform: 'translateX(0px)', from: { opacity: 0, transform: 'translateX(-10px)' } }
const TabPanels: FC<TabPanelsProps> = ({ children }) => {
  const { activeIndex } = useTabsContext()
  const [animation] = useSpring(() => ({ ...animationDef }))
  return <div>{React.cloneElement((children[activeIndex] as any), { style: animation })}</div>
}

interface TabsSubComponents {
  TabList: typeof TabList, Tab: typeof Tab, TabPanels: typeof TabPanels, TabPanel: typeof TabPanel
}

interface TabsProps {
  children: React.ReactNode
}

type TabsComponent = FC<TabsProps> & TabsSubComponents

export const Tabs: TabsComponent = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const contextValue = { activeIndex, setActiveIndex }
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
