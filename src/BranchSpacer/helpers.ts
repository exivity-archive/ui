interface Data {
  level: number
}

export function getDistanceFromSibling (data: Data[], index: number) {
  if (data.length === 0) return 0

  const initialLevel = data[index].level

  let distance = 0
  while (true) {
    distance++
    if (--index < 0 || data[index].level <= initialLevel) return distance
  }
}
