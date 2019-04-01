export const BASE_SIZE = 16

export const preciseEm = (fraction: number, size = BASE_SIZE) => {
  const rounded = Math.round(size * fraction)

  return rounded / size
}
