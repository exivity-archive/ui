import { renderHook } from 'react-hooks-testing-library'

import { useTimeout } from './useTimeout'

test('Runs a callback after a certain amount of time.', async (done) => {
  const delay = 100
  const callback = jest.fn()

  renderHook(() => useTimeout(callback, delay))

  setTimeout(() => {
    expect(callback).not.toBeCalled()
  }, 50)

  setTimeout(() => {
    expect(callback).toBeCalled()
    done()
  }, 150)
})

test('Doesn\'t run the same callback more than once.', async (done) => {
  const delay = 50
  const callback = jest.fn()

  renderHook(() => useTimeout(callback, delay))

  setTimeout(() => {
    expect(callback).toBeCalledTimes(1)
    done()
  }, 500)
})
