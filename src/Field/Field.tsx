import * as React from 'react'
import styled, { css, StyledComponent } from 'styled-components'
import { Label } from '../Label'
import { fromTheme, globalBlockSpacing, StyledProps } from '../utils/styled'
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
  flex-direction: ${props => props.horizontal ? 'row' : 'column'};
  align-items: ${props => props.horizontal ? 'center' : 'unset'};
  flex: 1;
  white-space: ${props => props.nowrap ? 'nowrap' : 'unset'};

  &:not(:last-child) {
    margin-bottom: ${fromTheme(theme => theme.global.spacing)}em;
  }

  ${Label}:first-child {
    padding-bottom: ${props => props.horizontal ? 'unset' : css`${fromTheme(theme => theme.global.spacing / 2)}em`};
    margin-right: ${props => props.horizontal ? css`${fromTheme(theme => theme.global.spacing)}em` : 'unset'};
    flex-basis: ${props => (props.horizontal && props.align)
      ? (props.align === true) ? `${preciseEm(ALIGNED_WIDTH)}em` : props.align
      : 'auto'
    };

    > ${Label} {
      padding-bottom: unset;
    }
  }

  ${Label}:first-child + * {
    flex-basis: ${props => (props.horizontal && props.align)
      ? (props.align === true) ? `calc(100% - ${preciseEm(ALIGNED_WIDTH)}em)` : `calc(100% - ${props.align})`
      : 'auto'
    };
  }

  ${(props: StyledFieldProps) => props.horizontal && css`
    > *:not(${Label}):not(:last-child) {
      margin-bottom: ${fromTheme(theme => theme.global.spacing)};
    }
  `}
` as FieldType

Field.Container = Container

Field.displayName = 'Field'
