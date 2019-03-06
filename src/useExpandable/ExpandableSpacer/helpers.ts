import { ExpandableItem } from '../useExpandable'
import { AnyObject } from '../../utils/types'

export function distanceBetweenEvenLevelItem (
  data: ExpandableItem<AnyObject<any> & { attributes: { level: number } }>[],
  index: number
) {
  if (data.length === 0) {
    return 0
  }

  const initialLevel = data[index].attributes.level
  function getDistanceBetweenNextLevelItem (i: number, distance: number): number {
    switch (true) {
      case i < 0:
        return 1
      case data[i].attributes.level === initialLevel:
        return distance
      case data[i].attributes.level < initialLevel:
        return distance
      default:
        return getDistanceBetweenNextLevelItem(i - 1, distance + 1)
    }
  }

  return getDistanceBetweenNextLevelItem(index - 1, 1)
}
