import Faker from 'faker'

export const FLAT_LIST_TEST_DATA = new Array(200).fill(null)
  .map((item, index) => ({
    key: String(index + 1),
    value: Faker.name.firstName(),
    checked: Math.random() > 0.4,
    parentId: null
  }))
