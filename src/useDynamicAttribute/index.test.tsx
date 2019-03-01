import useDynamicAttribute from '.'

test('passed in key and setter are defined on enriched data', () => {
  interface ITest { id: number }
  const testItems: ITest[] = [{ id: 1 },{ id: 2 }, { id: 3 }]

  const enriched = useDynamicAttribute<ITest, 'checked', 'setChecked', boolean>(testItems, 'checked', 'setChecked', true)

  enriched.forEach((item) => {
    expect(item.checked).toBe(true)
    item.setChecked(false)
    expect(item.setChecked).toHaveBeenCalled()
  })
})

test('returns same amount of items as is passed in', () => {
  interface ITest { id: number }
  const testItems: ITest[] = [{ id: 1 },{ id: 2 }, { id: 3 }]

  const enriched = useDynamicAttribute<ITest, 'checked', 'setChecked', boolean>(testItems, 'checked', 'setChecked', true)

  expect(enriched).toHaveLength(testItems.length)
})

test('once setter is called the value changes to passed in value', () => {
  interface ITest { id: number }
  const testItems: ITest[] = [{ id: 1 },{ id: 2 }, { id: 3 }]

  const enriched = useDynamicAttribute<ITest, 'checked', 'setChecked', boolean>(testItems, 'checked', 'setChecked', true)
  const item = enriched[0]

  expect(item.checked).toBe(true)
  item.setChecked(false)
  expect(item.checked).toBe(false)
})

test('original keys should still be intact', () => {
  interface ITest { id: number, hasName?: boolean, name?: string }
  const testItems: ITest[] = [{ id: 1 },{ id: 2, hasName: true, name: 'bas' }, { id: 3, hasName: false }]

  const enriched = useDynamicAttribute<ITest, 'checked', 'setChecked', boolean>(testItems, 'checked', 'setChecked', true)

  expect(enriched[0]).toHaveProperty('id', 1)

  expect(enriched[1]).toHaveProperty('id', 2)
  expect(enriched[1]).toHaveProperty('hasName', true)
  expect(enriched[1]).toHaveProperty('name', 'bas')

  expect(enriched[2]).toHaveProperty('id', 3)
  expect(enriched[1]).toHaveProperty('hasName', false)
})

test('the returned array should have the same order', () => {
  interface ITest { id: number }
  const ids = [1, 2, 3]
  const testItems: ITest[] = ids.map(n => ({ id: n }))

  const enriched = useDynamicAttribute<ITest, 'checked', 'setChecked', boolean>(testItems, 'checked', 'setChecked', true)

  ids.forEach((_, i) => {
    expect(testItems[i].id).toEqual(enriched[i].id)
  })
})
