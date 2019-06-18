import { buildOrUseBreakDistance, getEdges, getMeasures, getPosition } from './helpers'

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

const makeRect = (obj: any) => ({
  getBoundingClientRect: () => obj
})

test('getEdges gets edges derived from break distance and container edges if container is provided', () => {
  const element = makeRect({ bottom: 500, right: 600 })

  const edges = getEdges(element as any, { vertical: 20, horizontal: 50 })

  expect(edges).toMatchObject({ bottomEdge: 480, rightEdge: 550 })
})

test('getMeasures returns target width and -height and parent top and -left positions if parent and target are defined', () => {
  const target = makeRect({ height: 40, width: 20 })
  const parent = makeRect({ top: 100, left: 200 })

  // @ts-ignore
  expect(getMeasures(target, parent))
    .toMatchObject({ height: 40, width: 20, top: 100, left: 200 })
})

test('getMeasures throws an error if either or both parent or target is null', () => {
  const target = makeRect({ height: 40, width: 20 })
  const parent = makeRect({ top: 100, left: 200 })

  // @ts-ignore
  expect(getMeasures(null, parent)).toMatchObject({ width: 0, height: 0, left: 0, top: 0 })
  // @ts-ignore
  expect(getMeasures(target, null)).toMatchObject({ width: 0, height: 0, left: 0, top: 0 })
  expect(getMeasures(null, null)).toMatchObject({ width: 0, height: 0, left: 0, top: 0 })
})

test('getPosition returns left and top if element hasn\'t crossed any edges', () => {
  const target = { current: makeRect({ width: 300, height: 200 }) }
  const parent = { current: makeRect({ left: 300, top: 200 }) }

  const container = { current: makeRect({ right: 800, bottom: 600 }) }

  // @ts-ignore
  window.innerWidth = 800
  // @ts-ignore
  window.innerHeight = 600

  const breakDistance = 50

  // @ts-ignore
  const Positioning1 = getPosition({ target, parent, container: { current: null } }, breakDistance)
  expect(Positioning1).toMatchObject({ horizontal: 'left', vertical: 'top' })

  // @ts-ignore
  const Positioning2 = getPosition({ target, parent, container }, breakDistance)
  expect(Positioning2).toMatchObject({ horizontal: 'left', vertical: 'top' })
})

test('Get Positioning returns right and bottom if element has crossed both edges', () => {
  const target = { current: makeRect({ width: 401, height: 301 }) }
  const parent = { current: makeRect({ left: 401, top: 301 }) }

  const container = { current: makeRect({ right: 800, bottom: 600 }) }

  // @ts-ignore
  window.innerWidth = 800
  // @ts-ignore
  window.innerHeight = 600

  const breakDistance = 50

  // @ts-ignore
  const Positioning1 = getPosition({ target, parent, container: { current: null } }, breakDistance)
  expect(Positioning1).toMatchObject({ horizontal: 'right', vertical: 'bottom' })

  // @ts-ignore
  const Positioning2 = getPosition({ target, parent, container }, breakDistance)
  expect(Positioning2).toMatchObject({ horizontal: 'right', vertical: 'bottom' })
})

test('Get Positioning returns initial Positioning if one is provided', () => {
  const target = { current: makeRect({ width: 400, height: 300 }) }
  const parent = { current: makeRect({ left: 400, top: 300 }) }
  const container = { current: makeRect({ right: 700, bottom: 500 }) }

  const breakDistance1 = 50
  const initialPositioning1 = { horizontal: 'right', vertical: 'bottom' }
  // @ts-ignore
  const Positioning1 = getPosition({ target, parent, container }, breakDistance1, initialPositioning1)
  expect(Positioning1).toMatchObject({ horizontal: 'right', vertical: 'bottom' })

  const breakDistance2 = 150
  const initialPositioning2 = { horizontal: 'left', vertical: 'top' }
  // @ts-ignore
  const Positioning2 = getPosition({ target, parent, container }, breakDistance2, initialPositioning2)
  expect(Positioning2).toMatchObject({ horizontal: 'left', vertical: 'top' })
})
