import faker from 'faker'

export const LONG_LIST = new Array(20)
  .fill(null)
  .map((item, index) => ({
    key: String(index),
    value: faker.name.jobTitle()
  }))
