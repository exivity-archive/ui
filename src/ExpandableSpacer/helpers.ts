interface Data {
  level: number
}

export function getAmountVisibleChildren (data: Data[], index: number) {
  if (data.length === 0) return 0

  const initialLevel = data[index].level

  let distance = 0
  while (true) {
    distance++
    if (--index < 0 || data[index].level <= initialLevel) return distance
  }
}

export function makeBorderWidth (index: number, onlyRootParent: boolean) {
  return `0px 0px ${onlyRootParent ? 0 : 2}px ${index > 0 ? 2 : 0}px;`
}
