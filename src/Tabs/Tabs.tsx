import React, { createContext, FC, useContext, useState, useEffect } from 'react'
import styled, { css, StyledComponent } from 'styled-components'
import { useSpring, animated } from 'react-spring'

interface TabsContextShape {
  activeIndex: number
  setActiveIndex: (index: number) => void
  focused: boolean
  setFocused: (focused: boolean) => void
}

const TabsContext = createContext<TabsContextShape>({
  activeIndex: 0,
  setActiveIndex: x => undefined,
  focused: false,
  setFocused: y => undefined
})

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs compound components must be rendered within the Tabs component ')
  }
  return context
}

interface TabProps {
  isActive?: boolean
  onClick?: () => void
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
  children: StyledComponent<'li', HTMLLIElement, TabProps, never>[]
}

const TabList: FC<TabListProps> = ({ children }) => {
  const { activeIndex, setActiveIndex, setFocused } = useTabsContext()

  return (
    <TabsList>
      {React.Children.map(children, (child, index) => (
        child && React.cloneElement(child as React.DetailedReactHTMLElement<TabProps, HTMLLIElement>, {
          isActive: activeIndex === index,
          tabIndex: -1,
          onFocus: () => { setFocused(true) },
          onBlur: () => { setFocused(true) },
          onClick: () => { setActiveIndex(index) }
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
    <animated.div style={animation}>
      {children}
    </animated.div>
  )
}
interface TabPanelsProps {
  children: React.ReactNodeArray
}

const TabPanels: FC<TabPanelsProps> = ({ children }) => {
  const { activeIndex } = useTabsContext()

  return <TabPanel>{children[activeIndex]}</TabPanel>
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
  const [focused, setFocused] = useState(false)
  const contextValue = { activeIndex, setActiveIndex, focused, setFocused }

  const next = () => setActiveIndex(activeIndex + 1)
  const prev = () => setActiveIndex(activeIndex - 1)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (focused) {
        e.key === 'ArrowRight' && activeIndex < children.length - 1 && next()
        e.key === 'ArrowLeft' && activeIndex > 0 && prev()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

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
