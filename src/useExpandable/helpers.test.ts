import {
  hasNoCollapsedParents,
  expandOrCollapseItemTree,
  expandOrCollapseItem,
  expandFn,
  collapseFn,
  createExpandOrCollapseTreeHelpers,
  ExpandOrCollapseChildrenOrParents,
  ExpandOrCollapseTree
} from './helpers'
import { PARENT, iterateAllParents, CHILDREN, iterateAllChildren } from '../utils/makeParentChildTree'

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

  const expandOrcollapse: ExpandOrCollapseChildrenOrParents<any> = expandOrCollapseItemTree(expanded, setExpanded)
  const expand: ExpandOrCollapseTree<any> = expandOrcollapse(iterateAllParents, true)
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

  const expandOrcollapse: ExpandOrCollapseChildrenOrParents<any> = expandOrCollapseItemTree(expanded, setExpanded)
  const expand: ExpandOrCollapseTree<any> = expandOrcollapse(iterateAllChildren, true)
  expand(one)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual(['1', '2', '4', '3'])
})

test('expandOrCollapseItemTree collapse all parents', () => {
  const expanded: string[] = ['4', '3', '2', '1']

  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }
  const three = { key: '3', [PARENT]: two }
  const four = { key: '4', [PARENT]: three }

  const setExpanded = jest.fn(result => result)

  const expandOrcollapse: ExpandOrCollapseChildrenOrParents<any> = expandOrCollapseItemTree(expanded, setExpanded)
  const collapse: ExpandOrCollapseTree<any> = expandOrcollapse(iterateAllParents)
  collapse(four)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual([])
})

test('expandOrCollapseItemTree collapse all children', () => {
  const expanded: string[] = ['1', '2', '4', '3']

  const four = { key: '4' }
  const three = { key: '3' }
  const two = { key: '2', [CHILDREN]: [four] }
  const one = { key: '1', [CHILDREN]: [two, three] }

  const setExpanded = jest.fn(result => result)

  const expandOrcollapse: ExpandOrCollapseChildrenOrParents<any> = expandOrCollapseItemTree(expanded, setExpanded)
  const collapse: ExpandOrCollapseTree<any> = expandOrcollapse(iterateAllChildren)
  collapse(one)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual([])
})

test('createExpandOrCollapseTreeHelpers returns object with collapse.children helper', () => {
  const expanded: string[] = ['1', '2', '4', '3']
  const setExpanded = jest.fn(result => result)

  const four = { key: '4' }
  const three = { key: '3' }
  const two = { key: '2', [CHILDREN]: [four] }
  const one = { key: '1', [CHILDREN]: [two, three] }

  const helpers = createExpandOrCollapseTreeHelpers<any>(expanded, setExpanded)
  helpers.collapse.children(one)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual([])
})

test('createExpandOrCollapseTreeHelpers returns object with expand.children helper', () => {
  const expanded: string[] = []
  const setExpanded = jest.fn(result => result)

  const four = { key: '4' }
  const three = { key: '3' }
  const two = { key: '2', [CHILDREN]: [four] }
  const one = { key: '1', [CHILDREN]: [two, three] }

  const helpers = createExpandOrCollapseTreeHelpers<any>(expanded, setExpanded)
  helpers.expand.children(one)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual(['1', '2', '4', '3'])
})

test('createExpandOrCollapseTreeHelpers returns object with collapse.parents helper', () => {
  const expanded: string[] = ['1', '2', '4', '3']
  const setExpanded = jest.fn(result => result)

  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }
  const three = { key: '3', [PARENT]: two }
  const four = { key: '4', [PARENT]: three }

  const helpers = createExpandOrCollapseTreeHelpers<any>(expanded, setExpanded)
  helpers.collapse.parents(four)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual([])
})

test('createExpandOrCollapseTreeHelpers returns object with expand.parents helper', () => {
  const expanded: string[] = []
  const setExpanded = jest.fn(result => result)

  const one = { key: '1', [PARENT]: null }
  const two = { key: '2', [PARENT]: one }
  const three = { key: '3', [PARENT]: two }
  const four = { key: '4', [PARENT]: three }

  const helpers = createExpandOrCollapseTreeHelpers<any>(expanded, setExpanded)
  helpers.expand.parents(four)

  const resultSetExpanded = setExpanded.mock.results[0].value

  expect(resultSetExpanded).toEqual(['4', '3', '2', '1'])
})
