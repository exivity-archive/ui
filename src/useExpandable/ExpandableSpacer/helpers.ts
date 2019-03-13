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

export interface SpacerLines {
  top: 0 | 1
  right: 0 | 1
  bottom: 0 | 1
  left: 0 | 1
}

export function makeSpacerLines (level: number, index: number, length: number): SpacerLines {
  if (level === 1) {
    return {
      top: index === 0 ? 0 : 1,
      right: 0,
      bottom: index === length - 1 ? 1 : 0,
      left: index === 0 ? 0 : 1
    }
  } else {
    return { top: 0, right: 0, bottom: 1, left: 1 }
  }
}
