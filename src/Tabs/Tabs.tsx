import React, { FC, useState, KeyboardEvent } from 'react'
import styled, { css } from 'styled-components'
import { useTabsContext, TabsContext } from './helpers'
import { fromTheme } from '../utils/styled'
import { useIsUncontrolled } from '../useIsUncontrolled'

interface StyledTabProps {
  isActive?: boolean
  tabIndex?: number
  disabled?: boolean
  onFocus?: () => void
  onBlur?: () => void
  onKeyDown?: (event: KeyboardEvent<HTMLLIElement>) => void
  onClick?: () => void
}

const StyledTab = styled.li<StyledTabProps>`
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

  ${({ disabled }) => disabled && css`
    pointer-events: none;
    opacity: 0.6;
  `}
`

interface TabProps {
  disabled?: boolean
  test?: string
  children: React.ReactNode
  index?: number
  onFocus?: () => void
  onBlur?: () => void
  onKeyDown?: (event: KeyboardEvent<HTMLLIElement>) => void
}

const Tab: FC<TabProps> = ({ test = 'tabs-tab', children, index, disabled, ...rest }) => {
  const { activeIndex, setActiveIndex, ...context } = useTabsContext()
  if (index === undefined) return null

  if (disabled === true && !context.disabledTabs.includes(activeIndex)) {
    context.disabledTabs.push(index)
  } else if (!disabled && context.disabledTabs.includes(activeIndex)) {
    disabled = true
  } else if (disabled === false && !context.disabledTabs.includes(activeIndex)) {
    context.disabledTabs = context.disabledTabs.filter((i) => i === index)
  }
  return (
    <StyledTab
      isActive={activeIndex === index}
      tabIndex={activeIndex === index ? 0 : -1}
      disabled={disabled}
      data-test={test}
      onClick={() => {
        console.log(index)
        setActiveIndex(index)
      }}
      {...rest}>
      {children}
    </StyledTab>)
}

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
          index,
          onFocus,
          onBlur: () => { setFocused(false) },
          onKeyDown,
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
  initialActiveIndex?: number
  activeIndex?: number
  disabledTabs?: number[]
  onActiveIndexChange?: (activeIndex: number) => void
}

type TabsComponent = FC<TabsProps> & TabsSubComponents

export const Tabs: TabsComponent = ({ children, onActiveIndexChange, initialActiveIndex = 0, disabledTabs = [], ...rest }) => {
  const [activeIndex, setActiveIndex] = useIsUncontrolled(initialActiveIndex, rest.activeIndex, onActiveIndexChange)
  const contextValue = { activeIndex, setActiveIndex, disabledTabs }

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
