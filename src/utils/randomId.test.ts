import { randomId } from './randomId'

test('randomId generates predictable numbers in test environments', () => {
  const first = Number(randomId())
  const second = Number(randomId())

  expect(second).toEqual(first + 1)
})

test('randomId generates random numbers in non-test environments', () => {
  const oldEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'
  const random = randomId()

  expect(random.length).toEqual(8)

  // Reset
  process.env.NODE_ENV = oldEnv
})
