import { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { action } from '@storybook/addon-actions'
import { boolean, number, object, select, text } from '@storybook/addon-knobs'

/* eslint-disable no-multi-spaces */
// Default simple PropType based knob map.
const propTypeKnobsMap = [
  {fn: PropTypes.string, knob: text},
  {fn: PropTypes.number, knob: number},
  {fn: PropTypes.bool, knob: boolean},
  {fn: PropTypes.func, knob: (name, value) => value || action(name)},
  {fn: PropTypes.object, knob: object},
  {fn: PropTypes.node, knob: text},
  {fn: PropTypes.element, knob: text}
]

export const withPropKnobs = (component) => {
  const {propTypes = {}} = component.type
  const defaultProps = {
    ...(component.type.defaultProps || {}),
    ...component.props
  }

  const newProps = resolvePropValues(propTypes, defaultProps)

  return cloneElement(component, newProps)
}

const mapPropTypeToKnob = (propType) => {
  return propTypeKnobsMap.find(map => map.fn === propType)
}

const mapPropTypeToProp = (propType, name, defaultValue) => {
  const mappedPropType = mapPropTypeToKnob(propType)

  return mappedPropType
    ? mappedPropType.knob(name, defaultValue)
    : text(name, defaultValue)
}

const resolvePropValues = (propTypes, defaultProps) => {
  const props = {}

  Object.entries(propTypes).forEach(entry => {
    const [ propName, propType ] = entry

    props[propName] = mapPropTypeToProp(propType, propName, defaultProps[propName])
  })

  return props
}
