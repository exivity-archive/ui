import { useState, useEffect, useMemo } from 'react'
import { ListItem } from '../utils'

type Checked = string[]

const enhance = (data: any, setData: any, getter: any) => {
  const newData = [...data]

  newData.forEach((item, index) => {
    if (!item.hasOwnProperty('checked')) {
      item.checked = getter(item)
    }
    if (index === 1) {
      console.log(item)
    }

    item.check = function () {
      newData[index] = {
        ...this,
        checked: !this.checked
      }

      setData([...newData])
    }
  })

  return newData
}

export function useCheckbox<T extends ListItem, TValue> (data: T[], valueKey: string, initialValue?: boolean | Function) {
  const [list, setData] = useState(data)

  useEffect(() => {
    setData(data)
  }, [data])

  const getInitialValue = (item: any) => {
    if (typeof initialValue === 'function') {
      return initialValue(item)
    }

    return initialValue
  }

  return useMemo(() => {
    return enhance(list, setData, getInitialValue)
  }, [list])
}
