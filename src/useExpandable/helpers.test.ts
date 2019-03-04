import { CHILDREN, iterateAllChildren, iterateAllParents, PARENT } from './helpers'

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
