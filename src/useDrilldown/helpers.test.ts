import { drilldownFn, replaceFn, removeFn, removeChildren, getHiddenSiblingsFn, getVisibleSiblingsFn, disableEnumerables, separateVisibleAndHiddenChildren } from './helpers'
import { PARENT, CHILDREN } from '../utils/makeParentChildTree'

test('drilldownFn throws error when item is not parent of childToAdd', () => {
  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: null }

  const visibleKeys = []
  const setVisibleMock = jest.fn()

  let errorMessage: string
  try {
    drilldownFn<any>(one, two, visibleKeys, setVisibleMock)
  } catch (error) {
    errorMessage = error.message
  }

  expect(errorMessage).toBe('Item is not parent of childToAdd')
})

test('drilldownFn throws error when item is not in visible', () => {
  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }

  const visibleKeys = []
  const setVisibleMock = jest.fn()

  let errorMessage: string
  try {
    drilldownFn<any>(one, two, visibleKeys, setVisibleMock)
  } catch (error) {
    errorMessage = error.message
  }

  expect(errorMessage).toBe(
    `Item isn't visible. It's likely that the 'drilldown' method was called on an out of date item`
  )
})

test('drilldownFn calls setVisible when childToAdd is defined', () => {
  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }

  const visibleKeys = ['1']
  const setVisibleMock = jest.fn()

  drilldownFn<any>(one, two, visibleKeys, setVisibleMock)
  expect(setVisibleMock).toBeCalledWith(['1', '2'])
})

test('drilldownFn doesn\'t call setVisible when childToAdd is undefined', () => {
  const one = { key: '1', [PARENT]: null }
  const two = undefined

  const visibleKeys = ['1']
  const setVisibleMock = jest.fn()

  drilldownFn<any>(one, two, visibleKeys, setVisibleMock)
  expect(setVisibleMock).not.toBeCalled()
})

test('drilldownFn injects child directly after the parent', () => {
  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }

  const visibleKeys = ['abc', '1', 'cba']
  const setVisibleMock = jest.fn()

  drilldownFn<any>(one, two, visibleKeys, setVisibleMock)
  expect(setVisibleMock).toBeCalledWith(['abc', '1', '2', 'cba'])
})

test('replaceFn throws error when item is not in visible', () => {
  const one = { key: '1' }
  const two = { key: '2' }

  const visibleKeys = []
  const setVisibleMock = jest.fn()

  let errorMessage: string
  try {
    replaceFn<any>(one, two, visibleKeys, setVisibleMock)
  } catch (error) {
    errorMessage = error.message
  }

  expect(errorMessage).toBe(
    `Item isn't visible. It's likely that the 'replace' method was called on an out of date item`
  )
})

test('replaceFn replaces item with newItem', () => {
  const one = { key: '1' }
  const two = { key: '2' }

  const visibleKeys = ['1']
  const setVisibleMock = jest.fn()

  replaceFn<any>(one, two, visibleKeys, setVisibleMock)
  expect(setVisibleMock).toBeCalledWith(['2'])
})

test('replaceFn removes all children of replaced item', () => {

  const childTwo = { key: '4' }
  const childOne = { key: '3', [CHILDREN]: [childTwo] }
  const one = { key: '1', [CHILDREN]: [childOne] }
  const two = { key: '2' }

  const visibleKeys = ['1', '3', '4']
  const setVisibleMock = jest.fn()

  replaceFn<any>(one, two, visibleKeys, setVisibleMock)
  expect(setVisibleMock).toBeCalledWith(['2'])
})

test('removeFn throws error when item is not in visible', () => {
  const one = { key: '1' }
  const visibleKeys = []

  const setVisibleMock = jest.fn()

  let errorMessage: string
  try {
    removeFn<any>(one, visibleKeys, setVisibleMock)
  } catch (error) {
    errorMessage = error.message
  }

  expect(errorMessage).toBe(
    `Item isn't visible. It's likely that the 'remove' method was called on an out of date item`
  )
})

test('removeFn removes item', () => {
  const one = { key: '1' }
  const visibleKeys = ['1']

  const setVisibleMock = jest.fn()

  removeFn<any>(one, visibleKeys, setVisibleMock)
  expect(setVisibleMock).toBeCalledWith([])
})

test('removeFn removes all children of removed item', () => {
  const childTwo = { key: '4' }
  const childOne = { key: '3', [CHILDREN]: [childTwo] }
  const one = { key: '1', [CHILDREN]: [childOne] }

  const visibleKeys = ['1', '3', '4']
  const setVisibleMock = jest.fn()

  removeFn<any>(one, visibleKeys, setVisibleMock)
  expect(setVisibleMock).toBeCalledWith([])
})

test('removeChildren removes all children from array', () => {
  const childTwo = { key: '4' }
  const childOne = { key: '3', [CHILDREN]: [childTwo] }
  const one = { key: '1', [CHILDREN]: [childOne] }

  const visibleKeys = ['1', '3', '4']

  const result = removeChildren<any>(one, visibleKeys)

  expect(result).toMatchObject(['1'])
})

