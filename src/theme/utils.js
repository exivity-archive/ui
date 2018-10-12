import * as constants from './constants'

export const preciseRm = (fraction, size = constants.SIZE_DEFAULT) => {
  const rounded = Math.round(size * fraction)

  return rounded / size
}
