import { randomId } from './randomId'

test('randomId generates predictable numbers during tests', () => {
  const first = Number(randomId())
  const second = Number(randomId())

  expect(second).toEqual(first + 1)
})
