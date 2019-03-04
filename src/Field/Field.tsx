import PropTypes from 'prop-types'
import * as React from 'react'
import styled, { StyledComponent } from 'styled-components'
import defaultStyledProps from '../utils/testing/defaultStyledProps'
import Container from './Container'

export interface FieldProps {
  horizontal?: boolean
  align?: true | 'left' | 'right'
  nowrap?: boolean
}

type FieldType = StyledComponent<'fieldset', any, FieldProps, never> & {
  Container: typeof Container
}

const Field = styled.fieldset<FieldProps>`
  display: flex;
  flex-direction: ${props => props.horizontal ? 'row' : 'column'};
  align-items: ${ifProp('horizontal', 'center', 'unset')};
  flex: 1;
  white-space: ${ifProp('nowrap', 'nowrap', 'unset')};

  &:not(:last-child) {
    margin-bottom: ${t('base.spaceDouble')};
  }

  label {
    padding-bottom: ${ifNotProp('horizontal', t('base.spaceHalf'), 'unset')};
    margin-right: ${ifProp('horizontal', t('base.spaceDouble'), 'unset')};
    flex-basis: ${withProp(['horizontal', 'align'], (horizontal, align) => {
      return (horizontal && align)
    ? (align === true) ? `${preciseRm(20)}em` : align
    : 'auto'
    })};

    > label {
      padding-bottom: unset;
    }
  }

  ${ifNotProp('horizontal', css`
    > *:not(label):not(:last-child) {
      margin-bottom: ${t('base.spaceDouble')};
    }
  `)}
` as FieldType

Field.Container = Container

Field.defaultProps = defaultStyledProps

export default Field
