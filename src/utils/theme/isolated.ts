export const preciseEm = (fraction: number, size = 16) => {
  const rounded = Math.round(size * fraction)

  return rounded / size
}
