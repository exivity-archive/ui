import { Field as BaseField, styled } from 'reakit'

import propTypes, { defaultProps } from './propTypes'
import Container from './Container'

const Field = styled(BaseField)``

Field.Container = Container

Field.propTypes = propTypes

Field.defaultProps = defaultProps

export default Field
