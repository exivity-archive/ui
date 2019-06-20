import * as React from 'react'
import styled, { css, StyledComponent } from 'styled-components'
import { Label } from '../Label'
import { fromTheme, StyledProps } from '../utils/styled'
import { preciseEm } from '../utils/styled/isolated'
import { Container } from './Container'

const ALIGNED_WIDTH = 20 // em

export interface FieldProps {
  horizontal?: boolean
  align?: true | string
  nowrap?: boolean
}

export type StyledFieldProps = FieldProps & StyledProps

type FieldType = StyledComponent<'fieldset', any, StyledFieldProps, never> & {
  Container: typeof Container
}

// Would like to use styled.fieldset but can't due to
// https://github.com/w3c/csswg-drafts/issues/321
export const Field = styled.div<StyledFieldProps>`
  display: flex;
  flex-flow: row wrap;
  flex-direction: ${props => props.horizontal ? 'row' : 'column'};
  align-items: ${props => props.horizontal ? 'center' : 'unset'};
  flex: 1;
  white-space: ${props => props.nowrap ? 'nowrap' : 'unset'};

  &:not(:last-child) {
    margin-bottom: ${fromTheme(theme => theme.global.baseSpacing)}em;
  }

  > ${Label}:first-child {
    padding-bottom: ${props => props.horizontal ? 'unset' : css`${fromTheme(theme => theme.global.baseSpacing / 2)}em`};
    margin-right: ${props => props.horizontal ? css`${fromTheme(theme => theme.global.baseSpacing)}em` : 'unset'};
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: ${props => (props.horizontal && props.align)
      ? (props.align === true) ? `${preciseEm(ALIGNED_WIDTH)}em` : props.align
      : 'auto'
    };

    > ${Label} {
      padding-bottom: unset;
    }
  }

  ${props => props.horizontal && css`
    > * {
      flex-grow: 1;
    }

    > *:not(${Label}):not(:last-child) {
      margin-bottom: ${fromTheme(theme => theme.global.baseSpacing)}em;
    }
  `}
` as FieldType

Field.Container = Container

Field.displayName = 'Field'
