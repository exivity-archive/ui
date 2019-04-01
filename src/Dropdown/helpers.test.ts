import { elementCrossedEdge, getVertical, getHorizontal, makeCssPosition, getPosition, Layout } from './helpers'

test('elementCrossedEdge returns true if edge - (position + width) is smaller than zero', () => {
  expect(elementCrossedEdge(500, 300, 799)).toBe(true)
})

test('elementCrossedEdge returns false if edge - (position + width) is greater than zero', () => {
  expect(elementCrossedEdge(500, 300, 801)).toBe(false)
})

test('getVertical should return initial vertical if vertical is not "auto"', () => {
  expect(getVertical('bottom', { outer: {} as any, inner: {} as any }, 0)).toBe('bottom')
  expect(getVertical('top', { outer: {} as any, inner: {} as any }, 0)).toBe('top')
})

test('getVertical should return top if vertical is "auto" and element passed the edge', () => {
  (window as any).innerHeight = 800
  expect(getVertical('auto', { outer: { bottom: 500 } as any, inner: { height: 301 } as any }, 0)).toBe('top')
})

test('getVertical should return bottom if vertical is "auto" and element has not passed the edge', () => {
  (window as any).innerHeight = 800
  expect(getVertical('auto', { outer: { bottom: 500 } as any, inner: { height: 299 } as any }, 0)).toBe('bottom')
})

test('getHorizontal should return initial vertical if vertical is not "auto"', () => {
  expect(getHorizontal('left', { outer: {} as any, inner: {} as any }, 0)).toBe('left')
  expect(getHorizontal('right', { outer: {} as any, inner: {} as any }, 0)).toBe('right')
})

test('getHorizontal should return top if horizontal is "auto" and element passed the edge', () => {
  (window as any).innerWidth = 800
  expect(getHorizontal('auto', { outer: { left: 500 } as any, inner: { width: 301 } as any }, 0)).toBe('right')
})

test('getHorizontal should return bottom if horizontal is "auto" and element has not passed the edge', () => {
  (window as any).innerWidth = 800
  expect(getHorizontal('auto', { outer: { left: 500 } as any, inner: { width: 299 } as any }, 0)).toBe('left')
})

test('getPosition should return correct objects for given inputs', () => {
  const dimensions = { innerWidth: 800, innerHeight: 800 }
  // @ts-ignore
  window = { ...window, ...dimensions }

  const rects: any = { outer: { left: 500, bottom: 500, height: 10 }, inner: { width: 295, height: 295 } }

  const layout1: Layout = { vertical: 'auto', horizontal: 'auto' }
  const expected1 = { right: true, top: 10 }

  expect(getPosition(rects, layout1, 10)).toMatchObject(expected1)

  const layout2: Layout = { vertical: 'auto', horizontal: 'auto' }
  const expected2 = { left: true, bottom: 10 }

  expect(getPosition(rects, layout2, 0)).toMatchObject(expected2)

  const layout3: Layout = { vertical: 'auto', horizontal: 'left' }
  const expected3 = { bottom: 10, left: true }

  expect(getPosition(rects, layout3, 0)).toMatchObject(expected3)

  const layout4: Layout = { vertical: 'top', horizontal: 'auto' }
  const expected4 = { left: true, top: 10 }

  expect(getPosition(rects, layout4, 0)).toMatchObject(expected4)
})

test('makeCssPosition should return correct css for given inputs', () => {
  const expected1 = 'bottom: 10px;\nmargin-top: 5px;\nleft: 0px;\n'
  const expected2 = 'right: 0px;\ntop: 10px;\nmargin-bottom: 5px;\n'

  expect(makeCssPosition({ top: 10, left: true })).toBe(expected1)
  expect(makeCssPosition({ bottom: 10, right: true })).toBe(expected2)
})
