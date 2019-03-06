export function groupBy (data: any[], groupBy: string) {
  const groupedItems = data.reduce((acc, next) => {
    let group = next.attributes && next.attributes[groupBy]
    if (group) {
      if (!acc[group]) {
        acc[group] = []
      }
      acc[group].push(next)
    }
    return acc
  }, {})

  // Sort arrays and flatten object
  return Object.keys(groupedItems).reduce((acc: any, next: any) => {
    const group = {
      key: next,
      group: next
    }
    return acc
      .concat([group])
      .concat(groupedItems[next])
  }, [])
}