test('getHiddenSiblingsFn returns an empty array if parent is falsy', () => {
  const one = { key: '1', parent: null }

  const visibleKeys = []

  const result = getHiddenSiblingsFn<any>(one, visibleKeys)

  expect(result).toMatchObject([])
})

test('getHiddenSiblingsFn returns an empty array if parent.children is falsy', () => {
  const one = { key: '1', parent: null, children: undefined }
  const childOne = { key: '2', parent: one }

  const visibleKeys = []

  const result = getHiddenSiblingsFn<any>(childOne, visibleKeys)

  expect(result).toMatchObject([])
})

test('getHiddenSiblingsFn returns an empty array if parent.children is empty', () => {
  const one = { key: '1', parent: null, children: [] }
  const childOne = { key: '2', parent: one }

  const visibleKeys = []

  const result = getHiddenSiblingsFn<any>(childOne, visibleKeys)

  expect(result).toMatchObject([])
})

test('getHiddenSiblingsFn returns an empty array if parent.children is only has visible children', () => {
  const childOne = { key: '2', parent: undefined }
  const childTwo = { key: '3', parent: undefined }
  const one = { key: '1', parent: null, children: [childOne, childTwo] }
  childOne.parent = one
  childTwo.parent = one

  const visibleKeys = ['2', '3']

  const result = getHiddenSiblingsFn<any>(childOne, visibleKeys)

  expect(result).toMatchObject([])
})

test('getHiddenSiblingsFn returns hidden siblings', () => {
  const childOne = { key: '2', parent: undefined }
  const childTwo = { key: '3', parent: undefined }
  const one = { key: '1', parent: null, children: [childOne, childTwo] }
  childOne.parent = one
  childTwo.parent = one

  const visibleKeys = ['2']

  const result = getHiddenSiblingsFn<any>(childOne, visibleKeys)

  expect(result).toMatchObject([childTwo])
})

test('getVisibleSiblingsFn returns an empty array if parent is falsy', () => {
  const one = { key: '1', parent: null }

  const visibleKeys = []

  const result = getVisibleSiblingsFn<any>(one, visibleKeys)

  expect(result).toMatchObject([])
})

test('getVisibleSiblingsFn returns an empty array if parent.children is falsy', () => {
  const one = { key: '1', parent: null, children: undefined }
  const childOne = { key: '2', parent: one }

  const visibleKeys = []

  const result = getVisibleSiblingsFn<any>(childOne, visibleKeys)

  expect(result).toMatchObject([])
})

test('getVisibleSiblingsFn returns an empty array if parent.children is empty', () => {
  const one = { key: '1', parent: null, children: [] }
  const childOne = { key: '2', parent: one }

  const visibleKeys = []

  const result = getVisibleSiblingsFn<any>(childOne, visibleKeys)

  expect(result).toMatchObject([])
})

test('getVisibleSiblingsFn returns an empty array if parent.children is only has hidden children', () => {
  const childOne = { key: '2', parent: undefined }
  const childTwo = { key: '3', parent: undefined }
  const one = { key: '1', parent: null, children: [childOne, childTwo] }
  childOne.parent = one
  childTwo.parent = one

  const visibleKeys = []

  const result = getVisibleSiblingsFn<any>(childOne, visibleKeys)

  expect(result).toMatchObject([])
})

test('getVisibleSiblingsFn returns visible siblings', () => {
  const childOne = { key: '2', parent: undefined }
  const childTwo = { key: '3', parent: undefined }
  const one = { key: '1', parent: null, children: [childOne, childTwo] }
  childOne.parent = one
  childTwo.parent = one

  const visibleKeys = ['2']

  const result = getVisibleSiblingsFn<any>(childOne, visibleKeys)

  expect(result).toMatchObject([childOne])
})

test('separateVisibleAndHiddenChildren', () => {
  const children = [{ key: '1' }, { key: '2' }]
  const visibleKeys = ['1']

  const result = separateVisibleAndHiddenChildren<any>(children, visibleKeys)

  expect(result).toMatchObject({ visibleChildren: [{ key: '1' }], hiddenChildren: [{ key: '2' }] })
})

test('disableEnumerables disables all enumerables', () => {

  const obj = {
    key: '1',
    [PARENT]: {},
    [CHILDREN]: [],
    visibleChildren: [],
    hiddenChildren: [],
    drilldown: () => { return },
    replace: () => { return },
    getHiddenSiblings: () => { return },
    getVisibleSiblings: () => { return },
    remove: () => { return },
    level: 1
  }

  disableEnumerables<any>(obj)

  const newObj = { ...obj }

  expect(newObj).not.toHaveProperty(PARENT)
  expect(newObj).not.toHaveProperty(CHILDREN)
  expect(newObj).not.toHaveProperty('visibleChildren')
  expect(newObj).not.toHaveProperty('hiddenChildren')
  expect(newObj).not.toHaveProperty('drilldown')
  expect(newObj).not.toHaveProperty('replace')
  expect(newObj).not.toHaveProperty('remove')
  expect(newObj).not.toHaveProperty('getHiddenSiblings')
  expect(newObj).not.toHaveProperty('getVisibleSiblings')
  expect(newObj).not.toHaveProperty('level')
})
