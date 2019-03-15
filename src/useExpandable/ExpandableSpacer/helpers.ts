interface Data {
  attributes: { level: number }
  [key: string]: any
}

export function distanceBetweenEvenLevelItem (
  data: Data[],
  index: number
) {
  if (data.length === 0) {
    return 0
  }

  const initialLevel = data[index].attributes.level
  function getDistanceBetweenNextLevelItem (i: number, distance: number): number {
    if (i < 0 || data[i].attributes.level <= initialLevel) {
      return distance
    } else {
      return getDistanceBetweenNextLevelItem(i - 1, distance + 1)
    }
  }

  return getDistanceBetweenNextLevelItem(index - 1, 1)
}
