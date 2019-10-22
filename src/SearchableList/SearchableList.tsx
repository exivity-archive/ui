import React, { useState, useCallback } from 'react'
import { SelectList, Block, useSearchFilter } from '../'

import { SearchBar } from './Searchbar'

interface SearchableListProps<T> {
  placeholder: string
  data: T[]
  onChange: (item: T, e: React.MouseEvent<HTMLLIElement>) => void
  children?: React.ReactNode
  keyAccessor?: (item: T) => string
  valueAccessor?: (item: T) => string
}

function defaultKeyAccessor (item: { key?: string }) {
  if (!item.key) {
    throw Error(
      'SearchableList data items need a key property or you have to pass keyAccessor.'
    )
  }
  return item.key
}

function defaultValueAccessor (item: { value?: string }) {
  if (!item.value) {
    throw Error(
      'SearchableList data items need a value property or you have to pass valueAccessor.'
    )
  }
  return item.value
}

export function SearchableList<T> ({
  placeholder,
  data,
  onChange,
  keyAccessor = defaultKeyAccessor,
  valueAccessor = defaultValueAccessor,
  children
 }: SearchableListProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')

  const preparedData = data.map((item) => ({
    key: keyAccessor(item),
    value: valueAccessor(item)
  }))

  const filteredData = useSearchFilter(preparedData, searchTerm)
  const gotData = data.length > 0

  const onChangeHandler = useCallback((item, e) => {
    const record = data.find(obj => keyAccessor(obj) === item.key)
    if (record) {
      onChange(record, e)
    }
  }, [onChange, keyAccessor, data])

  return (
    <Block p={gotData ? 0 : 1}>
      { gotData && (
        <Block p={1}>
          <SearchBar
            animated
            value={searchTerm}
            placeholder={placeholder}
            onChange={(value, e) => {
              e.stopPropagation()
              setSearchTerm(value)
            }} />
        </Block>
      )}
      <SelectList
        children={children}
        data={filteredData}
        onChange={onChangeHandler} />
    </Block>
  )
}
