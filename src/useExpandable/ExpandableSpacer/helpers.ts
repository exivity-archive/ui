import { ExpandableItem } from '../useExpandable'

export function distanceBetweenEvenLevelItem (
  list: ExpandableItem<{ [key: string]: any } & { attributes: { level: number } }>[],
  index: number
) {

  const initialLevel = list[index].attributes.level
  function getDistanceBetweenNextLevelItem (i: number, distance: number): number {
    switch (true) {
      case i < 0:
        return 1
      case list[i].attributes.level === initialLevel:
        return distance
      case list[i].attributes.level < initialLevel:
        return distance
      default:
        return getDistanceBetweenNextLevelItem(i - 1, distance + 1)
    }
  }

  return getDistanceBetweenNextLevelItem(index - 1, 1)
}
