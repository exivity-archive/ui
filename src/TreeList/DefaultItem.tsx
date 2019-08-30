import React, { CSSProperties, useMemo } from 'react'
import styled from 'styled-components'

import { TreeListItem } from '../useExpandable'
import { SelectListData } from '../SelectList/SelectList'
import { ListItem } from '../ListItem'
import { BranchSpacer } from '../BranchSpacer'
import { fromTheme } from '../utils'
import { Icon } from '../Icon'
import { MdRemove, MdAdd } from 'react-icons/md'
import { CHILDREN } from '../utils/makeParentChildTree'
import { ListChildComponentProps } from 'react-window'

export const EXPAND_ICON = MdAdd
export const COLLAPSE_ICON = MdRemove

export const ToggleExpandedButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 0;
  outline: 5px solid white;
  border: none;

  padding: 0;
  cursor: pointer;
`

const StyledListItem = styled(ListItem)`
  &:focus,
  &:hover {
    ${ToggleExpandedButton} {
      outline: 5px solid ${fromTheme(theme => theme.colors.lightGray)};
    }
  }
`

const StyledValue = styled.span`
  margin-left: 10px;
`

const ButtonIcon = styled(Icon)`
  svg {
    width: 100%;
    height: 100%;
    color: ${fromTheme(theme => theme.colors.gray)};
  }
`

export interface TreeListItemProps<Data extends {}> extends ListChildComponentProps {
  data: {
    items: TreeListItem<Data>[]
    onChange: (item: Data, e?: React.MouseEvent<HTMLLIElement>) => void
  }
}

export function DefaultItem<Data extends { value: string }> ({
  data,
  style,
  index,
  ...rest
}: TreeListItemProps<Data>) {
  const { items, onChange } = data
  const item = items[index]

  return useMemo(() => {
    const handleChange = (e: React.MouseEvent<HTMLLIElement>) => onChange && onChange(item, e)

    return (
      <StyledListItem style={style} onClick={handleChange} {...rest}>
        <BranchSpacer spacing={20} index={index} data={items}>
          {item[CHILDREN] && (
            <ToggleExpandedButton
              onClick={e => {
                e.stopPropagation()
                item.expand()
              }}
            >
              <ButtonIcon>{item.expanded ? <COLLAPSE_ICON /> : <EXPAND_ICON />}</ButtonIcon>
            </ToggleExpandedButton>
          )}
          <StyledValue>{item.value}</StyledValue>
        </BranchSpacer>
      </StyledListItem>
    )
  }, [item, index, items, onChange])
}
