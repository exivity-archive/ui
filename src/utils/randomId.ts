/**
 * Generate a unique random 8 character id (not cryptographically secure).
 */
const randomIdMemory: string[] = []

export const randomId = () => {
  let id

  if (process.env.NODE_ENV !== 'test') {
    do {
      id = Math.random().toString(36).substring(2, 10)
    } while (randomIdMemory.indexOf(id) > -1)
  } else {
    id = String(randomIdMemory.length)
  }

  randomIdMemory.push(id)

  return id
}
