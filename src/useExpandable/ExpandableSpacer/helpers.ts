interface Data {
  level: number
}

export function distanceBetweenNextSibling (data: Data[], index: number) {
  let distance = 0
  const initialLevel = data[index].level

  if (data.length === 0) return distance

  while (true) {
    if (index < 0 || data[index].level <= initialLevel) return distance
    index--
    distance++
  }
}

export function makeBorderWidth (index: number, onlyRootParent: boolean) {
  return `0px 0px ${onlyRootParent ? 0 : 1}px ${index > 0 ? 1 : 0}px;`
}
