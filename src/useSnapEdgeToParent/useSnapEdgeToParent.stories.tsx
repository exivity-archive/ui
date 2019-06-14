import React, { FC, useEffect, useMemo } from 'react'

import { storiesOf } from '@storybook/react'

import { useSnapEdgeToParent, Vertical } from '.'
import { BreakDistance, AutoLayout } from './helpers'

import { Flex } from '../Flex'

// @ts-ignore
import * as useSnapEdgeToParentDocs from './docs/useSnapEdgeToParent.md'
import { Markdown } from '../Markdown'
import { ensureString } from '../utils'

export default storiesOf('helpers|useSnapEdgeToParent', module)
  .add('default', () => <Dropdown breakDistances={20} />)
  .add('relative to container', () => <Dropdown breakDistances={50} relativeToContainer />)
  .add('fixed orientation', () => <Dropdown breakDistances={20} initialLayout={{ horizontal: 'left', vertical: Vertical.BOTTOM1 }} />)
  .add('different break distances', () => <Dropdown breakDistances={{ horizontal: 200, vertical: 400 }} />)
  .add('documentation', () => <Markdown>{ensureString(useSnapEdgeToParentDocs)}</Markdown>)

interface DropdownProps {
  breakDistances: number | BreakDistance,
  initialLayout?: AutoLayout,
  relativeToContainer?: boolean
}

const Dropdown: FC<DropdownProps> = ({ breakDistances, initialLayout, relativeToContainer }) => {
  const [refs, layout, handleLayout] = useSnapEdgeToParent(breakDistances, initialLayout)
  const position = useMemo(() => {
    return { [layout.horizontal]: 0, [layout.vertical]: 20 }
  }, [layout])

  useEffect(() => {
    window.addEventListener('resize', handleLayout)
    return () => window.removeEventListener('resize', handleLayout)
  })

  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      bg={relativeToContainer ? 'lightgray' : 'white'}
      height={500}
      width='80%'
      ref={relativeToContainer ? refs.container : undefined}>
      <div style={{ width: 200, height: 20, background: 'cyan', position: 'relative' }} ref={refs.parent}>
        Parent
      <div style={{ width: 300, height: 200, background: 'green', position: 'absolute', ...position }} ref={refs.target}></div>
      </div>
    </Flex>
  )
}
