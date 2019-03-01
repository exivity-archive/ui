import { areEqual, CHILDREN, iterateAllChildren, iterateAllParents, PARENT } from './helpers'

test(`iterateAllParents iterates recursively over all ${PARENT}`, () => {
  const mock = jest.fn()

  const tree = {
    key: '1',
    [PARENT]: {
      key: '2',
      [PARENT]: {
        key: '3',
        [PARENT]: {
          key: '4'
        }
      }
    }
  }

  iterateAllParents(tree, mock)
  expect(mock).toHaveBeenCalledTimes(3)
})

test(`iterateAllChildren iterates recursively over all ${CHILDREN}`, () => {
  const mock = jest.fn()

  const tree = {
    key: '1',
    [CHILDREN]: [
      {
        key: '2',
        [CHILDREN]: [{ key: '3' }, { key: '4' }]
      }, {
        key: '5',
        [CHILDREN]: [{ key: '6' }, { key: '7' }]
      }
    ]
  }

  iterateAllChildren(tree, mock)
  expect(mock).toHaveBeenCalledTimes(6)
})

test('areEqual returns true if first and thirth argument are unchanged', () => {
  const one = {}
  const two = {}
  const three = {}

  const args = [
    one,
    two,
    three
  ]

  const newArgs = [
    one,
    two,
    three
  ]

  expect(areEqual(args, newArgs)).toBe(true)
})

test('areEqual returns false if first argument is changed', () => {
  const one = {}
  const two = {}
  const three = {}

  const args = [
    one,
    two,
    three
  ]

  const newArgs = [
    {},
    two,
    three
  ]

  expect(areEqual(args, newArgs)).toBe(false)
})

test('areEqual returns false if thirth argument is changed', () => {
  const one = {}
  const two = {}
  const three = {}

  const args = [
    one,
    two,
    three
  ]

  const newArgs = [
    one,
    two,
    {}
  ]

  expect(areEqual(args, newArgs)).toBe(false)
})

test('areEqual returns true if second argument is changed', () => {
  const one = {}
  const two = {}
  const three = {}

  const args = [
    one,
    two,
    three
  ]

  const newArgs = [
    one,
    {},
    three
  ]

  expect(areEqual(args, newArgs)).toBe(true)
})

test('areEqual returns false if first and second argument is changed', () => {
  const one = {}
  const two = {}
  const three = {}

  const args = [
    one,
    two,
    three
  ]

  const newArgs = [
    {},
    two,
    {}
  ]

  expect(areEqual(args, newArgs)).toBe(false)
})
