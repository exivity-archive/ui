import { buildOrUseBreakDistance, getEdges, getMeasures, getPositioning } from './helpers'

test('buildOrUseBreakDistance returns the input if its an object', () => {
  const breakDistance = {
    horizontal: 10,
    vertical: 10
  }

  expect(buildOrUseBreakDistance(breakDistance)).toBe(breakDistance)
})

test('buildOrUseBreakDistance returns an object with all values equal to the input if its a number', () => {
  expect(buildOrUseBreakDistance(20))
    .toMatchObject({ horizontal: 20, vertical: 20 })
})

test('getEdges gets edges derived from break distance and window dimensions if container is not provided', () => {
  // @ts-ignore
  window.innerHeight = 800
  // @ts-ignore
  window.innerWidth = 1000

  const edges = getEdges(null, { vertical: 20, horizontal: 50 })

  expect(edges).toMatchObject({ bottomEdge: 780, rightEdge: 950 })
})

test('getEdges gets edges derived from break distance and container edges if container is provided', () => {
  const element = { bottom: 500, right: 600 }

  const edges = getEdges(element as any, { vertical: 20, horizontal: 50 })

  expect(edges).toMatchObject({ bottomEdge: 480, rightEdge: 550 })
})

test('getMeasures returns target width and -height and parent top and -left positions if parent and target are defined', () => {
  const target = { height: 40, width: 20 }
  const parent = { top: 100, left: 200 }

  // @ts-ignore
  expect(getMeasures(target, parent))
    .toMatchObject({ height: 40, width: 20, top: 100, left: 200 })
})

test('getMeasures throws an error if either or both parent or target is null', () => {
  const target = { height: 40, width: 20 }
  const parent = { top: 100, left: 200 }

  // @ts-ignore
  expect(getMeasures(null, parent)).toMatchObject({ width: 0, height: 0, left: 0, top: 0 })
  // @ts-ignore
  expect(getMeasures(target, null)).toMatchObject({ width: 0, height: 0, left: 0, top: 0 })
  expect(getMeasures(null, null)).toMatchObject({ width: 0, height: 0, left: 0, top: 0 })
})

test('getPositioning returns left and top if element hasn\'t crossed any edges', () => {
  const target = { rect: { width: 300, height: 200 } }
  const parent = { rect: { left: 300, top: 200 } }

  const container = { rect: { right: 800, bottom: 600 } }

  // @ts-ignore
  window.innerWidth = 800
  // @ts-ignore
  window.innerHeight = 600

  const breakDistance = 50

  // @ts-ignore
  const positioning1 = getPositioning({ target, parent, container: { current: null } }, breakDistance)
  expect(positioning1).toMatchObject({ horizontal: 'left', vertical: 'top' })

  // @ts-ignore
  const positioning2 = getPositioning({ target, parent, container }, breakDistance)
  expect(positioning2).toMatchObject({ horizontal: 'left', vertical: 'top' })
})

test('Get positioning returns right and bottom if element has crossed both edges', () => {
  const target = { rect: { width: 401, height: 301 } }
  const parent = { rect: { left: 401, top: 301 } }

  const container = { rect: { right: 800, bottom: 600 } }

  // @ts-ignore
  window.innerWidth = 800
  // @ts-ignore
  window.innerHeight = 600

  const breakDistance = 50

  // @ts-ignore
  const positioning1 = getPositioning({ target, parent, container: { current: null } }, breakDistance)
  expect(positioning1).toMatchObject({ horizontal: 'right', vertical: 'bottom' })

  // @ts-ignore
  const positioning2 = getPositioning({ target, parent, container }, breakDistance)
  expect(positioning2).toMatchObject({ horizontal: 'right', vertical: 'bottom' })
})

test('Get positioning returns initial positioning if one is provided', () => {
  const target = { rect: { width: 400, height: 300 } }
  const parent = { rect: { left: 400, top: 300 } }
  const container = { rect: { right: 700, bottom: 500 } }

  const breakDistance1 = 50
  const initialPositioning1 = { horizontal: 'right', vertical: 'bottom' }
  // @ts-ignore
  const positioning1 = getPositioning({ target, parent, container }, breakDistance1, initialPositioning1)
  expect(positioning1).toMatchObject({ horizontal: 'right', vertical: 'bottom' })

  const breakDistance2 = 150
  const initialPositioning2 = { horizontal: 'left', vertical: 'top' }
  // @ts-ignore
  const positioning2 = getPositioning({ target, parent, container }, breakDistance2, initialPositioning2)
  expect(positioning2).toMatchObject({ horizontal: 'left', vertical: 'top' })
})
