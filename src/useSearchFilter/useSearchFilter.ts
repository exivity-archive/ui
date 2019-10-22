import { useMemo } from 'react'

type Obj = {
  [key: string]: any
}

function isMatch (value: string, searchTerm: string) {
  return value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
}

export function useSearchFilter<T extends Obj> (
  data: T[],
  searchTerm: string,
  accessor?: (item: T) => string
) {
  return useMemo(() => {
    function filterData () {
      return data.filter((item) => {
        if (!accessor && item.value) {
          return isMatch(item.value, searchTerm)
        }

        if (accessor) {
          return isMatch(accessor(item), searchTerm)
        }

        return true
      })
    }

    return searchTerm && searchTerm.length
      ? filterData()
      : data
  }, [searchTerm, data])
}
