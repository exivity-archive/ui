interface Data {
  level: number
}

export function distanceBetweenNextSibling (data: Data[], index: number) {
  if (data.length === 0) return 0
  let distance = 1
  const initialLevel = data[index].level
  index--

  while (true) {
    if (index < 0 || data[index].level <= initialLevel) return distance
    index--
    distance++
  }
}

export function makeBorderWidth (index: number, onlyRootParent: boolean) {
  return `0px 0px ${onlyRootParent ? 0 : 1}px ${index > 0 ? 1 : 0}px;`
}
