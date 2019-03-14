import {
  PARENT,
  CHILDREN,
  iterateAllChildren,
  iterateAllParents,
  hasNoCollapsedParents,
  expandOrCollapseItemTree,
  expandOrCollapseItem,
  expandFn,
  collapseFn,
  ExpandOrCollapseTree,
  ExpandOrCollapse
} from './helpers'

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

  iterateAllParents<any>(tree, mock)
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

  iterateAllChildren<any>(tree, mock)
  expect(mock).toHaveBeenCalledTimes(6)
})

test('hasNoCollapsedParents returns true', () => {
  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }
  const three = { key: '3', [PARENT]: two }
  const four = { key: '4', [PARENT]: three }

  const expandedKeys = ['1', '2', '3']

  const noneCollapsed = hasNoCollapsedParents<any>(four, expandedKeys)
  expect(noneCollapsed).toBe(true)
})

test('hasNoCollapsedParents returns false', () => {
  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }
  const three = { key: '3', [PARENT]: two }
  const four = { key: '4', [PARENT]: three }

  const expandedKeys = ['2', '3']

  const noneCollapsed = hasNoCollapsedParents<any>(four, expandedKeys)
  expect(noneCollapsed).toBe(false)
})

test('expandFn merges keys into expanded which are returned by setExpanded', () => {
  const expanded = ['1', '2']
  const keys = ['4', '3']

  const setExpanded = jest.fn(result => result)

  expandFn(keys, expanded, setExpanded)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual(['1', '2', '4', '3'])
})

test('setExpanded in expandFn only returns unique keys ', () => {
  const expanded = ['1', '2', '4']
  const keys = ['4', '3']

  const setExpanded = jest.fn(result => result)

  expandFn(keys, expanded, setExpanded)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual(['1', '2', '4', '3'])
})

test('collapseFn filters keys out expanded which are returned by setExpanded', () => {
  const expanded = ['1', '2', '3', '4']
  const keys = ['4', '3']

  const setExpanded = jest.fn(result => result)

  collapseFn(keys, expanded, setExpanded)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual(['1', '2'])
})

test('setExpanded in collapseFn only returns unique keys', () => {
  const expanded = ['1', '2', '3']
  const keys = ['4', '3']

  const setExpanded = jest.fn(result => result)

  collapseFn(keys, expanded, setExpanded)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual(['1', '2'])
})

test('expandOrCollapseItem expand item', () => {
  const expanded: string[] = []
  const itemKey = '1'

  const setExpanded = jest.fn(result => result)

  expandOrCollapseItem(itemKey, expanded, setExpanded)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual(['1'])
})

test('expandOrCollapseItem collapse item', () => {
  const expanded: string[] = ['1']
  const itemKey = '1'

  const setExpanded = jest.fn(result => result)

  expandOrCollapseItem(itemKey, expanded, setExpanded)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual([])
})

test('expandOrCollapseItemTree expand all parents', () => {
  const expanded: string[] = []

  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }
  const three = { key: '3', [PARENT]: two }
  const four = { key: '4', [PARENT]: three }

  const setExpanded = jest.fn(result => result)

  const expandOrcollapse: ExpandOrCollapseTree<any> = expandOrCollapseItemTree(expanded, setExpanded)
  const expand: ExpandOrCollapse<any> = expandOrcollapse(iterateAllParents, true)
  expand(four)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual(['4', '3', '2', '1'])
})

test('expandOrCollapseItemTree expand all children', () => {
  const expanded: string[] = []

  const four = { key: '4' }
  const three = { key: '3' }
  const two = { key: '2', [CHILDREN]: [four] }
  const one = { key: '1', [CHILDREN]: [two, three] }

  const setExpanded = jest.fn(result => result)

  const expandOrcollapse: ExpandOrCollapseTree<any> = expandOrCollapseItemTree(expanded, setExpanded)
  const expand: ExpandOrCollapse<any> = expandOrcollapse(iterateAllChildren, true)
  expand(one)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual(['1','2','4','3'])
})

test('expandOrCollapseItemTree collapse all parents', () => {
  const expanded: string[] = ['4', '3', '2', '1']

  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }
  const three = { key: '3', [PARENT]: two }
  const four = { key: '4', [PARENT]: three }

  const setExpanded = jest.fn(result => result)

  const expandOrcollapse: ExpandOrCollapseTree<any> = expandOrCollapseItemTree(expanded, setExpanded)
  const collapse: ExpandOrCollapse<any> = expandOrcollapse(iterateAllParents)
  collapse(four)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual([])
})

test('expandOrCollapseItemTree collapse all children', () => {
  const expanded: string[] = ['1','2','4','3']

  const four = { key: '4' }
  const three = { key: '3' }
  const two = { key: '2', [CHILDREN]: [four] }
  const one = { key: '1', [CHILDREN]: [two, three] }

  const setExpanded = jest.fn(result => result)

  const expandOrcollapse: ExpandOrCollapseTree<any> = expandOrCollapseItemTree(expanded, setExpanded)
  const collapse: ExpandOrCollapse<any> = expandOrcollapse(iterateAllChildren)
  collapse(one)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual([])
})
