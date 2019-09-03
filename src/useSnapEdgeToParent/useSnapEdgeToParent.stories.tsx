import React, { FC, useMemo } from 'react'

import { storiesOf } from '@storybook/react'

import { useSnapEdgeToParent, Vertical, Horizontal } from '.'
import { BreakDistance, AutoPosition } from './helpers'

import { Flex } from '../Flex'

// @ts-ignore
import * as useSnapEdgeToParentDocs from './docs/useSnapEdgeToParent.md'
import { Markdown } from '../Markdown'
import { ensureString } from '../utils'

export default storiesOf('helpers|useSnapEdgeToParent', module)
  .add('default', () => <Dropdown breakDistances={20} />)
  .add('relative to container', () => <Dropdown breakDistances={50} relativeToContainer />)
  .add('fixed orientation', () => <Dropdown breakDistances={20} initialPositioning={{ horizontal: Horizontal.LEFT, vertical: Vertical.BOTTOM }} />)
  .add('different break distances', () => <Dropdown breakDistances={{ horizontal: 200, vertical: 400 }} />)
  .add('documentation', () => <Markdown>{ensureString(useSnapEdgeToParentDocs)}</Markdown>)

interface DropdownProps {
  breakDistances: number | BreakDistance,
  initialPositioning?: AutoPosition,
  relativeToContainer?: boolean
}

const Dropdown: FC<DropdownProps> = ({ breakDistances, initialPositioning, relativeToContainer }) => {
  const [{ parent, target, container }, positioning] = useSnapEdgeToParent(breakDistances, initialPositioning)

  const position = useMemo(() => {
    return { [positioning.horizontal]: 0, [positioning.vertical]: 20 }
  }, [positioning])

  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      bg={relativeToContainer ? 'lightgray' : 'white'}
      height={500}
      width='80%'
      ref={relativeToContainer ? container.ref : undefined}>
      <div style={{ width: 200, height: 20, background: 'cyan', position: 'relative' }} ref={parent.ref}>
        Parent
      <div style={{ width: 300, height: 200, background: 'green', position: 'absolute', ...position }} ref={target.ref}></div>
      </div>
    </Flex>
  )
}
